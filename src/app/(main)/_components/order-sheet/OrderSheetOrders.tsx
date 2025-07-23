import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderSheet, OrderSheetOrderItem } from ".";
import { useEffect, useState } from "react";

type Food = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Order = {
  _id: string;
  user: string;
  totalPrice: number;
  foodOrderItems: {
    food: Food;
    quantity: number;
    price: string;
    _id: string;
  }[];
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
type OrderResponse = {
  success: boolean;
  foodOrder: Order[];
};

export const OrderSheetOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
  const getOrders = async () => {
    try {
      const response = await fetch("http://localhost:4100/orderFood/6863508c343186b2d4313f8f");
      if (!response.ok) {
        console.error("Fetch failed: ", response.status);
        return;
      }

      const data = (await response.json()) as OrderResponse;
      console.log("Raw response:", data);

      if (Array.isArray(data.foodOrder)) {
        setOrders(data.foodOrder);
      } else {
        console.warn("foodOrder is not array:", data.foodOrder);
        setOrders([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  getOrders();
}, []);

  return (
    <Card className="h-[87%]">
      <CardHeader className="p-4 ">
        <CardTitle>Order history</CardTitle>
      </CardHeader>

      <CardContent className="p-4">
        {orders.map((order) => {
          return <OrderSheetOrderItem key={order._id} {...order} />;
        })}
      </CardContent>
    </Card>
  );
};