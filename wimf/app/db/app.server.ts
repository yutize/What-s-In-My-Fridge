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

  db.exec(`
    CREATE TABLE IF NOT EXISTS ChatHistory (
      chat_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      role TEXT NOT NULL,
      content TEXT NOT NULL,
      form_updates TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES Users(user_id)
    )
  `);

  console.log("✅ Database initialized successfully");
}

/**
 * Safely adds columns/tables that may be missing on existing databases.
 * SQLite's CREATE TABLE IF NOT EXISTS won't update existing tables,
 * so we use PRAGMA table_info + ALTER TABLE for additive migrations.
 */
function runMigrations() {
  // Helper: check if a column exists in a table
  function hasColumn(table: string, column: string): boolean {
    const info = db.pragma(`table_info(${table})`) as Array<{ name: string }>;
    return info.some((col) => col.name === column);
  }

  // Helper: check if a table exists
  function hasTable(table: string): boolean {
    const row = db
      .prepare(
        "SELECT name FROM sqlite_master WHERE type='table' AND name=?"
      )
      .get(table);
    return !!row;
  }

  // --- NutritionProfile migrations ---
  if (hasTable("NutritionProfile")) {
    if (!hasColumn("NutritionProfile", "isActive")) {
      db.exec("ALTER TABLE NutritionProfile ADD COLUMN isActive INTEGER DEFAULT 0");
      console.log("🔧 Migration: added NutritionProfile.isActive");
    }
    if (!hasColumn("NutritionProfile", "profileName")) {
      db.exec("ALTER TABLE NutritionProfile ADD COLUMN profileName TEXT");
      console.log("🔧 Migration: added NutritionProfile.profileName");
    }
    if (!hasColumn("NutritionProfile", "created_at")) {
      // SQLite ALTER TABLE cannot use non-constant defaults like CURRENT_TIMESTAMP.
      // Add without default; new rows will use the DEFAULT from CREATE TABLE.
      db.exec("ALTER TABLE NutritionProfile ADD COLUMN created_at DATETIME");
      console.log("🔧 Migration: added NutritionProfile.created_at");
    }
  }

  // --- Ingredients table migrations ---
  if (hasTable("Ingredients")) {
    const ingredientCols: Array<[string, string]> = [
      ["category",  "TEXT"],
      ["uom",       "TEXT"],
      ["calories",  "REAL"],
      ["protein",   "REAL"],
      ["carbs",     "REAL"],
      ["fat",       "REAL"],
      ["fiber",     "REAL"],
      ["sugar",     "REAL"],
    ];
    for (const [col, type] of ingredientCols) {
      if (!hasColumn("Ingredients", col)) {
        db.exec(`ALTER TABLE Ingredients ADD COLUMN ${col} ${type}`);
        console.log(`🔧 Migration: added Ingredients.${col}`);
      }
    }
  }

  // --- ChatHistory table (may not exist on older DBs) ---
  if (!hasTable("ChatHistory")) {
    db.exec(`
      CREATE TABLE ChatHistory (
        chat_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        form_updates TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users(user_id)
      )
    `);
    console.log("🔧 Migration: created ChatHistory table");
  }

  console.log("✅ Migrations complete");
}

// Initialize on server startup
initializeDatabase();
runMigrations();
