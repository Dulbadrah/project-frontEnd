"use client";

import { FoodCard } from "@/components/food";
import { Category, data } from "@/type/type";
import { useEffect, useState } from "react";


export const FoodsWithCategories = () => {
 const [food, setFood] = useState<data[]>([])
   console.log("fooood", food)
   useEffect(() => {
 
     const getFood = async () => {
       const response = await fetch("http://localhost:4100/food")
       const data = await response.json()
       console.log("hool",data)
       setFood(data.food)
     };
     getFood()
   })

  return (
    <div className="flex flex-col gap-6">
      {food?.map((category, index) => (
        <div key={index} className="flex flex-col gap-[54px] rounded-xl">
          <p className="text-3xl font-semibold text-white">
            {category?.categoryName}
          </p>
          <div className="grid grid-cols-1 mb-5 gap-9 sm:grid-cols-2 lg:grid-cols-3">
            {category?.food.map((food) => {
              return (
                <div key={food?._id}>
                  <FoodCard
                    foodName={food?.foodName}
                    price={food?.price}
                    image={food?.image}
                    ingredients={food?.ingredients}
                    _id={food?._id}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
