import express from "express";
import data, { getNextCategoryId } from "../data/databases.js";

const router = express.Router();

// GET categories
router.get("/", (req, res) => {
  res.json(data.categories);
});

// GET one category by ID with its recipes
router.get("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const category = data.categories.find(c => c.id === id);
  
  if (!category) {
    const error = new Error("Category not found");
    error.statusCode = 404;
    return next(error);
  }
  
  // Include recipes in this category
  const recipes = data.recipes.filter(r => r.categoryId === id);
  
  res.json({ ...category, recipes });
});

// POST - Create new category
router.post("/", (req, res, next) => {
  const { name, description } = req.body;
  
  if (!name) {
    const error = new Error("Name is required");
    error.statusCode = 400;
    return next(error);
  }
  
  const newCategory = {
    id: getNextCategoryId(),
    name,
    description: description || ""
  };
  
  data.categories.push(newCategory);
  res.status(201).json(newCategory);
});

// PATCH - Update category
router.patch("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const category = data.categories.find(c => c.id === id);
  
  if (!category) {
    const error = new Error("Category not found");
    error.statusCode = 404;
    return next(error);
  }
  
  const { name, description } = req.body;
  
  if (name) category.name = name;
  if (description) category.description = description;
  
  res.json(category);
});

// DELETE - Remove category
router.delete("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const index = data.categories.findIndex(c => c.id === id);
  
  if (index === -1) {
    const error = new Error("Category not found");
    error.statusCode = 404;
    return next(error);
  }
  
  data.categories.splice(index, 1);
  res.json({ message: "Category deleted successfully" });
});

export default router;