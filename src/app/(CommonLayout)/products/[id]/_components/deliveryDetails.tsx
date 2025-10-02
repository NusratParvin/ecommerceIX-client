import { Truck, RotateCw, ShieldCheck } from "lucide-react";
import Image from "next/image";

const DeliveryDetails = () => {
  return (
    <>
      <div className="space-y-1  my-3">
        <h4 className="text-base font-semibold text-slate-600">
          Delivery Details
        </h4>

        <div className="flex items-start gap-3 text-sm">
          <Truck className="mt-0.5 h-4 w-4 shrink-0" />
          <p className="text-muted-foreground">
            Your order is likely to reach you within{" "}
            <span className="font-medium text-foreground">7 days</span>.
          </p>
        </div>

        <div className="flex items-start gap-3 text-sm">
          <RotateCw className="mt-0.5 h-4 w-4 shrink-0" />
          <p className="text-muted-foreground">
            Hassle free returns within{" "}
            <span className="font-medium text-foreground">7 Days</span>.
          </p>
        </div>
      </div>
      {/* <Separator /> */}
      <div className="border border-dashed border-slate-200" />
      {/* Safe Checkout */}
      <div className="space-y-2 my-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 mb-1 text-yellow-500" />
          <h4 className="text-base font-semibold text-slate-600">
            Guaranteed Safe Checkout
          </h4>
        </div>

        <div className="relative w-full h-8">
          <Image
            src="/assets/payments.png"
            alt="payment options"
            fill
            className="object-cover"
          />
        </div>
      </div>{" "}
    </>
  );
};

export default DeliveryDetails;
