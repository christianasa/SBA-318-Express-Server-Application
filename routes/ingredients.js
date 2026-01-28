import express from "express";
import data, { getNextIngredientId } from "../data/databases.js";

const router = express.Router();

// GET all ingredients 
router.get("/", (req, res) => {
  let ingredients = data.ingredients;
  
  // Filter by recipe 
  if (req.query.recipeId) {
    const recipeId = parseInt(req.query.recipeId);
    ingredients = ingredients.filter(i => i.recipeId === recipeId);
  }
  
  res.json(ingredients);
});

// GET one ingredient by ID
router.get("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const ingredient = data.ingredients.find(i => i.id === id);
  
  if (!ingredient) {
    const error = new Error("Ingredient not found");
    error.statusCode = 404;
    return next(error);
  }
  
  res.json(ingredient);
});

// POST - Create new ingredient
router.post("/", (req, res, next) => {
  const { name, unit, recipeId, quantity } = req.body;
  
  if (!name || !unit || !recipeId) {
    const error = new Error("Name, unit, and recipeId are required");
    error.statusCode = 400;
    return next(error);
  }
  
  const newIngredient = {
    id: getNextIngredientId(),
    name,
    unit,
    recipeId: parseInt(recipeId),
    quantity: quantity ? parseFloat(quantity) : 1
  };
  
  data.ingredients.push(newIngredient);
  res.status(201).json(newIngredient);
});

// PUT - Replace entire ingredient
router.put("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const index = data.ingredients.findIndex(i => i.id === id);
  
  if (index === -1) {
    const error = new Error("Ingredient not found");
    error.statusCode = 404;
    return next(error);
  }
  
  const { name, unit, recipeId, quantity } = req.body;
  
  if (!name || !unit || !recipeId) {
    const error = new Error("Name, unit, and recipeId are required");
    error.statusCode = 400;
    return next(error);
  }
  
  data.ingredients[index] = {
    id,
    name,
    unit,
    recipeId: parseInt(recipeId),
    quantity: quantity ? parseFloat(quantity) : 1
  };
  
  res.json(data.ingredients[index]);
});

// DELETE - Remove ingredient
router.delete("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const index = data.ingredients.findIndex(i => i.id === id);
  
  if (index === -1) {
    const error = new Error("Ingredient not found");
    error.statusCode = 404;
    return next(error);
  }
  
  data.ingredients.splice(index, 1);
  res.json({ message: "Ingredient deleted successfully" });
});

export default router;