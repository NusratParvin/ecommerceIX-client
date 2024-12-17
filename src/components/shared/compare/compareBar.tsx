"use client";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { removeFromCompare } from "@/redux/features/compare/compareSlice";

const CompareBar = () => {
  const { products } = useSelector((state: RootState) => state.compare);
  const router = useRouter();
  const dispatch = useDispatch();

  if (products.length === 0) return null;

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      className="fixed top-1/3 left-0 transform -translate-y-1/2 bg-gradient-to-r from-deep-brown to-charcoal/50 shadow-xl rounded-r-xl flex flex-col items-center gap-3 px-2 py-4 z-50 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 mb-2">
        <Scale className="w-5 h-5 text-cream" />
        <span className="text-cream text-sm font-medium">Compare Items</span>
      </div>

      <AnimatePresence mode="popLayout">
        <div className="flex flex-col items-center gap-2 min-w-[100px]">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              className="w-full relative group"
            >
              <div className="w-full text-xs px-3 py-2 bg-cream/90 hover:bg-white rounded-lg text-charcoal shadow-sm transition-all duration-200 truncate pr-8">
                {product.name}
              </div>
              <button
                onClick={() => dispatch(removeFromCompare(product.id))}
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <X className="w-4 h-4 text-charcoal hover:text-red-500" />
              </button>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          size="sm"
          onClick={() => router.push("/compare")}
          disabled={products.length < 2}
          className="bg-cream text-deep-brown hover:bg-white transition-all duration-300 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          Compare Now ({products.length})
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default CompareBar;
