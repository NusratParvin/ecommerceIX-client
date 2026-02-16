import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Twitter, Facebook, Dribbble, Github } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    // <footer className="relative bg-white pt-2  ">
    //   <div className="md:w-11/12 w-full mx-auto text-gray-700 ">
    //     <hr className=" border-gray-200/70 pb-6" />
    //     <div className="flex md:flex-row flex-col text-left lg:text-left gap-6 pb-4">
    //       {/* Left Side */}

    //       <div className="bg-white w-full lg:w-1/3">
    //         <Image
    //           src="/assets/logo2.png"
    //           alt="logo"
    //           width={200}
    //           height={200}
    //           className="md:h-20 md:w-40 h-16 w-32"
    //         />
    //         <h5 className="  py-4 ps-2 md:tracking-tighter text-gray-500 md:text-lg text-sm leading-tight tracking-tight">
    //           A dynamic and innovative online retail platform that offers a wide
    //           range of products to customers worldwide.
    //         </h5>
    //       </div>

    //       {/* Center */}

    //       <div className="w-full lg:w-1/3 px-4  ">
    //         <div className="flex flex-wrap items-top mb-6">
    //           {/* Useful Links */}
    //           <div className="w-full lg:w-1/2 px-4 ml-auto">
    //             <span className="block uppercase   text-sm font-semibold mb-2">
    //               Useful Links
    //             </span>
    //             <ul className="list-unstyled">
    //               <li>
    //                 <Link
    //                   href="/about"
    //                   className="   hover:text-deep-navy   block pb-2 text-sm"
    //                 >
    //                   About Us
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link
    //                   href="/blog"
    //                   className="   hover:text-deep-navy   block pb-2 text-sm"
    //                 >
    //                   Blog
    //                 </Link>
    //               </li>
    //               <li>
    //                 <a
    //                   href="https://github.com/yourusername"
    //                   className="   hover:text-deep-navy   block pb-2 text-sm"
    //                   target="_blank"
    //                   rel="noopener noreferrer"
    //                 >
    //                   GitHub
    //                 </a>
    //               </li>
    //               <li>
    //                 <Link
    //                   href="/products"
    //                   className="   hover:text-deep-navy   block pb-2 text-sm"
    //                 >
    //                   Free Products
    //                 </Link>
    //               </li>
    //             </ul>
    //           </div>
    //           {/* Other Resources */}
    //           <div className="w-full lg:w-1/2 px-4">
    //             <span className="block uppercase  text-sm font-semibold mb-2">
    //               Other Resources
    //             </span>
    //             <ul className="list-unstyled">
    //               <li>
    //                 <Link
    //                   href="/license"
    //                   className="   hover:text-deep-navy  block pb-2 text-sm"
    //                 >
    //                   MIT License
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link
    //                   href="/terms"
    //                   className="   hover:text-deep-navy   block pb-2 text-sm"
    //                 >
    //                   Terms &amp; Conditions
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link
    //                   href="/privacy"
    //                   className="   hover:text-deep-navy   block pb-2 text-sm"
    //                 >
    //                   Privacy Policy
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link
    //                   href="/contact"
    //                   className="   hover:text-deep-navy   block pb-2 text-sm"
    //                 >
    //                   Contact Us
    //                 </Link>
    //               </li>
    //             </ul>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Right Side */}
    //       <div className="w-full lg:w-1/3 pe-2 flex flex-col justify-center items-start tracking-tight">
    //         <h4 className="text-xl font-semibold  ">Lets keep in touch!</h4>

    //         <h5 className=" mt-0 mb-2 tracking-tighter text-gray-500 text-lg leading-tight ">
    //           Find us on any of these platforms; we respond within 1-2 business
    //           days.
    //         </h5>
    //         <div className="mt-2 lg:mb-0 mb-6 flex">
    //           <Button
    //             variant="ghost"
    //             className="bg-white text-deep-brown shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full mr-2"
    //             aria-label="Twitter"
    //           >
    //             <Twitter className="h-5 w-5" />
    //           </Button>
    //           <Button
    //             variant="ghost"
    //             className="bg-white text-deep-brown shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full mr-2"
    //             aria-label="Facebook"
    //           >
    //             <Facebook className="h-5 w-5" />
    //           </Button>
    //           <Button
    //             variant="ghost"
    //             className="bg-white text-deep-brown  shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full mr-2"
    //             aria-label="Dribbble"
    //           >
    //             <Dribbble className="h-5 w-5" />
    //           </Button>
    //           <Button
    //             variant="ghost"
    //             className="bg-white text-deep-brown  shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full mr-2"
    //             aria-label="GitHub"
    //           >
    //             <Github className="h-5 w-5" />
    //           </Button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>{" "}
    //   <div className="flex flex-wrap items-center md:justify-between justify-center bg-deep-brown h-16">
    //     <div className="w-full md:w-4/12 px-4 mx-auto text-center">
    //       <div className="text-sm text-cream py-1">
    //         &copy; {new Date().getFullYear()} The NINE Store. All rights
    //         reserved.
    //       </div>
    //     </div>
    //   </div>
    // </footer>
    <>
      <footer className="relative bg-white pt-2">
        <div className="md:w-11/12 w-full mx-auto  text-gray-700">
          <hr className="border-gray-200/70 pb-6" />

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 pb-4">
            {/* Left Side - Logo & Description */}
            <div className="w-full text-center md:text-left">
              <div className="flex justify-center md:justify-start">
                <Image
                  src="/assets/logo2.png"
                  alt="logo"
                  width={200}
                  height={200}
                  className="h-16 w-32 md:h-20 md:w-40 object-contain"
                />
              </div>
              <h5 className="py-4 text-gray-500 text-sm md:text-base  leading-tight tracking-tight px-2 ">
                A dynamic and innovative online retail platform that offers a
                wide range of products to customers worldwide.
              </h5>
            </div>

            {/* Center - Links Section */}
            <div className="w-full">
              <div className="grid grid-cols-2 gap-4">
                {/* Useful Links */}
                <div className="text-center md:text-left">
                  <span className="block uppercase text-sm font-semibold mb-3">
                    Useful Links
                  </span>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/"
                        className="hover:text-deep-navy text-sm inline-block transition-colors duration-200 hover:underline"
                      >
                        Home
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/about"
                        className="hover:text-deep-navy text-sm inline-block transition-colors duration-200 hover:underline"
                      >
                        About Us
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/contact"
                        className="hover:text-deep-navy text-sm inline-block transition-colors duration-200 hover:underline"
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Other Resources */}
                <div className="text-center md:text-left">
                  <span className="block uppercase text-sm font-semibold mb-3">
                    Shopping Links
                  </span>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/allShops"
                        className="hover:text-deep-navy text-sm inline-block transition-colors duration-200 hover:underline"
                      >
                        By Shops
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/allProducts"
                        className="hover:text-deep-navy text-sm inline-block transition-colors duration-200 hover:underline"
                      >
                        All Collections
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/flashSale"
                        className="hover:text-deep-navy text-sm inline-block transition-colors duration-200 hover:underline"
                      >
                        By Sale
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Side - Social & Contact */}
            <div className="w-full text-center lg:text-left">
              <h4 className="text-lg md:text-xl font-semibold mb-2">
                Let&apos;s keep in touch!
              </h4>
              <h5 className="text-gray-500  text-sm md:text-base  leading-tight tracking-tight mb-4 max-w-md mx-auto lg:mx-0">
                Find us on any of these platforms! We respond within 1-2
                business days.
              </h5>

              {/* Social Icons - Responsive Grid */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-3">
                <Button
                  variant="ghost"
                  className="bg-white text-deep-brown shadow-lg hover:shadow-xl h-10 w-10 md:h-12 md:w-12 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
                <Button
                  variant="ghost"
                  className="bg-white text-deep-brown shadow-lg hover:shadow-xl h-10 w-10 md:h-12 md:w-12 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
                <Button
                  variant="ghost"
                  className="bg-white text-deep-brown shadow-lg hover:shadow-xl h-10 w-10 md:h-12 md:w-12 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
                  aria-label="Dribbble"
                >
                  <Dribbble className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
                <Button
                  variant="ghost"
                  className="bg-white text-deep-brown shadow-lg hover:shadow-xl h-10 w-10 md:h-12 md:w-12 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="bg-deep-brown h-auto py-3 mt-6">
          <div className="container mx-auto px-4 text-center">
            <div className="text-sm text-cream">
              &copy; {new Date().getFullYear()} The NINE Store. All rights
              reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
