// src/pages/ProfilePage.js
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserCircle, Mail, Info, LogOut, BookOpen, Heart, ChefHat } from 'lucide-react';
import Button from "../components/ui/Button";
import axios from 'axios';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userNotes, setUserNotes] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState({});
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [savedRecipeDetails, setSavedRecipeDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileAndData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        // Fetch profile
        const profileResponse = await fetch('http://localhost:5000/api/profiles', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!profileResponse.ok) {
          if (profileResponse.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
            return;
          }
          throw new Error(`HTTP error! status: ${profileResponse.status}`);
        }

        const profileData = await profileResponse.json();
        setProfile(profileData);

        // Fetch saved recipes
        const savedRecipesResponse = await axios.get('http://localhost:5000/api/recipes/saved', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const { savedRecipes } = savedRecipesResponse.data;
        setSavedRecipes(savedRecipes);

        // Fetch recipe details for saved recipes
        const savedRecipePromises = savedRecipes.map(recipe =>
          axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.recipeId}`)
        );

        const savedRecipeResponses = await Promise.all(savedRecipePromises);
        const savedRecipeDetailsMap = {};
        
        savedRecipeResponses.forEach((response, index) => {
          if (response.data.meals && response.data.meals[0]) {
            savedRecipeDetailsMap[savedRecipes[index].recipeId] = response.data.meals[0];
          }
        });

        setSavedRecipeDetails(savedRecipeDetailsMap);

        // Fetch all user's notes
        const notesResponse = await axios.get('http://localhost:5000/api/notes/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const notes = notesResponse.data.notes;
        setUserNotes(notes);

        // Fetch recipe details for notes
        const noteRecipePromises = notes.map(note =>
          axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${note.recipeId}`)
        );

        const noteRecipeResponses = await Promise.all(noteRecipePromises);
        const noteRecipeDetailsMap = {};
        
        noteRecipeResponses.forEach((response, index) => {
          if (response.data.meals && response.data.meals[0]) {
            noteRecipeDetailsMap[notes[index].recipeId] = response.data.meals[0];
          }
        });

        setRecipeDetails(noteRecipeDetailsMap);

      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F3EF] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#4A6741] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F3EF] text-[#2C3E50] font-sans">
      {/* Header */}
      <header className="bg-[#4A6741] text-white p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold">Hearty Bites</h1>
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-[#E0C097] hover:text-white"
            >
              Back to Home
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error: {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Section - Left Column */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-8">
                <div className="bg-[#4A6741] p-8 text-white text-center">
                  <div className="inline-block p-2 rounded-full bg-white/10 mb-4">
                    <UserCircle className="h-24 w-24" />
                  </div>
                  <h2 className="text-3xl font-serif font-bold">{profile?.name}</h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-[#F5F3EF] rounded-lg">
                    <Mail className="h-6 w-6 text-[#4A6741]" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{profile?.email}</p>
                    </div>
                  </div>
                  {profile?.bio && (
                    <div className="flex items-start space-x-4 p-4 bg-[#F5F3EF] rounded-lg">
                      <Info className="h-6 w-6 text-[#4A6741]" />
                      <div>
                        <p className="text-sm text-gray-600">Bio</p>
                        <p className="font-medium">{profile.bio}</p>
                      </div>
                    </div>
                  )}
                  <Button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition-colors mt-6"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content - Right Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Saved Recipes Section */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Heart className="h-6 w-6 text-[#4A6741]" />
                    <h3 className="text-2xl font-serif font-bold">Saved Recipes</h3>
                  </div>
                  {savedRecipes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {savedRecipes.map((savedRecipe) => (
                        <Link 
                          key={savedRecipe._id}
                          to={`/recipe/${savedRecipe.recipeId}`}
                          className="block group"
                        >
                          {savedRecipeDetails[savedRecipe.recipeId] && (
                            <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                              <img 
                                src={savedRecipeDetails[savedRecipe.recipeId].strMealThumb} 
                                alt={savedRecipeDetails[savedRecipe.recipeId].strMeal}
                                className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
                              />
                              <div className="p-4">
                                <h4 className="text-lg font-medium text-[#4A6741] group-hover:text-[#3A5331] mb-2">
                                  {savedRecipeDetails[savedRecipe.recipeId].strMeal}
                                </h4>
                                <div className="flex items-center text-sm text-gray-600">
                                  <ChefHat className="h-4 w-4 mr-1" />
                                  <span>{savedRecipeDetails[savedRecipe.recipeId].strCategory}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>You haven't saved any recipes yet.</p>
                      <Link 
                        to="/" 
                        className="text-[#4A6741] hover:text-[#3A5331] font-medium inline-block mt-2"
                      >
                        Explore recipes
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Recipe Notes Section */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <BookOpen className="h-6 w-6 text-[#4A6741]" />
                    <h3 className="text-2xl font-serif font-bold">Recipe Notes</h3>
                  </div>
                  {userNotes.length > 0 ? (
                    <div className="space-y-4">
                      {userNotes.map((note) => (
                        <Link 
                          key={note._id}
                          to={`/recipe/${note.recipeId}`}
                          className="block group"
                        >
                          <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                            <div className="flex items-start space-x-4">
                              {recipeDetails[note.recipeId] && (
                                <img 
                                  src={recipeDetails[note.recipeId].strMealThumb} 
                                  alt={recipeDetails[note.recipeId].strMeal}
                                  className="w-24 h-24 object-cover rounded-lg group-hover:opacity-90 transition-opacity"
                                />
                              )}
                              <div className="flex-1">
                                <h4 className="text-lg font-medium text-[#4A6741] group-hover:text-[#3A5331] mb-2">
                                  {recipeDetails[note.recipeId]?.strMeal || 'Recipe'}
                                </h4>
                                <p className="text-gray-700 line-clamp-2">{note.content}</p>
                                <p className="text-sm text-gray-500 mt-2">
                                  {new Date(note.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>You haven't made any recipe notes yet.</p>
                      <Link 
                        to="/" 
                        className="text-[#4A6741] hover:text-[#3A5331] font-medium inline-block mt-2"
                      >
                        Explore recipes
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[#2C3E50] text-white text-center py-6 mt-8">
        <p>&copy; 2024 Hearty Bites. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ProfilePage;
