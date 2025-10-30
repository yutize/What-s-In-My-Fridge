import type { ActionFunctionArgs } from "react-router";
import { db } from "../../db/app";
import axios from "axios";
import { Link } from "react-router"

export async function handleRecipeSearch({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const entries = Array.from(formData.entries());
  console.log(process.env.APP_ID, process.env.API_KEY);
  console.log("Form Data Entries:", entries);

  async function fetchRecipies() {
    try {
      const res = await axios.get(
        "https://api.edamam.com/api/recipes/v2?type=public"
      )
    }
  }
  }
