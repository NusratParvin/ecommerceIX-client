import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Twitter, Facebook, Dribbble, Github } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-white pt-2  ">
      <div className="md:w-11/12 w-full mx-auto text-gray-700 ">
        <hr className=" border-gray-200/70 pb-6" />
        <div className="flex flex-row text-left lg:text-left gap-6 pb-4">
          {/* Left Side */}

          <div className="bg-white w-full lg:w-1/3">
            <Image
              src="/assets/logo2.png"
              alt="logo"
              width={200}
              height={200}
              className="h-20 w-40"
            />
            <h5 className="  py-4 ps-2 tracking-tighter text-gray-500 text-lg leading-tight">
              A dynamic and innovative online retail platform that offers a wide
              range of products to customers worldwide.
            </h5>
          </div>

          {/* Center */}

          <div className="w-full lg:w-1/3 px-4  ">
            <div className="flex flex-wrap items-top mb-6">
              {/* Useful Links */}
              <div className="w-full lg:w-1/2 px-4 ml-auto">
                <span className="block uppercase   text-sm font-semibold mb-2">
                  Useful Links
                </span>
                <ul className="list-unstyled">
                  <li>
                    <Link
                      href="/about"
                      className="   hover:text-deep-navy   block pb-2 text-sm"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="   hover:text-deep-navy   block pb-2 text-sm"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://github.com/yourusername"
                      className="   hover:text-deep-navy   block pb-2 text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <Link
                      href="/products"
                      className="   hover:text-deep-navy   block pb-2 text-sm"
                    >
                      Free Products
                    </Link>
                  </li>
                </ul>
              </div>
              {/* Other Resources */}
              <div className="w-full lg:w-1/2 px-4">
                <span className="block uppercase  text-sm font-semibold mb-2">
                  Other Resources
                </span>
                <ul className="list-unstyled">
                  <li>
                    <Link
                      href="/license"
                      className="   hover:text-deep-navy  block pb-2 text-sm"
                    >
                      MIT License
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="   hover:text-deep-navy   block pb-2 text-sm"
                    >
                      Terms &amp; Conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="   hover:text-deep-navy   block pb-2 text-sm"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="   hover:text-deep-navy   block pb-2 text-sm"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full lg:w-1/3 px-4 flex flex-col justify-center items-start">
            {/* <h4 className="text-3xl font-semibold  ">Lets keep in touch!</h4> */}

            <h5 className=" mt-0 mb-2 tracking-tighter text-gray-500 text-lg leading-tight ">
              Find us on any of these platforms; we respond within 1-2 business
              days.
            </h5>
            <div className="mt-2 lg:mb-0 mb-6 flex">
              <Button
                variant="ghost"
                className="bg-white text-deep-brown shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full mr-2"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                className="bg-white text-deep-brown shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full mr-2"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                className="bg-white text-deep-brown  shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full mr-2"
                aria-label="Dribbble"
              >
                <Dribbble className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                className="bg-white text-deep-brown  shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full mr-2"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>{" "}
      <div className="flex flex-wrap items-center md:justify-between justify-center bg-deep-brown h-16">
        <div className="w-full md:w-4/12 px-4 mx-auto text-center">
          <div className="text-sm text-cream py-1">
            &copy; {new Date().getFullYear()} The NINE Store. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
