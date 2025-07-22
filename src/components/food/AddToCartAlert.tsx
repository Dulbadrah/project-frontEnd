"use client";

import { Check } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { FoodType } from "@/type/type";
import { useFoodCart } from "@/providers/FoodCart";

type AddToCartAlertProps = {
  isVisible?: boolean;
  onHide?: () => void;
  food: FoodType;
  quantity?: number;
};

export const AddToCartAlert = ({
  isVisible = false,
  onHide,
  food,
  quantity = 1,
}: AddToCartAlertProps) => {
  const [show, setShow] = useState(false);
  const { addToCart } = useFoodCart();

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onHide?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  const handleClick = () => {
    addToCart({
      food,
      quantity,
      totalPrice: quantity * food.price,
    });
    setShow(false);
    onHide?.();
  };

  if (!show) return null;

  return (
    <Alert
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-fit bg-black text-white shadow-lg cursor-pointer animate-in fade-in slide-in-from-top duration-300 border border-white"
      )}
    >
      <AlertDescription className="flex items-center gap-2 text-base">
        <Check size={16} />
        <span>
          {quantity}× {food.foodName} added — click to confirm and close
        </span>
      </AlertDescription>
    </Alert>
  );
};
