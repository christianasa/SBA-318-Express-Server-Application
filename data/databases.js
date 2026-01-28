// In-memory data storage with sample data
const data = {
  recipes: [
    {
      id: 1,
      name: "Chocolate Chip Cookies",
      description: "Classic homemade chocolate chip cookies",
      categoryId: 3,
      prepTime: "15 minutes",
      cookTime: "12 minutes",
      servings: 24,
      instructions: "Mix ingredients, bake at 350°F for 12 minutes"
    },
    {
      id: 2,
      name: "Caesar Salad",
      description: "Fresh romaine with homemade Caesar dressing",
      categoryId: 1,
      prepTime: "10 minutes",
      cookTime: "0 minutes",
      servings: 4,
      instructions: "Toss romaine with dressing, croutons, and parmesan"
    },
    {
      id: 3,
      name: "Spaghetti Carbonara",
      description: "Creamy Italian pasta with bacon",
      categoryId: 2,
      prepTime: "10 minutes",
      cookTime: "20 minutes",
      servings: 4,
      instructions: "Cook pasta, mix with eggs, cheese, and crispy bacon"
    }
  ],
  
  ingredients: [
    { id: 1, name: "Flour", unit: "cups", recipeId: 1, quantity: 2.5 },
    { id: 2, name: "Chocolate Chips", unit: "cups", recipeId: 1, quantity: 2 },
    { id: 3, name: "Sugar", unit: "cups", recipeId: 1, quantity: 1 },
    { id: 4, name: "Romaine Lettuce", unit: "heads", recipeId: 2, quantity: 2 },
    { id: 5, name: "Parmesan Cheese", unit: "cups", recipeId: 2, quantity: 0.5 },
    { id: 6, name: "Spaghetti", unit: "pounds", recipeId: 3, quantity: 1 },
    { id: 7, name: "Bacon", unit: "strips", recipeId: 3, quantity: 8 },
    { id: 8, name: "Eggs", unit: "whole", recipeId: 3, quantity: 4 }
  ],
  
  categories: [
    { id: 1, name: "Appetizers & Salads", description: "Light starters and fresh salads" },
    { id: 2, name: "Main Dishes", description: "Hearty entrees and main courses" },
    { id: 3, name: "Desserts", description: "Sweet treats and baked goods" },
    { id: 4, name: "Breakfast", description: "Morning meals and brunch items" }
  ]
};

// Counter for generating new IDs
let nextRecipeId = 4;
let nextIngredientId = 9;
let nextCategoryId = 5;

export function getNextRecipeId() {
  return nextRecipeId++;
}

export function getNextIngredientId() {
  return nextIngredientId++;
}

export function getNextCategoryId() {
  return nextCategoryId++;
}

export default data;