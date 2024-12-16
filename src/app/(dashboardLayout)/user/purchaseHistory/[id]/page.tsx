"use client";
import { useParams } from "next/navigation";
// import OrderDetailsView from "./orderDetailsView";
import { Spinner } from "@/components/ui/spinner";
import { AlertCircle } from "lucide-react";
import { useGetUserPurchaseDetailsByIdQuery } from "@/redux/features/orders/ordersApi";
import { UserOrderDetails } from "./_components/userOrderDetails";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } =
    useGetUserPurchaseDetailsByIdQuery(id);
  console.log(data?.data, error);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !data) {
    return (
      <div className="flex items-center gap-2">
        <AlertCircle className="text-red-500" />
        <span>Error: Could not load order details.</span>
      </div>
    );
  }

  if (!data.data) {
    return <div>No order details available.</div>;
  }

  return <div>{<UserOrderDetails order={data?.data} />}</div>;
};

export default OrderDetailsPage;
