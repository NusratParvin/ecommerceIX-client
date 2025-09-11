import Banner from "./_components/banner";
import BestSellerProducts from "./_components/bestSellerProducts";
import CategoryList from "./_components/categoryList";
import FlashSaleProducts from "./_components/flashSaleProducts";
import Info from "./_components/info";
import NewsletterSection from "./_components/newsletter";
import ParallaxBannerHome from "./_components/parallaxBanner";
import ProductListing from "./_components/productListing";

export default function Home() {
  return (
    <>
      <Banner />
      <Info />
      <CategoryList />
      <ProductListing />

      <BestSellerProducts />
      <ParallaxBannerHome />
      <FlashSaleProducts />
      <NewsletterSection />
    </>
  );
}
