import { TShop } from "@/types";
import Image from "next/image";
import Link from "next/link";

const ShopCard = ({ shop }: { shop: TShop }) => {
  const { name, logo, createdAt, products } = shop;

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
      {/* Logo */}
      <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 bg-gray-200">
        <Image
          src={logo || "/default-logo.png"} // Fallback to a default logo
          alt={`${name} logo`}
          fill // Ensures the image fills the entire container
          className="object-cover"
        />
      </div>

      {/* Shop Name */}
      <h2 className="text-lg font-semibold text-center mb-2">{name}</h2>

      {/* Joined Date */}
      <p className="text-sm text-gray-500 mb-2">
        Joined: {new Date(createdAt).toLocaleDateString()}
      </p>

      {/* Total Products */}
      {/* <p className="text-sm text-gray-500 mb-4">
        Following: {followers?.length || 0}
      </p> */}
      {/* Total Products */}
      <p className="text-sm text-gray-500 mb-4">
        Total Products: {products?.length || 0}
      </p>

      {/* Actions */}
      <div className="flex gap-2">
        <Link
          href={`/shop/${shop?.id}`}
          className="bg-muted   text-base text-charcoal py-1 px-4 rounded-lg hover:bg-muted-foreground hover:text-white"
        >
          Visit
        </Link>
        {/* <button className="bg-gray-200  text-base text-charcoal py-1 px-4 rounded-lg hover:bg-gray-300">
          Follow
        </button> */}
      </div>
    </div>
  );
};

export default ShopCard;
