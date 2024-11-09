import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Star, Clock, ChefHat, Heart, Youtube, Printer, MessageCircle, Trash2, UserCircle } from 'lucide-react';
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import CardContent from "../components/ui/CardContent";

export default function RecipeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [note, setNote] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [savingRecipe, setSavingRecipe] = useState(false);

  // Fetch recipe and notes when component mounts
  useEffect(() => {
    const fetchRecipeAndNotes = async () => {
      try {
        // Fetch recipe
        const recipeResponse = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        setRecipe(recipeResponse.data.meals[0]);

        // Fetch notes if user is logged in
        const token = localStorage.getItem('token');
        if (token) {
          const notesResponse = await axios.get(`http://localhost:5000/api/notes/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (notesResponse.data.notes) {
            setSavedNotes(notesResponse.data.notes);
            // Set the most recent note in the textarea if it exists
            if (notesResponse.data.notes.length > 0) {
              setNote(notesResponse.data.notes[0].content);
            }
          }
        }

        // Check if recipe is saved
        const savedResponse = await axios.get(`http://localhost:5000/api/recipes/saved/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setIsSaved(savedResponse.data.isSaved);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response?.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchRecipeAndNotes();
  }, [id, navigate]);

  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.post('http://localhost:5000/api/notes', {
        recipeId: id,
        content: note
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Update the saved notes with the new note
      setSavedNotes([response.data.note, ...savedNotes]);
      setNote(''); // Clear the input
      setError(null);
    } catch (error) {
      console.error('Error saving note:', error);
      setError(error.response?.data?.message || 'Error saving note');
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    if (recipe?.strYoutube) {
      try {
        await navigator.clipboard.writeText(recipe.strYoutube);
        setCopySuccess(true);
        // Reset the success message after 2 seconds
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  const handleSaveRecipe = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      setSavingRecipe(true);
      
      if (!isSaved) {
        await axios.post('http://localhost:5000/api/recipes/save', {
          recipeId: id
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setIsSaved(true);
      } else {
        await axios.delete(`http://localhost:5000/api/recipes/save/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setIsSaved(false);
      }
    } catch (error) {
      console.error('Error saving recipe:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setSavingRecipe(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      await axios.delete(`http://localhost:5000/api/notes/${noteId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Remove the deleted note from the state
      setSavedNotes(savedNotes.filter(note => note._id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F5F3EF] text-[#2C3E50] font-sans">
      {/* Header */}
      <header className="bg-[#4A6741] text-white p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold">Hearty Bites</h1>
          <div className="flex items-center">
            <ul className="hidden md:flex space-x-6">
              <li><Link to="/" className="hover:text-[#E0C097]">Home</Link></li>
              <li><Link to="/recipes" className="hover:text-[#E0C097]">Recipes</Link></li>
              <li><Link to="/about" className="hover:text-[#E0C097]">About</Link></li>
            </ul>
            <Link 
              to="/profile" 
              className="ml-6 hover:text-[#E0C097] flex items-center"
              title="Profile"
            >
              <UserCircle className="h-6 w-6" />
            </Link>
          </div>
        </nav>
      </header>

      {/* Recipe Header */}
      <section className="container mx-auto my-8 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-96 object-cover rounded-lg" />
          <div>
            <h1 className="text-4xl font-serif font-bold mb-4">{recipe.strMeal}</h1>
            <div className="flex items-center mb-4">
              <span className="text-gray-600">({recipe.strTags ? recipe.strTags : 'No reviews available'})</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center">
                <ChefHat className="h-5 w-5 mr-2" />
                <span>Category: {recipe.strCategory}</span>
              </div>
              <div className="flex items-center">
                <ChefHat className="h-5 w-5 mr-2" />
                <span>Area: {recipe.strArea}</span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-3">
              {/* Share Button */}
              <Button
                onClick={handleShare}
                className="w-full flex items-center justify-center space-x-2 bg-[#4A6741] hover:bg-[#3A5331] text-white transition-colors py-2.5"
              >
                <Youtube className="h-5 w-5" />
                <span>{copySuccess ? 'Link Copied!' : 'Watch Tutorial'}</span>
              </Button>

              {/* Save Recipe Button */}
              <Button
                onClick={handleSaveRecipe}
                disabled={savingRecipe}
                className={`w-full flex items-center justify-center space-x-2 transition-colors py-2.5
                  ${isSaved 
                    ? 'bg-[#E0C097] hover:bg-[#C7A57F] text-[#2C3E50]' 
                    : 'border-2 border-[#4A6741] text-[#4A6741] hover:bg-[#4A6741] hover:text-white'
                  }`}
              >
                <Heart className={`h-5 w-5 ${isSaved ? 'fill-[#2C3E50]' : ''}`} />
                <span>
                  {savingRecipe 
                    ? 'Saving...' 
                    : isSaved 
                      ? 'Recipe Saved' 
                      : 'Save Recipe'
                  }
                </span>
              </Button>
              
              {copySuccess && (
                <div className="text-center text-sm text-green-600">
                  Video tutorial link copied to clipboard!
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="container mx-auto my-8 px-4">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-serif font-bold mb-4">Ingredients</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(recipe)
                .filter((key) => key.startsWith('strIngredient') && recipe[key])
                .map((ingredient, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="bg-[#E0C097] text-[#2C3E50] px-3 py-1 rounded-full text-sm">
                      {recipe[ingredient]}
                    </span>
                    <span className="text-gray-600">
                      {recipe[`strMeasure${index + 1}`]}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Instructions Section */}
      <section className="container mx-auto my-8 px-4">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-serif font-bold mb-4">Instructions</h2>
            <p className="whitespace-pre-line">{recipe.strInstructions}</p>
          </CardContent>
        </Card>
      </section>

      {/* Notes Section */}
      <section className="container mx-auto my-8 px-4">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-serif font-bold mb-4">Recipe Notes</h2>
            <form onSubmit={handleNoteSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add your personal notes about this recipe
                </label>
                <textarea
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A6741] focus:border-[#4A6741] transition-colors"
                  placeholder="Write your cooking notes, modifications, or tips here..."
                  rows="4"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  required
                ></textarea>
              </div>
              {error && (
                <div className="text-red-600 text-sm">
                  {error}
                </div>
              )}
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  className="bg-[#4A6741] text-white hover:bg-[#3A5331] transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Note'}
                </Button>
              </div>
            </form>
            
            {/* Previous Notes Display */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium mb-4">Your Saved Notes</h3>
              {savedNotes.length > 0 ? (
                <div className="space-y-4">
                  {savedNotes.map((savedNote, index) => (
                    <div 
                      key={savedNote._id || index} 
                      className="bg-[#F5F3EF] p-4 rounded-lg relative group"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-gray-700">{savedNote.content}</p>
                          <p className="text-sm text-gray-500 mt-2">
                            {new Date(savedNote.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteNote(savedNote._id)}
                          className="ml-4 p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Delete note"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#F5F3EF] p-4 rounded-lg">
                  <p className="text-gray-600 italic">No notes saved yet.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer Section */}
      <footer className="bg-[#2C3E50] text-white text-center py-6 mt-8">
        <p>&copy; 2024 Hearty Bites. All rights reserved.</p>
      </footer>
    </div>
  );
}
