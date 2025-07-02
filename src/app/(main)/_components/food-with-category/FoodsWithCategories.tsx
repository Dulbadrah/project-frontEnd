"use client";

import { FoodCard } from "@/components/food";
import { FoodCategory } from "@/type/type";
import { useEffect, useState } from "react";

export const FoodsWithCategories = () => {
  const [foodWithCategories, setFoodWithCategories] = useState<FoodCategory[]>(
    []
  );

  useEffect(() => {
    const fetchFoodWithCategories = async () => {
      try {
        const response = await fetch("http://localhost:4100/food");
        const data = await response.json();
        setFoodWithCategories(data.food);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchFoodWithCategories();
  }, []);

  if (!foodWithCategories?.length) return null;

  return (
    <div className="flex flex-col gap-6">
      {foodWithCategories?.map((category) => (
        <div key={category._id} className="flex flex-col gap-[54px] rounded-xl">
          <p className="text-3xl font-semibold text-white">
            {category?.categoryName}
          </p>
          <div className="grid grid-cols-1 mb-5 gap-9 sm:grid-cols-2 lg:grid-cols-3">
            {category?.foods?.map((food) => (
              <div key={food._id}>
                <FoodCard
                  foodName={food.foodName}
                  price={food.price}
                  image={food.image}
                  ingredients={food.ingredients}
                  _id={food._id}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
