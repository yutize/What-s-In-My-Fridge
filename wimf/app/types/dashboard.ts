export interface ProfileOption {
  nutrition_id: number;
  profileName: string | null;
}

export interface InventoryItem {
  inventory_id: number;
  quantity: number;
  expiration_date: string | null;
  ingredient_name: string;
  unit: string | null;
}
