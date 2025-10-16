"use client";
import { useGetOrderDetailsQuery } from "@/redux/features/orders/ordersApi";
import { useParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { AlertCircle } from "lucide-react";
import OrderDetailsView from "./_components/orderDetailsView";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetOrderDetailsQuery(id);
  // console.log(data?.data);

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

  return (
    <div>
      <OrderDetailsView order={data?.data} />
    </div>
  );
};

export default OrderDetailsPage;
