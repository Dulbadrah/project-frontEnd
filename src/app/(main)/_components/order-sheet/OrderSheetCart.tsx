import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderSheetEmptyCard } from "./OrderSheetEmptyCard";
import { OrderSheetFoodItem } from "./OrderSheetFoodItem";
import { useFoodCart } from "@/providers/FoodCart";

export const OrderSheetCart = () => {
  const { foodCart } = useFoodCart();

  const renderFoodCard = () => {
    if (!foodCart?.length) {
      return <OrderSheetEmptyCard />;
    }

    return foodCart?.map((item) => {
      return <OrderSheetFoodItem key={item.food._id} {...item} />;
    });
  };

  return (
    <Card className="h-[400px] overflow-hidden pb-4">
      <CardHeader className="p-4">
        <CardTitle>My cart</CardTitle>
      </CardHeader>

      <CardContent className="h-full p-4 pb-10 overflow-scroll">
        {renderFoodCard()}
      </CardContent>
    </Card>
  );
};
