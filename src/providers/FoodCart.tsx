"use client";

import { FoodType } from "@/type/type";
import { createContext, useContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

export type FoodWithQuantity = {
  food: FoodType;
  quantity: number;
  totalPrice: number;
};

type FoodCartContextType = {
  foodCart: FoodWithQuantity[];
  totalPrices: number;
  addToCart: (_food: FoodWithQuantity) => void;
  orderFood: () => Promise<AxiosResponse<any, any>>;
  orderFoodGet: (_food: FoodWithQuantity) => void;
  removeFromCart: (_foodId: string) => void;
  incrementFoodQuantity: (_foodId: string) => void;
  decrimentFoodQuantity: (_foodId: string) => void;
  orderedFood: [];
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
  const [orderedFood, setOrderedFood] = useState([]);
  const addToCart = (newFood: FoodWithQuantity) => {
    const existingFood = foodCart.find(
      ({ food }) => food._id === newFood.food._id
    );

    if (existingFood) {
      const updatedFoodCart = updateFoodCart(foodCart, newFood);
      setFoodCart(updatedFoodCart);
      return;
    }

    setFoodCart([...foodCart, newFood]);
  };

  const incrementFoodQuantity = (foodId: string) => {
    const updatedFoodCart = foodCart.map(({ food, quantity }) => {
      if (food._id === foodId) {
        const newQuantity = quantity + 1;
        return {
          food,
          quantity: newQuantity,
          totalPrice: newQuantity * Number(food.price),
        };
      }
      return { food, quantity, totalPrice: quantity * Number(food.price) };
    });

    setFoodCart(updatedFoodCart);
  };

  const decrimentFoodQuantity = (foodId: string) => {
    const updatedFoodCart = foodCart
      .map(({ food, quantity }) => {
        if (food._id === foodId) {
          const newQuantity = quantity - 1;
          if (newQuantity <= 0) return null;
          return {
            food,
            quantity: newQuantity,
            totalPrice: newQuantity * Number(food.price),
          };
        }
        return {
          food,
          quantity,
          totalPrice: quantity * Number(food.price),
        };
      })
      .filter(Boolean) as FoodWithQuantity[];

    setFoodCart(updatedFoodCart);
  };

  const removeFromCart = (foodId: string) => {
    const updatedCart = foodCart.filter(({ food }) => food._id !== foodId);
    setFoodCart(updatedCart);
  };
  const totalPrices = foodCart.reduce((acc, curr) => acc + curr.totalPrice, 0);

  const payload = foodCart.map((food) => {
    return {
      price: food.food.price,
      food: food.food._id,
      quantity: food.quantity,
    };
  });

  const orderFood = async () => {
    const respose = await axios.post("http://localhost:4100/orderFood", {
      totalPrice: totalPrices,
      foodOrderItems: payload,
    });

    return respose;
  };

  const price = foodCart.map((food) => {
    return {
      price: food.food.price,
    };
  });

  const orderFoodGet = async () => {
    const response = await axios.get(
      "http://localhost:4100/orderFood/68804657b323d966d0ee030b"
    );
    console.log(response.data);
    setOrderedFood(response);
  };

  useEffect(() => {
    const getOrderFood = async () => {
      await orderFoodGet();
    };
    getOrderFood();
  }, []);
  return (
    <FoodCartContext.Provider
      value={{
        foodCart,
        totalPrices,
        orderedFood,
        orderFood,
        addToCart,
        removeFromCart,
        incrementFoodQuantity,
        decrimentFoodQuantity,
      }}
    >
      {children}
    </FoodCartContext.Provider>
  );
}

export const useFoodCart = () => useContext(FoodCartContext);

const updateFoodCart = (
  foodCart: FoodWithQuantity[],
  newFood: FoodWithQuantity
) => {
  return foodCart.map(({ food, quantity }) => {
    if (food._id === newFood.food._id) {
      const updatedQuantity = quantity + newFood.quantity;
      return {
        food,
        quantity: updatedQuantity,
        totalPrice: updatedQuantity * Number(food.price),
      };
    }
    return {
      food,
      quantity,
      totalPrice: quantity * Number(food.price),
    };
  });
};
