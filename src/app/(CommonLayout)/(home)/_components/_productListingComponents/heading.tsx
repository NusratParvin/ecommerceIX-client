const Heading = () => {
  return (
    <div className="flex flex-col items-center justify-center my-16 ">
      <h2 className="text-4xl text-deep-brown  font-semibold tracking-wide">
        Available Products Await
      </h2>

      <div className="flex items-center mt-2">
        <span className="block w-20 h-px bg-warm-brown"></span>
        <div className="flex flex-row justify-center items-center gap-0">
          <svg
            className="w-5 h-5 ms-2 text-deep-brown"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l2.09 6.26H20l-5.2 3.77L17.09 18 12 13.47 6.91 18 9.2 12.03 4 8.26h5.91z" />
          </svg>
          <svg
            className="w-8 h-8 mx-0 text-deep-brown"
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

        <span className="block w-20 h-px bg-warm-brown"></span>
      </div>
    </div>
  );
};

export default Heading;
