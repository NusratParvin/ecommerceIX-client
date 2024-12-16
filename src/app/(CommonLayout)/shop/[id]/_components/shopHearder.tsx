import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Star, Users } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TShop } from "@/types";

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mb-8 "
    >
      {/* Shop Banner */}
      <div className="h-48 w-full   bg-deep-brown relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Shop Info */}
      <div className="container px-4 relative -mt-10">
        <div className="bg-background rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Shop Logo */}
            <div className="relative w-32 h-32 rounded-lg overflow-hidden border-4 border-background shadow-xl">
              <Image
                src={shop?.logo as string}
                alt={shop?.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Shop Details */}
            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-warm-brown">
                    {shop.name}
                  </h1>
                  <p className="text-muted-foreground mt-1 text-lg">
                    {shop?.description}
                  </p>
                </div>
                <Button
                  variant={isFollowing ? "default" : "outline"}
                  className={`gap-2 ${
                    isFollowing
                      ? "bg-warm-brown text-cream hover:bg-dark-brown"
                      : "border-dark-brown text-dark-brown hover:bg-warm-brown hover:text-cream"
                  }`}
                  onClick={onFollowToggle}
                  disabled={isLoading}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFollowing
                        ? "fill-current text-cream"
                        : "text-warm-brown"
                    }`}
                  />
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>{followerCount}</strong> Followers
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">
                    <strong>4.8</strong> Rating
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Since {new Date(shop?.createdAt).getFullYear()}
                  </span>
                </div>
              </div>

              {/* Tags/Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Verified Seller</Badge>
                <Badge variant="outline" className="bg-green-200">
                  {shop?.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
