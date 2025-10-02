import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";

export function DeliveryReturns() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="hover:no-underline flex items-center gap-2 text-lg text-slate-500 cursor-pointer">
          <Truck className="w-5 h-5 mb-1" />
          Delivery & Returns
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent className=" max-w-3xl max-h-[80%] overflow-y-scroll p-6 sm:p-8 tracking-tight ">
        {/* Close button */}
        <div className="flex flex-row justify-end items-start">
          <AlertDialogCancel
            className="bg-transparent p-0 text-5xl font-light leading-none text-red-600 shadow-none border-none  hover:bg-transparent"
            aria-label="Close"
          >
            ×
          </AlertDialogCancel>
        </div>

        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold -mt-4">
            Delivery & Return
          </AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogDescription asChild>
          <div className="space-y-2 leading-[0.8rem] text-slate-600 mb-8">
            <p className="text-base leading-tight">
              Shipping and Returns are integral parts of your shopping
              experience, and we aim to make them as smooth as possible. We
              prioritize efficient shipping, striving to deliver your orders
              promptly within the estimated delivery window, typically ranging
              from 5 to 7 days. We understand that sometimes your purchase may
              not meet your expectations, so we offer a straightforward return
              policy. If you find yourself unsatisfied with your order, eligible
              items can be returned within 30 days of purchase, ensuring you
              have ample time to make a decision. Our commitment is to ensure
              your satisfaction and convenience throughout your shopping journey
              with us, and we are here to assist you every step of the way.
            </p>

            <section className="space-y-1">
              <h3 className="text-lg font-semibold text-foreground">
                Our Shipping Commitment:
              </h3>
              <ul className="list-disc pl-8 text-base">
                <li>
                  Timely and reliable delivery within 5–7 days. Real-time
                  tracking for your orders.
                </li>
                <li>
                  Exceptional packaging to ensure your items arrive in perfect
                  condition.
                </li>
              </ul>
            </section>

            <section className="space-y-1">
              <h3 className="text-xl font-semibold text-foreground">
                Our Hassle-Free Returns:
              </h3>
              <ul className="list-disc  text-base pl-8">
                <li>
                  Eligible items can be returned within 30 days. Easy return
                  initiation through our website.
                </li>
                <li>
                  Prompt processing of returns for a hassle-free experience.
                </li>
              </ul>
              <p className=" text-base py-4 leading-tight">
                We understand that your shopping needs may vary, and we are here
                to accommodate them while providing exceptional service.
              </p>
            </section>
          </div>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
}
