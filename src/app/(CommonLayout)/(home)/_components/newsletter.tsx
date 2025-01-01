// "use client";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import { useAddSubscriberMutation } from "@/redux/features/subscribers/subscribersApi";

// const NewsletterSection = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [addSubscriber, { isLoading }] = useAddSubscriberMutation();

//   // Handle form submission
//   const handleSubscribe = async () => {
//     if (!email) {
//       setMessage("Please enter a valid email.");
//       return;
//     }

//     try {
//       await addSubscriber({ email }).unwrap();
//       setMessage("Successfully subscribed to the newsletter!");
//       setEmail("");
//     } catch (error) {
//       setMessage("Failed to subscribe. Please try again later.");
//       console.error("Subscription error:", error);
//     }
//   };

//   return (
//     <div className="my-10 pb-8 mx-auto bg-warm-gray/50 w-full flex flex-col justify-center items-center rounded-none px-4 sm:px-10 border">
//       {/* Content Section */}
//       <div className="md:w-1/2 w-full mx-auto border text-center">
//         <h1 className="mt-8 text-3xl font-bold text-deep-brown md:text-5xl md:leading-snug">
//           Join Our Newsletter
//         </h1>
//         <p className="mt-4 text-xl text-warm-brown tracking-wider">
//           GET 15% OFF YOUR FIRST ORDER
//         </p>
//       </div>

//       {/* Form Section */}
//       <div className="md:w-1/2 w-full mx-auto">
//         <div className="mt-8 flex flex-row rounded-md border bg-transparent sm:flex-row">
//           <Input
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="m-2 h-10 rounded-none border-none border-b-2 border-deep-brown px-4 text-gray-500 sm:w-full bg-white"
//             placeholder="Enter your email"
//             type="email"
//             name="email"
//           />
//           <Button
//             onClick={handleSubscribe}
//             disabled={isLoading}
//             className="m-2 shrink-0 rounded-none h-10 bg-warm-brown px-8 py-3 text-white hover:bg-deep-brown"
//           >
//             {isLoading ? "Subscribing..." : "Get Now"}
//           </Button>
//         </div>
//         {message && (
//           <p className="mt-4 text-sm text-center text-gray-700">{message}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NewsletterSection;

"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAddSubscriberMutation } from "@/redux/features/subscribers/subscribersApi";
import { toast } from "sonner";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [addSubscriber, { isLoading }] = useAddSubscriberMutation();

  // Handle form submission
  const handleSubscribe = async () => {
    if (!email) {
      toast.error("Please enter a valid email.");
      return;
    }

    try {
      await addSubscriber({ email }).unwrap();
      toast.success("Successfully subscribed to the newsletter!");
      setEmail("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message, { className: "text-red-600" });
      console.error("Subscription error:", error);
    }
  };

  return (
    <div className="my-10 pb-8 mx-auto bg-warm-gray/50 w-full flex flex-col justify-center items-center rounded-none px-4 sm:px-10 border">
      {/* Content Section */}
      <div className="md:w-1/2 w-full mx-auto text-center">
        <h1 className="mt-8 text-3xl font-bold text-deep-brown md:text-5xl md:leading-snug">
          Join Our Newsletter
        </h1>
        <p className="mt-4 text-xl text-warm-brown tracking-wider">
          GET 15% OFF YOUR FIRST ORDER
        </p>
      </div>

      {/* Form Section */}
      <div className="md:w-1/2 w-full mx-auto mt-8">
        <div className="flex flex-row items-center rounded-md border bg-transparent">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 w-full max-w-sm rounded-none border-none border-b-2 border-deep-brown px-4 text-gray-500 bg-white"
            placeholder="Enter your email"
            type="email"
            name="email"
          />
          <Button
            onClick={handleSubscribe}
            disabled={isLoading}
            className="h-10 w-40 rounded-none bg-warm-brown px-8 py-3 text-white hover:bg-deep-brown flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <span>Subscribing...</span>
                <svg
                  className="ml-2 w-4 h-4 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              </>
            ) : (
              "Get Now"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;
