import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, Star, Users } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TShop } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

interface ShopHeaderProps {
  shop: TShop;
  isFollowing: boolean;
  onFollowToggle: () => void;
  followerCount: number;

  isLoading: boolean;
}

export const ShopHeader = ({
  shop,
  isFollowing,
  followerCount,
  onFollowToggle,
  isLoading,
}: ShopHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className=" mb-10"
    >
      <Card className="rounded-none shadow-xl overflow-hidden tracking-tight">
        <CardContent className="pb-2 px-16 pt-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Logo */}
            <div className="relative w-80 h-52 rounded-sm overflow-hidden border-2 border-white shadow-lg bg-white flex-shrink-0">
              <Image
                src={shop?.logo as string}
                alt={shop?.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Info Section */}
            <div className="flex-1 space-y-6 pt-4">
              {/* Header with Title and Follow Button */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-700">
                    {shop.name}
                  </h1>
                  <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
                    {shop?.description || "No description provided."}
                  </p>
                </div>

                <Button
                  variant={isFollowing ? "default" : "outline"}
                  size="lg"
                  className={`w-fit md:w-auto self-start md:self-auto gap-4 transition-all duration-300 tracking-[0.15rem] uppercase font-semibold ${
                    isFollowing
                      ? "bg-primary text-red-600 hover:bg-primary/90"
                      : "border-primary text-slate-700 hover:bg-primary hover:text-primary-foreground"
                  }`}
                  onClick={onFollowToggle}
                  disabled={isLoading}
                >
                  <Heart
                    className={`w-4 h-4 mb-1 ${
                      isFollowing ? "fill-current" : ""
                    }`}
                  />
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              </div>

              {/* Stats Section */}
              <div className="flex flex-wrap gap-12 text-base text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary mb-1" />
                  <span className="font-medium">
                    <strong>{followerCount}</strong> Followers
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mb-1" />
                  <span className="font-medium">
                    <strong>4.8</strong> Rating
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary mb-1" />
                  <span className="font-medium">
                    Since {new Date(shop?.createdAt).getFullYear()}
                  </span>
                </div>
              </div>

              {/* Badges Section */}
              <div className="flex flex-wrap gap-2 ">
                <Badge
                  variant="secondary"
                  className="bg-green-50 text-green-700 border-green-200 text-sm font-medium"
                >
                  Verified Seller
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200 text-sm font-medium"
                >
                  {shop?.status}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-amber-50 text-amber-700 border-amber-200 text-sm font-medium"
                >
                  Premium Vendor
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
