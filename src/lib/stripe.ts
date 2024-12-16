// import { loadStripe } from "@stripe/stripe-js";

// export const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_PK as string
// );
import { loadStripe } from "@stripe/stripe-js";

if (!process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_PK) {
  throw new Error("Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY");
}

export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_PK
);
