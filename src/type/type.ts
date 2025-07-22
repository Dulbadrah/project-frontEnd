// types.ts

import { strict } from "assert";
import exp from "constants";

export type Food = {
  _id: string;
  foodName: string;
  price: String;
  image: string;
  ingredients: string;
  categoryName?: string;
};

export type FoodCategory = {
  _id: string;
  categoryName: string;
  foods: Food[];
};

export type FoodsWithCategoriesResponse = {
  FoodsWithCategories: FoodCategory[];
};
export type addCategoryResponse = {
  categoryNAme: string;
  setCategoryName: string;
  category: string;
};

export type FoodType = {
  food: Food;
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  createdAt: string;
  updatedAt: string;
  category: CategoryType;
};
export type CategoryType = {
  _id: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
};

export type FoodsWithCategory = {
  _id: string;
  categoryName: string;
  foods: FoodType[];
};
