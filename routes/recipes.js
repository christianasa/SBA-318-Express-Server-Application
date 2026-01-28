import express from "express";
import data, { getNextRecipeId } from "../data/database.js";

const router = express.Router();

// GET all recipes 
router.get("/", (req, res) => {
  let recipes = data.recipes;
  
  // Filters by category 
  if (req.query.categoryId) {
    const categoryId = parseInt(req.query.categoryId);
    recipes = recipes.filter(r => r.categoryId === categoryId);
  }
  
  // Filters by name search
  if (req.query.search) {
    const searchTerm = req.query.search.toLowerCase();
    recipes = recipes.filter(r => 
      r.name.toLowerCase().includes(searchTerm) || 
      r.description.toLowerCase().includes(searchTerm)
    );
  }
  
  res.json(recipes);
});

// GET one recipe by ID 
router.get("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const recipe = data.recipes.find(r => r.id === id);
  
  if (!recipe) {
    const error = new Error("Recipe not found");
    error.statusCode = 404;
    return next(error);
  }
  
  // Include ingredients for this recipe
  const ingredients = data.ingredients.filter(i => i.recipeId === id);
  
  res.json({ ...recipe, ingredients });
});

// POST - Create new recipe
router.post("/", (req, res, next) => {
  const { name, description, categoryId, prepTime, cookTime, servings, instructions } = req.body;
  
  if (!name || !description) {
    const error = new Error("Name and description are required");
    error.statusCode = 400;
    return next(error);
  }
  
  const newRecipe = {
    id: getNextRecipeId(),
    name,
    description,
    categoryId: categoryId ? parseInt(categoryId) : null,
    prepTime: prepTime || "",
    cookTime: cookTime || "",
    servings: servings ? parseInt(servings) : 1,
    instructions: instructions || ""
  };
  
  data.recipes.push(newRecipe);
  res.status(201).json(newRecipe);
});

// PATCH - Update existing recipe
router.patch("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const recipe = data.recipes.find(r => r.id === id);
  
  if (!recipe) {
    const error = new Error("Recipe not found");
    error.statusCode = 404;
    return next(error);
  }
  
  // Update only provided fields
  const { name, description, categoryId, prepTime, cookTime, servings, instructions } = req.body;
  
  if (name) recipe.name = name;
  if (description) recipe.description = description;
  if (categoryId) recipe.categoryId = parseInt(categoryId);
  if (prepTime) recipe.prepTime = prepTime;
  if (cookTime) recipe.cookTime = cookTime;
  if (servings) recipe.servings = parseInt(servings);
  if (instructions) recipe.instructions = instructions;
  
  res.json(recipe);
});

// DELETE - Remove recipe
router.delete("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const index = data.recipes.findIndex(r => r.id === id);
  
  if (index === -1) {
    const error = new Error("Recipe not found");
    error.statusCode = 404;
    return next(error);
  }
  
  // Also delete associated ingredients
  data.ingredients = data.ingredients.filter(i => i.recipeId !== id);
  
  data.recipes.splice(index, 1);
  res.json({ message: "Recipe deleted successfully" });
});

export default router;