import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { SidebarDashLine } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useFoodCart } from "@/providers/FoodCart";

export const OrderSheetPayment = ({ openModal }: { openModal: () => void }) => {
  const { totalPrices, orderFood } = useFoodCart();

  const shippingCost = 5000;

  const handleFoodOrder = () => {
    setTimeout(() => {
      openModal();
    }, 3000);
  };

  return (
    <Card className="mt-6">
      <CardHeader className="p-4 ">
        <CardTitle>Payment info</CardTitle>
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex justify-between">
          <p className="text-[#71717A] font-light">Items</p>
          <p className="font-bold">{totalPrices}₮</p>
        </div>

        <div className="flex justify-between">
          <p className="text-[#71717A] font-light">Shipping</p>
          <p className="font-bold">{shippingCost}₮</p>
        </div>

        <SidebarDashLine />

        <div className="flex justify-between">
          <p className="text-[#71717A] font-light">Total</p>
          <p className="font-bold">{totalPrices + shippingCost}₮</p>
        </div>
      </CardContent>

      <CardFooter className="p-4">
        <Button
          size="lg"
          className="w-full bg-red-500 rounded-full"
          onClick={handleFoodOrder}
        >
          Checkout
        </Button>
      </CardFooter>
    </Card>
  );
};
