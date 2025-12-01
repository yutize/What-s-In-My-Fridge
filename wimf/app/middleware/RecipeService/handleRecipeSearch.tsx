import axios from 'axios';
import type { EdamamResponse, RecipeSearchParams } from '~/services/edamamApi';

const APP_ID = process.env.APP_ID;
const APP_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.edamam.com/api/recipes/v2';

export async function handleRecipeSearch(params: RecipeSearchParams): Promise<EdamamResponse> {
  try {
    const ingredientQuery = Array.isArray(params.query) 
      ? params.query.join(' ') 
      : params.query;
    const queryParams: Record<string, any> = {
      type: 'public',
      q: ingredientQuery,
      app_id: APP_ID,
      app_key: APP_KEY,
    };

    if (params.allergies && params.allergies.length > 0) {
      queryParams.health = params.allergies;
    }

    if (params.mealpreference && params.mealpreference.length > 0) {
      queryParams.diet = params.mealpreference;
    }


    const response = await axios.get<EdamamResponse>(BASE_URL, {
      params: queryParams,
    });

    console.log('Number of hits:', response.data.hits?.length || 0);
    
    if (response.data.hits && response.data.hits.length > 0) {
      response.data.hits.forEach((hit, index) => {
        console.log('Recipe name:', hit.recipe.label);
        console.log('Image:', hit.recipe.image);
        console.log('URL:', hit.recipe.url);
        console.log('Ingredients:', hit.recipe.ingredientLines);
        console.log('Nutrients:', JSON.stringify(hit.recipe.totalNutrients, null, 2));
      });
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching recipes:', error.message);
      throw new Error(`Failed to fetch recipes: ${error.message}`);
    }
    throw error;
  }
}
