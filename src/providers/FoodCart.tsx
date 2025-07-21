"use client";

import { FoodType } from "@/type/type";
import { createContext, Dispatch, SetStateAction, useState } from "react";

type FoodWithQuantity = { food: FoodType; quantity: number };

type FoodCartContextType = {
  foodCart: FoodWithQuantity[];
  addToCart: (_food: FoodWithQuantity) => void;
  removeFromCart: (_foodId: string) => void;
  addQuantity: () => void;
  quantity: number;
  subtractQuantity: () => void;
  setFoodCart: Dispatch<SetStateAction<FoodWithQuantity[]>>;
};

export const FoodCartContext = createContext<FoodCartContextType>(
  {} as FoodCartContextType
);

export default function FoodCartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [foodCart, setFoodCart] = useState<FoodWithQuantity[]>([]);

  const [quantity, setQuantity] = useState<number>(1);

  const addToCart = (food: FoodWithQuantity) => {
    setFoodCart([...foodCart, food]);
  };
  const addQuantity = () => {
    setQuantity((prev) => prev + 1);
    console.log("add quantity", quantity);
  };

  const removeFromCart = (foodId: string) => {
    setFoodCart((prevCart) =>
      prevCart.filter((item) => item.food._id !== foodId)
    );
  };

  const subtractQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  console.log(quantity);
  return (
    <FoodCartContext.Provider
      value={{
        foodCart,
        addToCart,
        addQuantity,
        removeFromCart,
        subtractQuantity,
        quantity,
        setFoodCart,
      }}
    >
      {children}
    </FoodCartContext.Provider>
  );
}
