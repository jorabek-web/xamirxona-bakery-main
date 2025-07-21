export type GetAllRetsepsRequest = {};
type IngredientDetail =  {
  _id: string;
  title: string;
  scope: string;
  branch: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

type Ingredients = {
  ingredient: IngredientDetail;
  amount: number;
  _id: string;
}

export type GetAllRetsepsResponse = {
  _id: string;
  title: string;
  branch: string;
  price_for_baker: number;
  price_for_divider: number;
  bread_selling_price: number;
  ingredients: Ingredients[];
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetRetsepRequest {
  id: string;
}

export interface GetRetsepResponse {
  [];
}
