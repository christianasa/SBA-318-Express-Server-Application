// Imports
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import recipesRouter from "./routes/recipes.js";
import ingredientsRouter from "./routes/ingredients.js";
import categoriesRouter from "./routes/categories.js";
import { logger, requestTimer, errorHandler } from "./middleware/middlewares.js";

// Setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setups
const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(logger);
app.use(requestTimer);

// Custom View Engine
app.engine("html", function (filePath, options, cb) {
  fs.readFile(filePath, (err, content) => {
    if (err) return cb(err);

    let rendered = content.toString();
    
    // Replace template variables
    Object.keys(options).forEach(key => {
      const regex = new RegExp(`<%=\\s*${key}\\s*%>`, "g");
      rendered = rendered.replace(regex, options[key]);
    });

    return cb(null, rendered);
  });
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

// Routes
app.get("/", (req, res) => {
  res.render("index.html", { title: "Recipe Collection Home" });
});

app.use("/api/recipes", recipesRouter);
app.use("/api/ingredients", ingredientsRouter);
app.use("/api/categories", categoriesRouter);

// Error handling middleware (must be last)
app.use(errorHandler);

// Listner 
app.listen(PORT, () => {
  console.log(`Recipe Collection server running on http://localhost:${PORT}`);
});