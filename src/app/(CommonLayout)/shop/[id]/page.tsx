"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetShopDetailsQuery,
  useFollowShopMutation,
  useUnfollowShopMutation,
} from "@/redux/features/shops/shopsApi";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { ShopHeader } from "./_components/shopHearder";
import { ShopProducts } from "./_components/shopProducts";
import { useGetUserByEmailQuery } from "@/redux/features/users/usersApi";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/redux/features/auth/authSlice";

const ShopPage = () => {
  const { id } = useParams();
  const user = useAppSelector(useCurrentUser);

  const [isShopFollowed, setIsShopFollowed] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  const { data, isLoading, error, isSuccess } = useGetShopDetailsQuery(id);
  const shopData = data?.data;

  const { data: userData } = useGetUserByEmailQuery(user?.email, {
    skip: !user,
  });
  const userDetails = userData?.data;

  const [followShop, { isLoading: isFollowing }] = useFollowShopMutation();
  const [unfollowShop, { isLoading: isUnfollowing }] =
    useUnfollowShopMutation();

  // useEffect(() => {
  //   if (isSuccess && shopData && userDetails) {
  //      const isFollowed = shopData.followers.some(
  //       (follower: { userId: string }) => follower.userId === userDetails.id
  //     );
  //     setIsShopFollowed(isFollowed);
  //   }
  // }, [shopData, userDetails, isSuccess]);

  useEffect(() => {
    if (isSuccess && shopData) {
      setFollowerCount(shopData?.followers?.length || 0);
      setIsShopFollowed(
        !!shopData?.followers?.some(
          (follower: { userId: string }) => follower?.userId === userDetails?.id
        )
      );
    }
  }, [shopData, isSuccess, userDetails]);

  const isLoadingAction = isFollowing || isUnfollowing;

  const handleFollowToggle = async () => {
    if (!user?.email) {
      toast.error("Please login to follow shops");
      return;
    }

    try {
      if (isShopFollowed) {
        const res = await unfollowShop({
          shopId: id!,
          email: user?.email,
        }).unwrap();
        console.log(res);
        if (res.success) {
          setFollowerCount((prev) => prev - 1);
          setIsShopFollowed(false);

          toast.success("Shop unfollowed successfully");
        }
      } else {
        const res = await followShop({
          shopId: id!,
          email: user?.email,
        }).unwrap();
        console.log(res);
        if (res.success) {
          setFollowerCount((prev) => prev + 1);
          setIsShopFollowed(true);
          toast.success("Shop followed successfully");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update follow status");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-48 w-full" />
        <div className="container px-4">
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-red-600">Failed to load shop</h2>
        <p className="text-muted-foreground mt-2">Please try again later</p>
      </div>
    );
  }
  // console.log(shopData);
  const shopInfo = { id: shopData?.id, name: shopData?.name };
  return (
    <main className="min-h-screen bg-background">
      <ShopHeader
        shop={shopData}
        isFollowing={isShopFollowed}
        onFollowToggle={handleFollowToggle}
        isLoading={isLoadingAction}
        followerCount={followerCount}
      />
      <ShopProducts products={shopData?.products || []} shop={shopInfo} />
    </main>
  );
};

export default ShopPage;
