import Image from "next/image";
import Link from "next/link";
// import about from "/assets/2400-clothes-and-fashion-accessories-on-wooden-floor.jpg";
import TeamCard from "./teamCard";

const page = () => {
  return (
    <div>
      <div className="h-24 bg-deep-brown"></div>
      <div className="md:w-11/12 w-full mx-auto ">
        <div className="flex flex-col items-center justify-center py-10  bg-warm-brown/10">
          <h1 className="text-4xl font-medium text-charcoal">ABOUT</h1>
          <nav className="mt-4 text-deep-navy/80 text-base ">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <span className="font-medium">About</span>
              </li>
            </ol>
          </nav>
        </div>

        <div>
          {/* Image Section */}
          <div className="w-full md:w-2/3 lg:3/4 mx-auto py-10 ">
            <Image
              src="/assets/2400-clothes-and-fashion-accessories-on-wooden-floor.jpg"
              alt="Clothing rack with fall themed clothing"
              width={800}
              height={400}
              className="rounded-sm object-cover"
            />
          </div>

          {/* Text Section */}
          <div className="mt-10 text-center  px-12 pb-16">
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
          </div>
        </div>

        {/* //testimonial */}
        <div className="flex flex-col items-center justify-center py-20 bg-warm-brown/10">
          <h2 className="text-4xl font-semibold text-deep-brown mb-6">
            What People Say?
          </h2>
          <hr className="border-t w-24   mb-8" />
          <p className="text-center text-charcoal text-lg max-w-3xl mx-auto mb-8">
            Shopping with IX was a game-changer. Their wide selection, excellent
            quality, and outstanding customer service made all the difference.
          </p>
          <div className="text-center">
            <p className="text-xl font-bold text-deep-navy">Alin Bar</p>
            <p className="text-warm-brown text-base">Happy Customer</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center pt-20 pb-32 bg-white">
          <h2 className="text-4xl font-semibold text-deep-brown mb-6">
            Team Member
          </h2>
          <hr className="border-t w-24   mb-8" />
          <div className="md:w-3/4 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <TeamCard
              imageSrc="/assets/2400-clothes-and-fashion-accessories-on-wooden-floor.jpg"
              name="Musa Kalimullah"
              designation="Shopify Expert"
            />
            <TeamCard
              imageSrc="/assets/2400-clothes-and-fashion-accessories-on-wooden-floor.jpg"
              name="Alina Ray"
              designation="Marketing Specialist"
            />
            <TeamCard
              imageSrc="/assets/2400-clothes-and-fashion-accessories-on-wooden-floor.jpg"
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
