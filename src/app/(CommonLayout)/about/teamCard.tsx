import Image, { StaticImageData } from "next/image";
import { Facebook, Twitter, Linkedin } from "lucide-react";

type TeamCardProps = {
  imageSrc: string | StaticImageData;
  name: string;
  designation: string;
};

const TeamCard = ({ imageSrc, name, designation }: TeamCardProps) => {
  return (
    <div className="mx-auto overflow-hidden rounded-lg shadow-lg group bg-white hover:shadow-xl transition-shadow duration-300 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xs xl:max-w-sm">
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <Image
          src={imageSrc}
          alt={name}
          width={400}
          height={400}
          className="object-cover w-full h-64 sm:h-72 md:h-80 lg:h-72 xl:h-80 group-hover:scale-105 transition-transform duration-500"
        />

        {/* Hover Overlay - Appears on hover/touch */}
        {/* <div className="absolute inset-0 bg-deep-brown bg-opacity-80 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4"> */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-deep-brown bg-opacity-70 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-1">
            {name}
          </h2>
          <p className="text-sm sm:text-base text-center">{designation}</p>
        </div>
      </div>

      {/* Text Section */}
      <div className="p-4 sm:p-5 md:p-6 text-center">
        <p className="text-gray-600 text-sm sm:text-base tracking-tight mb-3 sm:mb-4 line-clamp-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          condimentum.
        </p>

        {/* Social Icons */}
        <div className="flex justify-center space-x-3 sm:space-x-4">
          <a
            href="#"
            aria-label="Facebook"
            className="hover:-translate-y-1 transition-transform duration-200"
          >
            <Facebook className="h-6 w-6 sm:h-7 sm:w-7 text-deep-brown hover:text-blue-600 transition-colors duration-300" />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="hover:-translate-y-1 transition-transform duration-200"
          >
            <Twitter className="h-6 w-6 sm:h-7 sm:w-7 text-deep-brown hover:text-blue-400 transition-colors duration-300" />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="hover:-translate-y-1 transition-transform duration-200"
          >
            <Linkedin className="h-6 w-6 sm:h-7 sm:w-7 text-deep-brown hover:text-blue-700 transition-colors duration-300" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
