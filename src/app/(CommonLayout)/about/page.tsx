import Image from "next/image";
import Link from "next/link";
// import about from "/assets/2400-clothes-and-fashion-accessories-on-wooden-floor.jpg";
import TeamCard from "./teamCard";
import { House, Quote } from "lucide-react";

const page = () => {
  return (
    <div>
      <div className="h-16"></div>
      <div>
        <div className="flex flex-col items-center justify-center py-10  bg-slate-800/80 text-white">
          <h1 className=" text-4xl font-medium ">ABOUT</h1>

          <nav className="mt-4  text-lg ">
            <ol className="flex items-center space-x-2">
              <li>
                <Link
                  href="/"
                  className="hover:underline flex flex-row justify-center items-start gap-1  "
                >
                  <House size={16} className="mt-1" />
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

        <div className="grid grid-cols-2 gap-2  w-full p-8 mx-auto  ">
          {/* Image Section */}
          <div className="w-full  mx-auto pb-4 ">
            <Image
              src="/assets/About-1.jpg"
              // src="/assets/b.jpg"
              alt="Clothing rack with fall themed clothing"
              width={1200}
              height={300}
              className=" object-cover h-[500px]"
            />
          </div>

          {/* Text Section */}
          {/* <div className="mt-10 text-center  px-12 pb-16">
            <h1 className="text-4xl font-semibold text-deep-brown">
              Welcome !
            </h1>
            <p className="mt-4 text-charcoal text-lg tracking-tight  mx-auto">
              Welcome to our journey! At IX, we believe in creating moments that
              inspire and transform everyday experiences. Whether you are here
              for elegant designs, sustainable choices, or simply to make your
              surroundings more beautiful, we want to help you make that vision
              a reality. Our passion is in the details — crafting products that
              are as functional as they are inspirational. Each piece tells a
              story of quality, care, and creativity, designed to evoke a sense
              of warmth and connection. We believe that beauty is not just what
              you see; it is what you feel. Together, lets create spaces that
              reflect who you are, bring comfort, and spark joy. Your journey
              starts here, and we are excited to be a part of it.
            </p>
          </div> */}

          <div className="mx-auto max-w-3xl px-6 py-1">
            {/* Heading */}
            <h2 className="text-4xl font-semibold tracking-tight text-slate-800">
              Our Story
            </h2>

            {/* Body copy */}
            <p className="mt-6 text-charcoal text-lg leading-tight tracking-tighter font-sans">
              Welcome to our journey! At NINE, we believe in creating moments
              that inspire and transform everyday experiences. Whether you are
              here for elegant designs, sustainable choices, or simply to make
              your surroundings more beautiful, we want to help you make that
              vision a reality.
            </p>
            <p className="mt-6 text-charcoal text-lg leading-tight tracking-tighter font-sans">
              Our passion is in the details — providing products that tell story
              of quality, care, and creativity, designed to evoke a sense of
              warmth and connection. Together, let’s create spaces that reflect
              who you are, bring comfort, and spark joy.
            </p>

            {/* Testimonial / quote */}
            <div className="mt-12 flex items-start gap-3">
              {/* Red quote marks */}
              <Quote className="w-9 h-9 text-red-500 transform -scale-x-100" />

              {/* Quote text + author */}
              <div className="flex-1">
                <p className=" pt-2 text-base md:text-2xl font-medium leading-tight tracking-tighter font-sans text-gray-600">
                  Create stunning images with as much or as little control as
                  you like thanks to a choice of Basic and Creative modes.
                </p>

                <div className="mt-6">
                  <div className="h-[2px] w-20 bg-gray-300 mb-4" />
                  <div className="font-semibold text-charcoal text-base tracking-tighter">
                    SEAN MORRISON
                  </div>
                  <div className="text-gray-400 text-base">Photographer</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* //testimonial */}
        <div className="flex flex-col items-center justify-center py-10 bg-gray-400/40">
          <h2 className="text-4xl font-semibold tracking-tighter text-slate-800 mb-2">
            What People Say?
          </h2>
          <hr className="border-t w-36   mb-6 border-slate-600" />
          <p className="text-center text-charcoal text-lg max-w-5xl mx-auto mb-4">
            Shopping with NINE Store was a game-changer. Their wide selection,
            excellent quality, and outstanding customer service made all the
            difference.
          </p>
          <div className="text-center">
            <p className="text-lg font-semibold text-deep-navy">Alin Bar</p>
            <p className="text-gray-600 text-base">Happy Customer</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center pt-20 pb-32 bg-white">
          <h2 className="text-4xl font-semibold tracking-tighter text-slate-800 mb-8">
            Team Member
          </h2>
          {/* <hr className="border-t w-36 mb-8 border-slate-600" /> */}
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full md:w-11/12">
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
