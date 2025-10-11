/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useLazyGetShopByOwnerQuery } from "@/redux/features/shops/shopsApi";
import ShopDetails from "./_components/shopDetails";
import CreateShop from "./_components/createShop";
import ErrorComponent from "@/components/ui/error";

const MyShop = () => {
  const [isCreatingShop, setIsCreatingShop] = useState<boolean>(false);
  const [fetchShop, { data, isLoading, isError, error }] =
    useLazyGetShopByOwnerQuery(undefined);

  useEffect(() => {
    fetchShop(undefined);
  }, [fetchShop]);
  // console.log(data, "fetch");

  useEffect(() => {
    if (!isLoading && data) {
      setIsCreatingShop(!data?.data);
    }
  }, [data, isLoading]);

  const handleShopCreated = () => {
    fetchShop(undefined);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ErrorComponent
          message={
            (error as any)?.data?.message ||
            "Something went wrong. Please try again later."
          }
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen p-2 space-y-4 tracking-tight text-slate-700">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold ">Shop Profile</h1>
      </div>

      <div className="w-full mx-auto">
        {isCreatingShop ? (
          <CreateShop onShopCreated={handleShopCreated} />
        ) : (
          <ShopDetails
            shop={data?.data}
            // onEditShop={() => setIsCreatingShop(true)}
            onShopCreated={handleShopCreated}
          />
        )}
      </div>
    </div>
  );
};

export default MyShop;
