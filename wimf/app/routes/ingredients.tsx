import type { Route } from "./+types/ingredients";
import { Ingredients } from "~/pages/ingredients/ingredients";
import { requireUserId, getUserId } from "~/session.server";
import { db } from "~/db/app.server";
import { redirect } from "react-router";
import type { InventoryItem } from "~/types/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ingredient Manager" },
    { name: "description", content: "Manage the ingredients in your fridge" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  await requireUserId(request);
  const userId = await getUserId(request);
  
  const inventoryItems = db.prepare(`
    SELECT 
      inv.inventory_id,
      inv.quantity,
      inv.expiration_date,
      ing.ingredient_id,
      ing.ingredient_name,
      ing.category,
      ing.uom as unit
    FROM Inventory inv
    JOIN Ingredients ing ON inv.ingredient_id = ing.ingredient_id
    WHERE inv.user_id = ?
    ORDER BY inv.inventory_id DESC
  `).all(userId);
  
  return { inventoryItems };
}

export async function action({ request }: Route.ActionArgs) {
  const userId = await getUserId(request);
  const formData = await request.formData();
  const actionType = formData.get('actionType') as string;
  
  if (actionType === 'addIngredient') {
    const ingredientName = formData.get('ingredientName') as string;
    const quantity = parseFloat(formData.get('quantity') as string);
    const unit = formData.get('unit') as string;
    const category = formData.get('category') as string;
    const expirationDate = formData.get('expirationDate') as string || null;
    
    // Check if ingredient already exists in Ingredients table
    let ingredient = db.prepare(
      "SELECT ingredient_id FROM Ingredients WHERE LOWER(ingredient_name) = LOWER(?)"
    ).get(ingredientName) as { ingredient_id: number } | undefined;
    
    let ingredientId: number;
    
    if (!ingredient) {
      // Create new ingredient
      const result = db.prepare(
        "INSERT INTO Ingredients (ingredient_name, category, uom) VALUES (?, ?, ?)"
      ).run(ingredientName, category, unit);
      ingredientId = result.lastInsertRowid as number;
    } else {
      ingredientId = ingredient.ingredient_id;
    }

    db.prepare(
      "INSERT INTO Inventory (user_id, ingredient_id, quantity, expiration_date) VALUES (?, ?, ?, ?)"
    ).run(userId, ingredientId, quantity, expirationDate);
    
    return redirect('/ingredients');
  }
  
  if (actionType === 'deleteIngredient') {
    const inventoryId = parseInt(formData.get('inventoryId') as string);
    
    // Delete from inventory
    db.prepare(
      "DELETE FROM Inventory WHERE inventory_id = ? AND user_id = ?"
    ).run(inventoryId, userId);
    
    return redirect('/ingredients');
  }
  
  return null;
}

export default function IngredientsRoute({ loaderData }: Route.ComponentProps) {
  return <Ingredients inventoryItems={(loaderData.inventoryItems || []) as unknown as InventoryItem[]} />;
}