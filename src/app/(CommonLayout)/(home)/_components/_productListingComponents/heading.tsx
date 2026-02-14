import Link from "next/link";

const Heading = () => {
  return (
    <div className="flex sm:flex-row flex-col justify-between md:gap-5 gap-2 px-4 w-full md:w-11/12 mx-auto  mb-1  ">
      <div className="flex flex-col items-start">
        <h2 className="text-left text-2xl md:text-3xl text-deep-brown tracking-tight font-semibold ">
          {/* New Arrivals Await */}
          New Arrivals
        </h2>{" "}
        <p className="font-medium text-xs tracking-tight pb-1 ps-1 uppercase text-charcoal/60">
          Find your style Of arrival collection
        </p>
      </div>

      <div className="flex items-center mt-0   ">
        {/* <div className="w-40 mx-auto  "> */}
        <Link
          href="/allProducts"
          className="text-base hover:underline text-gray-600 px-6 py-1.5 bg-muted/70 tracking-tighter"
        >
          More Products
        </Link>
        {/* </div> */}

        {/* <span className="block w-20 h-px bg-gray-400"></span>  
        <div className="flex flex-row justify-center items-center gap-0">
          <svg
            className="w-5 h-5 ms-2 text-deep-brown "
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l2.09 6.26H20l-5.2 3.77L17.09 18 12 13.47 6.91 18 9.2 12.03 4 8.26h5.91z" />
          </svg>  
           <svg
            className="w-7 h-7 mx-0 text-deep-brown"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l2.09 6.26H20l-5.2 3.77L17.09 18 12 13.47 6.91 18 9.2 12.03 4 8.26h5.91z" />
          </svg>

         
          <svg
            className="w-5 h-5 me-2 text-deep-brown"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l2.09 6.26H20l-5.2 3.77L17.09 18 12 13.47 6.91 18 9.2 12.03 4 8.26h5.91z" />
          </svg>
        </div>

        {/* <span className="block w-20 h-px bg-warm-brown"></span> */}
      </div>
    </div>
  );
};

export default Heading;
