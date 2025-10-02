"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

interface OrderSummaryProps {
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
}

const BillingSummary: React.FC<OrderSummaryProps> = ({
  totalAmount,
  discountAmount,
  finalAmount,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50, y: 50 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className="border border-dashed border-slate-300
       bg-slate-50 tracking-tight  rounded-none shadow-none p-2 pb-8"
      >
        <CardHeader>
          <CardTitle className="text-2xl text-slate-700 font-medium pb-3 border-b border-dashed ">
            Billing Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Price Breakdown */}
            <div className="space-y-4 text-slate-700">
              <div className="flex justify-between text-xl">
                <span className=" font-semibold text-slate-500">Subtotal</span>
                <span className="font-sans">$ {totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl">
                <span className=" font-semibold text-slate-500 ">Discount</span>
                <span className="font-sans">
                  - $ {discountAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-xl">
                <span className=" font-semibold text-slate-500 ">Shipping</span>
                <span className="font-sans">$ 5.00</span>
              </div>
              <div className="flex justify-between text-xl">
                <span className=" font-semibold  text-slate-500">Tax</span>
                <span className="font-sans">$ 2.00</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-xl">
                <span>Total</span>
                <span className="font-sans">$ {finalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BillingSummary;
