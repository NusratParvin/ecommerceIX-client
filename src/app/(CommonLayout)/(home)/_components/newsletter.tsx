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
    <div
      className="my-10 pb-0 mx-auto  flex flex-col justify-center items-center rounded-none     bg-cover bg-center bg-no-repeat h-64 w-11/12"
      style={{ backgroundImage: "url('/assets/slider3.png')" }}
    >
      {/* Overlay for dimming if needed */}
      <div className="w-full h-full bg-gray-600/60 justify-center items-center">
        {/* Content Section */}
        <div className="md:w-1/2 w-full mx-auto text-center text-white">
          <h1 className="mt-8 text-2xl font-bold   md:text-4xl md:leading-snug">
            Join Our Newsletter
          </h1>
          <p className="mt-4 text-base md:text-xl   tracking-wider">
            GET 15% OFF YOUR FIRST ORDER
          </p>
        </div>
        {/* Form Section */}
        <div className="md:w-1/2 w-5/6 mx-auto mt-8 text-lg">
          <div className="flex flex-row items-center rounded-md bg-transparent ">
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
              className="h-10 w-20 md:w-40 rounded-none bg-deep-brown px-8 py-3 text-white hover:bg-deep-brown/80 flex items-center justify-center text-sm md:text-lg"
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
                "Subscribe"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;
