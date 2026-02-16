import Image from "next/image";
import Link from "next/link";
// import about from "/assets/2400-clothes-and-fashion-accessories-on-wooden-floor.jpg";
import TeamCard from "./teamCard";
import { House, Quote } from "lucide-react";

const page = () => {
  return (
    <div>
      {/* Spacer for fixed header */}
      <div className="h-16"></div>

      <div>
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center  py-3 md:py-10 bg-slate-800/80 text-white px-4">
          <h1 className="text-3xl md:text-4xl font-medium text-center">
            ABOUT
          </h1>

          <nav className="mt-3 md:mt-4 text-base md:text-lg">
            <ol className="flex items-center space-x-2">
              <li>
                <Link
                  href="/"
                  className="hover:underline flex flex-row justify-center items-start gap-1  "
                >
                  <House size={16} className="mt-1.5" />
                  Home
                </Link>
              </li>
              <li>
                <span>/</span>
              </li>
              <li>
                <span className="font-medium">About</span>
              </li>
            </ol>
          </nav>
        </div>

        {/* Main Content - Updated for mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2 w-full p-4 md:p-8 mx-auto">
          {/* Image Section */}
          <div className="w-full mx-auto pb-2 md:pb-4">
            <Image
              src="/assets/About-1.jpg"
              alt="Clothing rack with fall themed clothing"
              width={1200}
              height={300}
              className="object-cover h-[300px] md:h-[400px] lg:h-[500px] w-full rounded-lg md:rounded-none"
            />
          </div>

          {/* Text Section */}
          <div className="mx-auto max-w-3xl px-2 md:px-6 py-1">
            {/* Heading */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-800 text-center md:text-left">
              Our Story
            </h2>

            {/* Body copy */}
            <p className="mt-4 md:mt-6 text-charcoal text-base md:text-lg leading-tight tracking-tighter font-sans">
              Welcome to our journey! At NINE, we believe in creating moments
              that inspire and transform everyday experiences. Whether you are
              here for elegant designs, sustainable choices, or simply to make
              your surroundings more beautiful, we want to help you make that
              vision a reality.
            </p>

            <p className="mt-4 md:mt-6 text-charcoal text-base md:text-lg leading-tight tracking-tighter font-sans">
              Our passion is in the details — providing products that tell story
              of quality, care, and creativity, designed to evoke a sense of
              warmth and connection. Together, let us create spaces that reflect
              who you are, bring comfort, and spark joy.
            </p>

            {/* Testimonial / quote */}
            <div className="mt-8 md:mt-12 flex items-start gap-2 md:gap-3">
              {/* Red quote marks */}
              <Quote className="w-6 h-6 md:w-8 md:h-8 lg:w-9 lg:h-9 text-red-500 transform -scale-x-100 flex-shrink-0" />

              {/* Quote text + author */}
              <div className="flex-1">
                <p className="pt-1 md:pt-2 text-sm md:text-base lg:text-2xl font-medium leading-tight tracking-tighter font-sans text-gray-600">
                  Create stunning images with as much or as little control as
                  you like thanks to a choice of Basic and Creative modes.
                </p>

                <div className="mt-4 md:mt-6">
                  <div className="h-[2px] w-16 md:w-20 bg-gray-300 mb-2 md:mb-4" />
                  <div className="font-semibold text-charcoal text-sm md:text-base tracking-tighter">
                    SEAN MORRISON
                  </div>
                  <div className="text-gray-400 text-sm md:text-base">
                    Photographer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="flex flex-col items-center justify-center py-8 md:py-10 bg-gray-400/40 px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tighter text-slate-800 mb-2 text-center">
            What People Say?
          </h2>

          <hr className="border-t w-24 md:w-36 mb-4 md:mb-6 border-slate-600" />

          <p className="text-center text-charcoal text-base md:text-lg max-w-5xl mx-auto mb-3 md:mb-4 px-2">
            &quot;Shopping with NINE Store was a game-changer. Their wide
            selection, excellent quality, and outstanding customer service made
            all the difference.&quot;
          </p>

          <div className="text-center">
            <p className="text-base md:text-lg font-semibold text-deep-navy">
              Alin Bar
            </p>
            <p className="text-gray-600 text-sm md:text-base">Happy Customer</p>
          </div>
        </div>

        {/* Team Section */}
        <div className="flex flex-col items-center justify-center pt-12 md:pt-16 lg:pt-20 pb-16 md:pb-24 lg:pb-32 bg-white px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tighter text-slate-800 mb-6 md:mb-8 text-center">
            Team Members
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full md:w-11/12 max-w-7xl mx-auto">
            <TeamCard
              imageSrc="/assets/person1.jpg"
              name="Musa Karem"
              designation="Shopify Expert"
            />
            <TeamCard
              imageSrc="/assets/person2.jpg"
              name="Alina Ray"
              designation="Marketing Specialist"
            />
            <TeamCard
              imageSrc="/assets/person3.jpg"
              name="John Doe"
              designation="Product Manager"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
