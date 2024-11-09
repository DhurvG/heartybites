import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight, ChefHat, Clock, Globe, UserCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import CardContent from '../components/ui/CardContent';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const RECIPES_PER_PAGE = 12;

  const fetchRandomRecipes = async (count = 3) => {
    if (isFetching || !hasMore) return;
    
    setIsLoading(true);
    setIsFetching(true);
    try {
      for (let i = 0; i < count; i++) {
        if (popularRecipes.length >= page * RECIPES_PER_PAGE) {
          break;
        }

        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
        const meal = response.data.meals[0];
        const recipe = {
          title: meal.strMeal,
          category: meal.strCategory,
          area: meal.strArea,
          image: meal.strMealThumb || '/placeholder.svg',
          id: meal.idMeal,
        };
        
        setPopularRecipes(prev => {
          if (prev.some(r => r.id === recipe.id)) {
            return prev;
          }
          return [...prev, recipe];
        });
      }
    } catch (error) {
      console.error('Error fetching random recipes:', error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isFetching && hasMore) {
          if (popularRecipes.length < page * RECIPES_PER_PAGE) {
            fetchRandomRecipes(3);
          }
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [isFetching, hasMore, popularRecipes.length, page]);

  useEffect(() => {
    fetchRandomRecipes(6); // Load 6 recipes initially
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      const meal = response.data.meals[0];
      if (meal) {
        navigate(`/recipe/${meal.idMeal}`);
      } else {
        alert('No recipes found for the search term.');
      }
    } catch (error) {
      console.error('Error searching for recipes:', error);
      alert('An error occurred while searching for recipes. Please try again later.');
    }
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

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

      {/* Hero Section */}
      <section 
        className="relative h-[80vh] bg-cover bg-center bg-fixed" 
        style={{ 
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1543353071-873f17a7a088?q=80&w=1470&auto=format&fit=crop')"
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center max-w-4xl px-4">
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight animate-fade-in">
              Discover 
              <span className="text-[#E0C097] block mt-2">
                Delicious Recipes
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-white mb-8 opacity-90">
              Explore our collection of mouthwatering recipes from around the world
            </p>
            <Link to="/recipes">
              <Button className="bg-[#E0C097] text-[#2C3E50] hover:bg-[#C7A57F] transform hover:scale-105 transition-all duration-300 px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl">
                Explore Recipes
                <ChevronRight className="ml-2 h-5 w-5 inline-block" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F5F3EF] to-transparent"></div>
      </section>

      {/* Search Bar */}
      <section className="container mx-auto my-8 px-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search recipes, ingredients, or cuisines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 pl-10 pr-4 rounded-full border-2 border-[#4A6741] focus:border-[#E0C097] focus:ring-[#E0C097]"
          />
          <Button
            onClick={handleSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#4A6741] text-white hover:bg-[#E0C097] hover:text-[#2C3E50]"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Popular Recipes */}
      <section className="container mx-auto my-12 px-4">
        <h3 className="text-3xl font-serif font-bold mb-6">Popular Recipes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {popularRecipes.map((recipe, index) => (
            <Card key={`${recipe.id}-${index}`} className="overflow-hidden">
              <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
              <CardContent className="p-4">
                <h4 className="font-serif font-bold text-xl mb-2">{recipe.title}</h4>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="flex items-center">
                    <ChefHat className="h-4 w-4 mr-1" />
                    {recipe.category}
                  </span>
                  <span className="flex items-center">
                    <Globe className="h-4 w-4 mr-1" />
                    {recipe.area}
                  </span>
                </div>
                <Button
                  className="w-full bg-[#4A6741] hover:bg-[#3A5331] text-white"
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                >
                  View Recipe
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-12 flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
          {isLoading ? (
            <div className="flex items-center space-x-2 text-gray-500">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-transparent"></div>
              <span className="text-sm">Loading more recipes...</span>
            </div>
          ) : (
            popularRecipes.length >= page * RECIPES_PER_PAGE && (
              <Button
                onClick={handleLoadMore}
                className="bg-transparent hover:bg-[#4A6741] text-gray-500 hover:text-white px-8 py-2 rounded-full transition-all text-sm border border-gray-300 hover:border-[#4A6741] flex items-center space-x-2 hover:shadow-md"
              >
                <span>Load More</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            )
          )}
          <div ref={observerTarget} className="h-4" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C3E50] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-serif font-bold text-xl mb-4">Hearty Bites</h4>
              <p className="text-sm">Discover, cook, and share delicious recipes with food lovers around the world.</p>
            </div>
            <div>
              <h4 className="font-serif font-bold text-xl mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:text-[#E0C097]">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/recipes" className="hover:text-[#E0C097]">
                    Recipes
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-[#E0C097]">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif font-bold text-xl mb-4">Follow Us</h4>
              <div className="flex space-x-6">
                <Instagram className="text-[#E0C097] hover:text-white h-6 w-6" />
                <Facebook className="text-[#E0C097] hover:text-white h-6 w-6" />
                <Twitter className="text-[#E0C097] hover:text-white h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
