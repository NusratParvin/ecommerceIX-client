import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  return (
    <>
      <div className="h-36 bg-deep-brown"></div>
      <div className="w-full md:w-10/12 mx-auto p-4 text-center mt-24 text-sm text text-charcoal min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Thank You for Your Order!</h1>
        <p className="mb-4">Your payment has been processed successfully.</p>
        <Link href="/" className="">
          <Button
            type="submit"
            className="relative w-1/5 mt-12 rounded-none border border-deep-brown bg-white hover:bg-white text-deep-brown overflow-hidden group py-5"
          >
            {/* Animated Background */}
            <span className="absolute bottom-0 left-0 w-full h-full bg-deep-brown transform origin-bottom-left skew-y-1 scale-y-0 transition-transform duration-700 ease-out group-hover:scale-y-125"></span>

            {/* Button Text */}
            <span className="relative z-10 group-hover:text-white font-semibold text-sm uppercase">
              Return to Home{" "}
            </span>
          </Button>
        </Link>
      </div>
    </>
  );
}

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { motion } from "framer-motion";
// import RatingInput from "./_components/rating";
// import { useAppSelector } from "@/redux/hooks";
// import { useCurrentUser } from "@/redux/features/auth/authSlice";

// interface ReviewFormData {
//   comment: string;
// }

// export default function CheckoutSuccessPage() {
//   const [rating, setRating] = useState(0);
//   const [showDialog, setShowDialog] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = useForm<ReviewFormData>();

//   const onSubmit = async (data: ReviewFormData) => {
//     try {
//     const formattedReview={
//       rating,
//       comment:data.comment,
//       userEmail:user?.email
//     }
//       console.log({ rating, comment: data.comment });
//       setShowDialog(true);
//     } catch (error) {
//       console.error("Failed to submit review:", error);
//     }
//   };

//   return (
//     <>
//       <div className="h-36 bg-deep-brown"></div>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full md:w-10/12 mx-auto p-4 text-center mt-24 text-sm text-charcoal min-h-screen"
//       >
//         <h1 className="text-2xl font-bold mb-4">Thank You for Your Order!</h1>
//         <p className="mb-8">Your payment has been processed successfully.</p>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
//         >
//           <h2 className="text-xl font-semibold mb-6">Share Your Experience</h2>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <div className="flex flex-col items-center gap-2">
//               <label className="text-base font-medium">
//                 Rate your purchase
//               </label>
//               <RatingInput value={rating} onChange={setRating} />
//             </div>

//             <div className="space-y-2">
//               <label className="text-base font-medium">
//                 Tell us about your experience
//               </label>
//               <Textarea
//                 {...register("comment")}
//                 placeholder="Write your review here..."
//                 className="min-h-[100px]"
//               />
//             </div>

//             <Button
//               type="submit"
//               disabled={isSubmitting || rating === 0}
//               className="w-full bg-deep-brown hover:bg-warm-brown transition-colors"
//             >
//               {isSubmitting ? "Submitting..." : "Submit Review"}
//             </Button>
//           </form>
//         </motion.div>

//         <Link href="/" className="inline-block">
//           <Button
//             type="button"
//             className="relative w-full md:w-48 mt-12 rounded-none border border-deep-brown bg-white hover:bg-white text-deep-brown overflow-hidden group py-5"
//           >
//             <span className="absolute bottom-0 left-0 w-full h-full bg-deep-brown transform origin-bottom-left skew-y-1 scale-y-0 transition-transform duration-700 ease-out group-hover:scale-y-125"></span>
//             <span className="relative z-10 group-hover:text-white font-semibold text-sm uppercase">
//               Return to Home
//             </span>
//           </Button>
//         </Link>
//       </motion.div>

//       <Dialog open={showDialog} onOpenChange={setShowDialog}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>Thank You for Your Review!</DialogTitle>
//           </DialogHeader>
//           <div className="text-center py-4">
//             <p className="text-muted-foreground">
//               We appreciate your feedback. It helps us improve our services.
//             </p>
//             <div className="flex flex-center gap-4 items-center">
//               <Button
//                 onClick={() => setShowDialog(false)}
//                 className="mt-4 bg-deep-brown hover:bg-warm-brown"
//               >
//                 Back To Home
//               </Button>
//               <Button
//                 onClick={() => setShowDialog(false)}
//                 className="mt-4 bg-deep-brown hover:bg-warm-brown"
//               >
//                 Close
//               </Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }
