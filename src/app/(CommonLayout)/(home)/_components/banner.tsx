// "use client";
// import { motion } from "framer-motion";

// import Image from "next/image";
// import bannerImage from "@/assets/b.jpg";
// import Link from "next/link";
// import { Splide, SplideSlide } from "@splidejs/react-splide";

// const Banner = () => {
//   return (
//     <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden ">
//       <div className="absolute inset-0 w-full h-full ">
//         <Image
//           src={bannerImage}
//           alt="Banner Image"
//           layout="fill"
//           objectFit="cover"
//         />
//       </div>

//       {/* Gradient Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-deep-brown/10 " />

//       {/* Content */}
//       <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
//         <div className="max-w-2xl">
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-3xl md:text-4xl lg:text-5xl tracking-tighter text-cream mb-6"
//           >
//             Discover Unique Products from Global Sellers
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="text-lg md:text-xl text-cream  mb-8"
//           >
//             Shop millions of products from independent sellers around the world
//           </motion.p>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//           >
//             <Link href="/allProducts">
//               <button className="bg-cream text-deep-brown px-8 py-3 rounded-full font-semibold hover:bg-deep-brown hover:text-cream transition-colors duration-200">
//                 Start Shopping
//               </button>{" "}
//             </Link>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Banner;

"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Banner = () => {
  const slides = [
    {
      id: 1,
      image: "/assets/1.png",
      title: "Massive Winter Sale!",
      description: "Up to 50% off on all products. Limited time only!",
    },
    {
      id: 2,
      image: "/assets/3.png",
      title: "Exclusive Deals!",
      description: "Discover unique items at unbeatable prices.",
    },
  ];

  return (
    <div className="   w-full   md:h-[90vh] overflow-hidden">
      <Splide
        options={{
          type: "loop",
          perPage: 1,
          autoplay: true,
          interval: 4000,
          arrows: false,
          pagination: true,
        }}
        aria-label="Banner Slider"
        className="w-full h-full"
      >
        <Splide aria-label="My Favorite Images">
          {slides.map((slide) => (
            <SplideSlide key={slide.id}>
              <div className="relative w-full h-full">
                {/* <Image
                  src={slide.image}
                  alt={`Slide ${slide.id}`}
                  layout="fill"
                  objectFit="cover"
                /> */}
                <img
                  src={slide.image}
                  alt="Image 1"
                  className=" object-cover object-center"
                />
              </div>
              {/* <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-gradient-to-r from-black/50 to-black/10 text-white">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg md:text-xl mb-6"
                >
                  {slide.description}
                </motion.p>
              </div> */}
            </SplideSlide>
          ))}
        </Splide>
      </Splide>
    </div>
  );
};

export default Banner;
