import { db } from "~/db/app.server";

export async function deleteSavedRecipe(recipeId: number, userId: number): Promise<{ success: boolean; message: string }> {
  try {
    const recipe = db.prepare(
      "SELECT * FROM RecipeSave WHERE recipe_id = ? AND user_id = ?"
    ).get(recipeId, userId);

    if (!recipe) {
      return { 
        success: false, 
        message: "Recipe not found or you don't have permission to delete it" 
      };
    }

    db.prepare(
      "DELETE FROM RecipeSave WHERE recipe_id = ? AND user_id = ?"
    ).run(recipeId, userId);

    console.log('Recipe deleted:', recipeId, 'for user:', userId);
    
    return { 
      success: true, 
      message: "Recipe deleted successfully" 
    };
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return { 
      success: false, 
      message: "Failed to delete recipe" 
    };
  }
}