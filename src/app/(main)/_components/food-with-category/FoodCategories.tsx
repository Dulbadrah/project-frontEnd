"use client";

import { useEffect, useState } from "react";
import { FoodsWithCategories } from "./FoodsWithCategories";
import { Food } from "@/type/type";

export const FoodCategories = () => {
  const [categories, setCategories] = useState<Food[]>([]);

  useEffect(() => {

    const getCategories = async () => {
      try{
      const response = await fetch("http://localhost:4100/Category");
      const data = await response.json();
      setCategories(data.categories);
      } catch (error){
        console.error("frtch error",error);
      }
    };
    getCategories();
  }, []);

  if (!categories.length)
    return <p className="text-white">No categories found</p>;

  return (
    <div>
      <div className="flex flex-col my-8 gap-9">
        <div className="text-3xl font-semibold text-white">Categories</div>
        <div className="flex gap-2 flex-nowrap">
          {categories?.map((category) => (
            <div
              key={category._id}
              className="flex items-center px-5 py-1 rounded-full bg-background"
            >
              <div>{category?.categoryName}</div>
            </div>
          ))}
        </div>
      </div>
      <FoodsWithCategories />
    </div>
  );
};
