import Database from "better-sqlite3";
import path from "path";

const dbPath = process.env.SQLITE_PATH
  ? path.resolve(process.env.SQLITE_PATH)
  : process.env.VERCEL
    ? "/tmp/app.db"
    : path.resolve(process.cwd(), "app.db");
export const db = new Database(dbPath);

db.pragma("foreign_keys = ON");

export function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS Users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      password TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS Ingredients (
      ingredient_id INTEGER PRIMARY KEY AUTOINCREMENT,
      ingredient_name TEXT UNIQUE NOT NULL,
      category TEXT,
      uom TEXT NOT NULL,
      calories REAL,
      protein REAL,
      carbs REAL,
      fat REAL,
      fiber REAL,
      sugar REAL
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS Inventory (
      inventory_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      ingredient_id INTEGER NOT NULL,
      quantity REAL NOT NULL,
      expiration_date TEXT,
      FOREIGN KEY (user_id) REFERENCES Users(user_id),
      FOREIGN KEY (ingredient_id) REFERENCES Ingredients(ingredient_id)
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS NutritionProfile (
      nutrition_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      profileName TEXT,
      caloriesLow INTEGER,
      caloriesHigh INTEGER,
      protein INTEGER,
      carbs INTEGER,
      fat INTEGER,
      allergy TEXT,
      preference TEXT,
      isActive INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES Users(user_id)
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS RecipeSave (
      recipe_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      recipe_name TEXT NOT NULL,
      recipe_url TEXT NOT NULL,
      recipe_image TEXT,
      servings INTEGER,
      ingredients TEXT,
      FOREIGN KEY (user_id) REFERENCES Users(user_id)
    )
  `);

  console.log("✅ Database initialized successfully");
}

// Initialize on server startup
initializeDatabase();
