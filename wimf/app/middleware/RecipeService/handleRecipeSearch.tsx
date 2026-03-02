import axios from 'axios';
import type { EdamamResponse, RecipeSearchParams } from '~/services/edamamApi';

const APP_ID = process.env.APP_ID;
const APP_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.edamam.com/api/recipes/v2';

export async function handleRecipeSearch(params: RecipeSearchParams): Promise<EdamamResponse> {
  try {
    const ingredientQuery = Array.isArray(params.query) 
      ? params.query.join(' ').trim()
      : params.query.trim();
    
    if (!ingredientQuery || ingredientQuery.length === 0) {
      throw new Error('Please add at least one ingredient to search for recipes');
    }
    
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

    if (params.calories) {
      queryParams.calories = params.calories;
    }

    if (params.fat) {
      queryParams['nutrients[FAT]'] = params.fat;
    }

    if (params.carbs) {
      queryParams['nutrients[CHOCDF]'] = params.carbs;
    }

    console.log('Sending request to Edamam API with params:', JSON.stringify(queryParams, null, 2));

    const response = await axios.get<EdamamResponse>(BASE_URL, {
      params: queryParams,
      paramsSerializer: {
        indexes: null,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching recipes:', error.message);
      console.error('Error response:', error.response?.data);
      throw new Error(`Failed to fetch recipes: ${error.response?.data?.message || error.message}`);
    }
    throw error;
  }
}
