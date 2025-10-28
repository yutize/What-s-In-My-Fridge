import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve(process.cwd(), "app.db");
export const db = new Database(dbPath);

db.pragma("foreign_keys = ON");


export function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS Users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      password TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
 
    CREATE TABLE IF NOT EXISTS Ingredients (
      ingredient_id INTEGER PRIMARY KEY AUTOINCREMENT,
      ingredient_name TEXT NOT NULL,
      unit TEXT,
      calories_per_unit REAL,
      protein_per_unit REAL,
      carbs_per_unit REAL,
      fat_per_unit REAL
    );

    CREATE TABLE IF NOT EXISTS Inventory (
      inventory_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      quantity REAL,
      expiration_date DATE,
      ingredient_id INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES Users(user_id),
      FOREIGN KEY (ingredient_id) REFERENCES Ingredients(ingredient_id)
    );

    CREATE TABLE IF NOT EXISTS NutritionProfile (
      nutrition_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      calories INTEGER,
      protein INTEGER,
      carbs INTEGER,
      fat INTEGER,
      allergy STRING,
      preference STRING,
      FOREIGN KEY (user_id) REFERENCES Users(user_id)
    );
  `);
}


initializeDatabase();