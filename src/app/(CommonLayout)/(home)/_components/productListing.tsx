"use client";

import Heading from "./_productListingComponents/heading";
import ProductGrid from "./_productListingComponents/productGrid";

const ProductListing = () => {
  return (
    <main className="min-h-screen bg-white mt-28 mb-16">
      <Heading />

      <ProductGrid />
    </main>
  );
};

export default ProductListing;
