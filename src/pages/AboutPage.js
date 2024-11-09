import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Utensils, Users, Heart, Globe } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#F5F3EF] text-[#2C3E50] font-sans">
      {/* Header */}
      <header className="bg-[#4A6741] text-white p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold">Hearty Bites</h1>
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center text-[#E0C097] hover:text-white"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back to Home
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">About Hearty Bites</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your go-to destination for discovering, saving, and sharing delicious recipes from around the world.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#4A6741] text-white rounded-full mb-4">
              <Utensils className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Diverse Recipes</h3>
            <p className="text-gray-600">
              Access a wide variety of recipes from different cuisines and skill levels.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#4A6741] text-white rounded-full mb-4">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Save Favorites</h3>
            <p className="text-gray-600">
              Save your favorite recipes and access them anytime, anywhere.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#4A6741] text-white rounded-full mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Personal Notes</h3>
            <p className="text-gray-600">
              Add personal notes to recipes to remember your modifications and tips.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#4A6741] text-white rounded-full mb-4">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Video Tutorials</h3>
            <p className="text-gray-600">
              Watch video tutorials to perfect your cooking techniques.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <h3 className="text-2xl font-serif font-bold mb-4">Our Mission</h3>
          <p className="text-gray-600 leading-relaxed">
            At Hearty Bites, we believe that cooking should be accessible, enjoyable, and inspiring. 
            Our mission is to provide a platform where food enthusiasts of all levels can discover new recipes, 
            save their favorites, and make cooking a delightful experience. Whether you're a beginner or an 
            experienced chef, we're here to support your culinary journey with detailed recipes, video tutorials, 
            and the ability to personalize your cooking experience through notes and collections.
          </p>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-serif font-bold mb-6">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#E0C097] text-[#2C3E50] rounded-full text-xl font-bold mb-4">
                1
              </div>
              <h4 className="text-lg font-bold mb-2">Browse Recipes</h4>
              <p className="text-gray-600">
                Search through our extensive collection of recipes from various cuisines.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#E0C097] text-[#2C3E50] rounded-full text-xl font-bold mb-4">
                2
              </div>
              <h4 className="text-lg font-bold mb-2">Save & Customize</h4>
              <p className="text-gray-600">
                Save your favorite recipes and add personal notes for future reference.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#E0C097] text-[#2C3E50] rounded-full text-xl font-bold mb-4">
                3
              </div>
              <h4 className="text-lg font-bold mb-2">Cook & Enjoy</h4>
              <p className="text-gray-600">
                Follow the recipes, watch tutorials, and create delicious meals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#2C3E50] text-white text-center py-6 mt-8">
        <p>&copy; 2024 Hearty Bites. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage; 