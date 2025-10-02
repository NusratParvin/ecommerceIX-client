import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  return (
    <>
      <div className="h-16" />
      <div className="py-5 bg-slate-600/80 text-white tracking-tight">
        <div className="flex flex-row  items-center justify-between w-11/12 mx-auto px-4">
          {/* <h1 className="text-2xl font-medium"></h1> */}
        </div>
      </div>
      <div className="w-full md:w-10/12 mx-auto p-4 text-center mt-24 text-sm text text-slate-600 min-h-screen">
        <h1 className="text-4xl font-bold mb-4 uppercase ">Thank You !</h1>
        <p className="mb-4 text-2xl">
          Payment is successfully processed and your order is on the way .
        </p>
        <Link href="/">
          <Button
            type="submit"
            className="relative w-1/4 mt-12 rounded-none border border-slate-600 bg-white hover:bg-white text-slate-600 overflow-hidden group py-5"
          >
            {/* Animated Background */}
            <span className="absolute bottom-0 left-0 w-full h-full bg-slate-600 transform origin-bottom-left skew-y-1 scale-y-0 transition-transform duration-700 ease-out group-hover:scale-y-125"></span>

            {/* Button Text */}
            <span className="relative z-10 group-hover:text-white font-semibold text-base uppercase">
              Return to Home
            </span>
          </Button>
        </Link>
      </div>
    </>
  );
}
