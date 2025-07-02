// types.ts

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
