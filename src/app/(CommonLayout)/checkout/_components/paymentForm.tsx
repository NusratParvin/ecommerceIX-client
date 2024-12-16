import { useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  // Elements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
// import { stripePromise } from "@/lib/stripe";

interface PaymentFormProps {
  clientSecret: string;
  onSubmit: (paymentIntentId: string) => Promise<void>;
}

export default function PaymentForm({
  clientSecret,
  onSubmit,
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError("Card element not found.");
      setIsProcessing(false);
      return;
    }

    try {
      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });
      console.log(paymentIntent, clientSecret);

      if (confirmError || paymentIntent?.status !== "succeeded") {
        console.log(confirmError, paymentIntent?.status);
        throw new Error(confirmError?.message || "Payment confirmation failed");
      }

      await onSubmit(paymentIntent.id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error, "An error occurred during payment confirmation");
      setError(
        error.message || "An error occurred during payment confirmation."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    // <form onSubmit={handleSubmit} className="space-y-4">
    //   <div className="p-4 border rounded">
    //     <CardElement
    //       options={{
    //         style: {
    //           base: {
    //             fontSize: "16px",
    //             color: "#424770",
    //             "::placeholder": {
    //               color: "#aab7c4",
    //             },
    //           },
    //           invalid: {
    //             color: "#9e2146",
    //           },
    //         },
    //       }}
    //     />
    //   </div>
    //   {error && <div className="text-red-500">{error}</div>}
    //   <Button type="submit" disabled={!stripe || isProcessing}>
    //     {isProcessing ? "Processing..." : "Pay Now"}
    //   </Button>
    // </form>
    // <Elements stripe={stripePromise} options={{ clientSecret }}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6  min-h-screen">
        <div className="p-4 bg-white border rounded-lg shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Payment Details
            </h3>
            <p className="text-sm text-gray-500">
              All transactions are secure and encrypted
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    fontFamily: "system-ui, sans-serif",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                    padding: "10px 0",
                  },
                  invalid: {
                    color: "#9e2146",
                    iconColor: "#9e2146",
                  },
                },
              }}
            />
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm bg-red-50 p-3 rounded-md"
          >
            {error}
          </motion.div>
        )}

        <Button
          type="submit"
          disabled={!stripe || isProcessing}
          className="w-full bg-deep-brown hover:bg-warm-brown text-white transition-colors duration-200 pt-12"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Processing...
            </div>
          ) : (
            "Pay Now"
          )}
        </Button>
      </form>
    </motion.div>
    // </Elements>
  );
}
