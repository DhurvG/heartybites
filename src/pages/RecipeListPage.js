import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';  // Import useNavigate for programmatic navigation and Link for navigation
import { Search, Globe, ChefHat, SortAsc, UserCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import CardContent from '../components/ui/CardContent';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import axios from 'axios';

export default function RecipeListingPage() {
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [dessertRecipes, setDessertRecipes] = useState([]);
  const [seafoodRecipes, setSeafoodRecipes] = useState([]);
  const [sideRecipes, setSideRecipes] = useState([]);
  const [starterRecipes, setStarterRecipes] = useState([]);
  const [breakfastRecipes, setBreakfastRecipes] = useState([]);
  const [pastaRecipes, setPastaRecipes] = useState([]);
  const [chickenRecipes, setChickenRecipes] = useState([]);
  const [miscRecipes, setMiscRecipes] = useState([]);
  const [beefRecipes, setBeefRecipes] = useState([]);
  const [porkRecipes, setPorkRecipes] = useState([]);
  const [goatRecipes, setGoatRecipes] = useState([]);
  const [vegetarianRecipes, setVegetarianRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const navigate = useNavigate(); // Hook for navigation

  const veganRef = useRef(null);
  const dessertRef = useRef(null);
  const seafoodRef = useRef(null);
  const sideRef = useRef(null);
  const starterRef = useRef(null);
  const breakfastRef = useRef(null);
  const pastaRef = useRef(null);
  const chickenRef = useRef(null);
  const miscRef = useRef(null);
  const beefRef = useRef(null);
  const porkRef = useRef(null);
  const goatRef = useRef(null);
  const vegetarianRef = useRef(null);

  useEffect(() => {
    const fetchRandomRecipes = async (category, setRecipes) => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        let allRecipes = response.data.meals;
  
        // Shuffle the array to randomize order
        allRecipes = allRecipes.sort(() => Math.random() - 0.5);
  
        // Select up to 6 unique recipes
        const selectedRecipes = allRecipes.slice(0, 6).map((meal) => ({
          id: meal.idMeal,
          title: meal.strMeal,
          image: meal.strMealThumb || '/placeholder.svg',
        }));
  
        setRecipes(selectedRecipes);
      } catch (error) {
        console.error(`Error fetching ${category} recipes:`, error);
      }
    };
  
    fetchRandomRecipes('Vegan', setFilteredRecipes);
    fetchRandomRecipes('Dessert', setDessertRecipes);
    fetchRandomRecipes('Seafood', setSeafoodRecipes);
    fetchRandomRecipes('Side', setSideRecipes);
    fetchRandomRecipes('Starter', setStarterRecipes);
    fetchRandomRecipes('Breakfast', setBreakfastRecipes);
    fetchRandomRecipes('Pasta', setPastaRecipes);
    fetchRandomRecipes('Chicken', setChickenRecipes);
    fetchRandomRecipes('Miscellaneous', setMiscRecipes);
    fetchRandomRecipes('Beef', setBeefRecipes);
    fetchRandomRecipes('Pork', setPorkRecipes);
    fetchRandomRecipes('Goat', setGoatRecipes);
    fetchRandomRecipes('Vegetarian', setVegetarianRecipes);
  }, []);

  const handleViewRecipe = (id) => {
    navigate(`/recipe/${id}`);  // Navigate to the RecipeDetailsPage with recipe id
  };

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

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
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

      {/* Category Display */}
      <section className="bg-[#E0C097] py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-center mb-4">Our Recipes</h2>
          <p className="text-center text-lg mb-8">Discover a world of flavors with our diverse recipe collection</p>
        </div>
      </section>

      {/* Add Search Bar Section */}
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

      {/* Category Navigation */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-serif font-bold text-center mb-6">Categories</h2>
        <div className="relative">
          <div className="flex overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex gap-4 mx-auto">
              <Button 
                onClick={() => scrollToSection(veganRef)}
                className="bg-[#4A6741] text-white hover:bg-[#E0C097] hover:text-[#2C3E50] px-6 py-2 rounded-full whitespace-nowrap"
              >
                Vegan
              </Button>
              <Button 
                onClick={() => scrollToSection(dessertRef)}
                className="bg-[#4A6741] text-white hover:bg-[#E0C097] hover:text-[#2C3E50] px-6 py-2 rounded-full whitespace-nowrap"
              >
                Desserts
              </Button>
              <Button 
                onClick={() => scrollToSection(seafoodRef)}
                className="bg-[#4A6741] text-white hover:bg-[#E0C097] hover:text-[#2C3E50] px-6 py-2 rounded-full whitespace-nowrap"
              >
                Seafood
              </Button>
              <Button 
                onClick={() => scrollToSection(sideRef)}
                className="bg-[#4A6741] text-white hover:bg-[#E0C097] hover:text-[#2C3E50] px-6 py-2 rounded-full whitespace-nowrap"
              >
                Sides
              </Button>
              <Button 
                onClick={() => scrollToSection(starterRef)}
                className="bg-[#4A6741] text-white hover:bg-[#E0C097] hover:text-[#2C3E50] px-6 py-2 rounded-full whitespace-nowrap"
              >
                Starters
              </Button>
              <Button 
                onClick={() => scrollToSection(breakfastRef)}
                className="bg-[#4A6741] text-white hover:bg-[#E0C097] hover:text-[#2C3E50] px-6 py-2 rounded-full whitespace-nowrap"
              >
                Breakfast
              </Button>
              <Button 
                onClick={() => scrollToSection(pastaRef)}
                className="bg-[#4A6741] text-white hover:bg-[#E0C097] hover:text-[#2C3E50] px-6 py-2 rounded-full whitespace-nowrap"
              >
                Pasta
              </Button>
              <Button 
                onClick={() => scrollToSection(chickenRef)}
                className="bg-[#4A6741] text-white hover:bg-[#E0C097] hover:text-[#2C3E50] px-6 py-2 rounded-full whitespace-nowrap"
              >
                Chicken
              </Button>
              <Button 
                onClick={() => scrollToSection(miscRef)}
                className="bg-[#4A6741] text-white hover:bg-[#E0C097] hover:text-[#2C3E50] px-6 py-2 rounded-full whitespace-nowrap"
              >
                Specialties
              </Button>
              <Button 
                onClick={() => scrollToSection(beefRef)}
                className="bg-[#4A6741] text-white hover:bg-[#E0C097] hover:text-[#2C3E50] px-6 py-2 rounded-full whitespace-nowrap"
              >
                Beef
              </Button>
              <Button 
                onClick={() => scrollToSection(porkRef)}
                className="bg-[#4A6741] text-white hover:bg-[#E0C097] hover:text-[#2C3E50] px-6 py-2 rounded-full whitespace-nowrap"
              >
                Pork
              </Button>
              <Button 
                onClick={() => scrollToSection(goatRef)}
                className="bg-[#4A6741] text-white hover:bg-[#E0C097] hover:text-[#2C3E50] px-6 py-2 rounded-full whitespace-nowrap"
              >
                Goat
              </Button>
              <Button 
                onClick={() => scrollToSection(vegetarianRef)}
                className="bg-[#4A6741] text-white hover:bg-[#E0C097] hover:text-[#2C3E50] px-6 py-2 rounded-full whitespace-nowrap"
              >
                Vegetarian
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Vegan Section */}
      <section ref={veganRef} className="bg-[#E0C097] py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-serif font-bold mb-6 text-center">Vegan Delights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h4 className="font-serif font-bold text-lg text-center mb-2">{recipe.title}</h4>
                  <div className="flex justify-center gap-4 text-sm text-gray-600">
                    <span>{recipe.category}</span>
                    <span>•</span>
                    <span>{recipe.area}</span>
                  </div>
                  <Button 
                    onClick={() => handleViewRecipe(recipe.id)}
                    className="w-full mt-4 bg-[#4A6741] hover:bg-[#3A5331] text-white"
                  >
                    View Recipe
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Desserts Section */}
      <section ref={dessertRef} className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-serif font-bold mb-6 text-center">Delightful Desserts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {dessertRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-[#F5F3EF]">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h4 className="font-serif font-bold text-lg text-center mb-2">{recipe.title}</h4>
                  <div className="flex justify-center gap-4 text-sm text-gray-600">
                    <span>{recipe.category}</span>
                    <span>•</span>
                    <span>{recipe.area}</span>
                  </div>
                  <Button 
                    onClick={() => handleViewRecipe(recipe.id)}
                    className="w-full mt-4 bg-[#4A6741] hover:bg-[#3A5331] text-white"
                  >
                    View Recipe
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Seafood Section */}
      <section ref={seafoodRef} className="bg-[#E0C097] py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-serif font-bold mb-6 text-center">Fresh Seafood</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {seafoodRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h4 className="font-serif font-bold text-lg text-center mb-2">{recipe.title}</h4>
                  <Button 
                    onClick={() => handleViewRecipe(recipe.id)}
                    className="w-full mt-4 bg-[#4A6741] hover:bg-[#3A5331] text-white"
                  >
                    View Recipe
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Side Dishes Section */}
      <section ref={sideRef} className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-serif font-bold mb-6 text-center">Satisfying Sides</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {sideRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-[#F5F3EF]">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h4 className="font-serif font-bold text-lg text-center mb-2">{recipe.title}</h4>
                  <div className="flex justify-center gap-4 text-sm text-gray-600">
                    <span>{recipe.category}</span>
                    <span>•</span>
                    <span>{recipe.area}</span>
                  </div>
                  <Button 
                    onClick={() => handleViewRecipe(recipe.id)}
                    className="w-full mt-4 bg-[#4A6741] hover:bg-[#3A5331] text-white"
                  >
                    View Recipe
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Starters Section */}
      <section ref={starterRef} className="bg-[#E0C097] py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-serif font-bold mb-6 text-center">Appetizing Starters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {starterRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h4 className="font-serif font-bold text-lg text-center mb-2">{recipe.title}</h4>
                  <div className="flex justify-center gap-4 text-sm text-gray-600">
                    <span>{recipe.category}</span>
                    <span>•</span>
                    <span>{recipe.area}</span>
                  </div>
                  <Button 
                    onClick={() => handleViewRecipe(recipe.id)}
                    className="w-full mt-4 bg-[#4A6741] hover:bg-[#3A5331] text-white"
                  >
                    View Recipe
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Breakfast Section */}
      <section ref={breakfastRef} className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-serif font-bold mb-6 text-center">Breakfast Favorites</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {breakfastRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-[#F5F3EF]">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h4 className="font-serif font-bold text-lg text-center mb-2">{recipe.title}</h4>
                  <div className="flex justify-center gap-4 text-sm text-gray-600">
                    <span>{recipe.category}</span>
                    <span>•</span>
                    <span>{recipe.area}</span>
                  </div>
                  <Button 
                    onClick={() => handleViewRecipe(recipe.id)}
                    className="w-full mt-4 bg-[#4A6741] hover:bg-[#3A5331] text-white"
                  >
                    View Recipe
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pasta Section */}
      <section ref={pastaRef} className="bg-[#E0C097] py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-serif font-bold mb-6 text-center">Perfect Pasta</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {pastaRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h4 className="font-serif font-bold text-lg text-center mb-2">{recipe.title}</h4>
                  <div className="flex justify-center gap-4 text-sm text-gray-600">
                    <span>{recipe.category}</span>
                    <span>•</span>
                    <span>{recipe.area}</span>
                  </div>
                  <Button 
                    onClick={() => handleViewRecipe(recipe.id)}
                    className="w-full mt-4 bg-[#4A6741] hover:bg-[#3A5331] text-white"
                  >
                    View Recipe
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Chicken Section */}
      <section ref={chickenRef} className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-serif font-bold mb-6 text-center">Chicken Dishes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {chickenRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-[#F5F3EF]">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h4 className="font-serif font-bold text-lg text-center mb-2">{recipe.title}</h4>
                  <div className="flex justify-center gap-4 text-sm text-gray-600">
                    <span>{recipe.category}</span>
                    <span>•</span>
                    <span>{recipe.area}</span>
                  </div>
                  <Button 
                    onClick={() => handleViewRecipe(recipe.id)}
                    className="w-full mt-4 bg-[#4A6741] hover:bg-[#3A5331] text-white"
                  >
                    View Recipe
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Miscellaneous Section */}
      <section ref={miscRef} className="bg-[#E0C097] py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-serif font-bold mb-6 text-center">Unique Specialties</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {miscRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h4 className="font-serif font-bold text-lg text-center mb-2">{recipe.title}</h4>
                  <Button 
                    onClick={() => handleViewRecipe(recipe.id)}
                    className="w-full mt-4 bg-[#4A6741] hover:bg-[#3A5331] text-white"
                  >
                    View Recipe
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Beef Section */}
      <section ref={beefRef} className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-serif font-bold mb-6 text-center">Beef Specialties</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {beefRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-[#F5F3EF]">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h4 className="font-serif font-bold text-lg text-center mb-2">{recipe.title}</h4>
                  <Button 
                    onClick={() => handleViewRecipe(recipe.id)}
                    className="w-full mt-4 bg-[#4A6741] hover:bg-[#3A5331] text-white"
                  >
                    View Recipe
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pork Section */}
      <section ref={porkRef} className="bg-[#E0C097] py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-serif font-bold mb-6 text-center">Pork Dishes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {porkRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h4 className="font-serif font-bold text-lg text-center mb-2">{recipe.title}</h4>
                  <Button 
                    onClick={() => handleViewRecipe(recipe.id)}
                    className="w-full mt-4 bg-[#4A6741] hover:bg-[#3A5331] text-white"
                  >
                    View Recipe
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Goat Section */}
      <section ref={goatRef} className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-serif font-bold mb-6 text-center">Goat Delicacies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {goatRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-[#F5F3EF]">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h4 className="font-serif font-bold text-lg text-center mb-2">{recipe.title}</h4>
                  <Button 
                    onClick={() => handleViewRecipe(recipe.id)}
                    className="w-full mt-4 bg-[#4A6741] hover:bg-[#3A5331] text-white"
                  >
                    View Recipe
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vegetarian Section */}
      <section ref={vegetarianRef} className="bg-[#E0C097] py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-serif font-bold mb-6 text-center">Vegetarian Favorites</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {vegetarianRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h4 className="font-serif font-bold text-lg text-center mb-2">{recipe.title}</h4>
                  <Button 
                    onClick={() => handleViewRecipe(recipe.id)}
                    className="w-full mt-4 bg-[#4A6741] hover:bg-[#3A5331] text-white"
                  >
                    View Recipe
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
}
