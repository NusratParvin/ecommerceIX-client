import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "@/types";
import { motion } from "framer-motion";
import { ShopProductCard } from "./shopProductCard";

interface ShopProductsProps {
  products: Product[];
  shop: { id: string; name: string };
}

export const ShopProducts = ({ products, shop }: ShopProductsProps) => {
  // console.log(shop, "shopproduct");
  return (
    <div className="w-full md:w-11/12 mx-auto px-4 py-8">
      {/* Filters and Sort */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-foreground">Products</h2>
        <div className="flex gap-4">
          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {products.map((product, index) => (
          <ShopProductCard
            key={product?.id}
            product={product}
            index={index}
            shop={shop}
          />
        ))}
      </motion.div>
    </div>
  );
};
