# Hearty Bites

A full-stack recipe sharing and management application built with React, Node.js, Express, and MongoDB.

## Overview

Hearty Bites is a web application that allows users to discover, save, and manage recipes. Users can create accounts, browse recipes, save their favorites, add personal notes, and more.

## Features

- User authentication (signup/login)
- Recipe browsing and searching
- Save favorite recipes
- Add personal notes to recipes
- Profile management
- Responsive design
- Category-based recipe filtering

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Lucide React (icons)
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- CORS

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/JapitChhabra/heart-bites.git
   cd heart-bites
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root directory with the following variables:
   ```plaintext
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Running the Project**:

   - To start both frontend and backend simultaneously (recommended for development):
     ```bash
     npm run dev
     ```
     This command uses `concurrently` to run the frontend on port 5001 and the backend on port 5000.

   - To start only the frontend:
     ```bash
     npm start
     ```

   - To start only the backend:
     ```bash
     npm run server
     ```

## Additional Setup
--

1. **Database Setup**:
   - The application will automatically create the required collections in MongoDB.
   - Initial data will be seeded when the server starts.

2. **API Keys**:
   - The application uses the free TheMealDB API, so no API key is required.

## Common Issues

1. **MongoDB Connection**:
   If you encounter MongoDB connection issues:
   - Ensure MongoDB is running locally.
   - Check if the `MONGO_URI` in `.env` is correct.
   - Verify MongoDB port (default: 27017).

2. **Port Conflicts**:
   If port 5000 or 5001 is already in use:
   - Change the port in the `.env` file or the `server.js` file.
   - Update the CORS configuration in `server.js` accordingly.

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

### Notes
- `GET /api/notes/user` - Get all notes for current user
- `GET /api/notes/:recipeId` - Get notes for specific recipe
- `POST /api/notes` - Create/update a note
- `DELETE /api/notes/:noteId` - Delete a note

### Recipes
- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:id` - Get specific recipe
- `POST /api/recipes/save` - Save a recipe
- `DELETE /api/recipes/save/:id` - Remove saved recipe

### Profiles
- `GET /api/profiles` - Get user profile
- Protected routes require JWT token in Authorization header.

## Dependencies

### Frontend Dependencies
```json
{
  "@radix-ui/react-dropdown-menu": "^2.1.2",
  "@radix-ui/react-select": "^2.1.2",
  "axios": "^1.7.7",
  "lucide-react": "^0.455.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.28.0"
}
```

### Backend Dependencies
```json
{
  "bcryptjs": "^2.4.3",
  "cors": "^2.8.5",
  "dotenv": "^16.4.5",
  "express": "^4.21.1",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.8.1"
}
```

### Development Dependencies
```json
{
  "autoprefixer": "^10.4.20",
  "postcss": "^8.4.47",
  "tailwindcss": "^3.4.14"
}
```

## Acknowledgments

- Recipe data provided by [TheMealDB API](https://www.themealdb.com/api.php)
- Icons from [Lucide React](https://lucide.dev/)

---

This `README.md` now has clear instructions for setting up and running the project, whether users want to run the frontend, backend, or both simultaneously.