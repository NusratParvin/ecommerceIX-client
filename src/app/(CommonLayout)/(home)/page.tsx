import Banner from "./_components/banner";
import CategoryList from "./_components/categoryList";
import FlashSaleProducts from "./_components/flashSaleProducts";
import Info from "./_components/info";
import ProductListing from "./_components/productListing";

export default function Home() {
  return (
    <>
      <Banner />
      <Info />
      <CategoryList />
      <ProductListing />
      <FlashSaleProducts />
    </>
  );
}
