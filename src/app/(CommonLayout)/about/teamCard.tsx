import Image, { StaticImageData } from "next/image";
import { Facebook, Twitter, Linkedin } from "lucide-react";

type TeamCardProps = {
  imageSrc: string | StaticImageData;
  name: string;
  designation: string;
};

const TeamCard = ({ imageSrc, name, designation }: TeamCardProps) => {
  return (
    <div className=" mx-auto overflow-hidden rounded-none shadow-lg group">
      {/* Image Section */}
      <div className="relative">
        <Image
          src={imageSrc}
          alt={name}
          width={320}
          height={400}
          className="object-cover w-full h-80"
        />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-deep-brown bg-opacity-70 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-sm">{designation}</p>
        </div>
      </div>

      {/* Text Section */}
      <div className="p-6 text-center">
        <p className="text-charcoal  text-base tracking-tighter mb-4">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          condimentum."
        </p>
        {/* Social Icons */}
        <div className="flex justify-center space-x-4   h-12">
          <a href="#" aria-label="Facebook">
            <Facebook className="h-7 w-7 p-1 border  text-warm-brown hover:text-blue-600 transition-colors duration-300" />
          </a>
          <a href="#" aria-label="Twitter">
            <Twitter className="h-7 w-7 p-1 border  text-warm-brown hover:text-blue-400 transition-colors duration-300" />
          </a>
          <a href="#" aria-label="LinkedIn">
            <Linkedin className="h-7 w-7 p-1 border  text-warm-brown hover:text-blue-700 transition-colors duration-300" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
