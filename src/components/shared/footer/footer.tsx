import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Twitter, Facebook, Dribbble, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-deep-brown pt-8 pb-6">
      <div className="md:w-11/12 w-full mx-auto   px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          {/* Left Side */}
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl font-semibold  text-cream">
              Lets keep in touch!
            </h4>
            <h5 className="text-lg mt-0 mb-2  text-ivory">
              Find us on any of these platforms; we respond within 1-2 business
              days.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6 flex">
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

          {/* Right Side */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              {/* Useful Links */}
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-cream  text-sm font-semibold mb-2">
                  Useful Links
                </span>
                <ul className="list-unstyled">
                  <li>
                    <Link
                      href="/about"
                      className=" text-ivory hover:text-deep-navy   block pb-2 text-sm"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className=" text-ivory hover:text-deep-navy   block pb-2 text-sm"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://github.com/yourusername"
                      className=" text-ivory hover:text-deep-navy   block pb-2 text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <Link
                      href="/products"
                      className=" text-ivory hover:text-deep-navy   block pb-2 text-sm"
                    >
                      Free Products
                    </Link>
                  </li>
                </ul>
              </div>
              {/* Other Resources */}
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-cream  text-sm font-semibold mb-2">
                  Other Resources
                </span>
                <ul className="list-unstyled">
                  <li>
                    <Link
                      href="/license"
                      className=" text-ivory hover:text-deep-navy  block pb-2 text-sm"
                    >
                      MIT License
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className=" text-ivory hover:text-deep-navy   block pb-2 text-sm"
                    >
                      Terms &amp; Conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className=" text-ivory hover:text-deep-navy   block pb-2 text-sm"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className=" text-ivory hover:text-deep-navy   block pb-2 text-sm"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-cream py-1">
              &copy; {new Date().getFullYear()} Your Company. All rights
              reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
