import type { ActionFunctionArgs } from "react-router";
import { db } from "../../db/app";

export async function handleRecipeSearch({ request }: ActionFunctionArgs) {
  const formData = await request.formData();


  console.log("Form Data Entries:", formData);
  }
