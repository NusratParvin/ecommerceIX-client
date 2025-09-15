import Link from "next/link";

const PageHeading = () => {
  return (
    <div>
      <div className="h-36 bg-deep-brown"></div>
      <div className="md:w-11/12 w-full mx-auto">
        {/* Breadcrumb and Title Section */}
        <div className="flex flex-col items-center justify-center py-20 bg-warm-brown/10">
          <h1 className="text-4xl font-medium text-charcoal">FLASH SALE </h1>
          <nav className="mt-4 text-deep-navy/80 text-base">
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
                <span className="font-medium">Flash Sale</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PageHeading;
