import React from "react";

function PageNotFound() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#F0DAC5] px-4">
      <div className="bg-[#1C2340] text-white p-10 rounded-xl shadow-2xl text-center max-w-md w-full">
        
        <h1 className="text-5xl font-bold mb-3">404</h1>

        <p className="text-xl font-semibold mb-2">
          Page Not Found
        </p>

        <p className="text-gray-300 mb-6 text-sm">
          The page you are looking for doesn't exist.
        </p>

        <a
          href="/"
          className="inline-block bg-[#50223C] hover:bg-[#3e1a2f] px-6 py-2 rounded-md font-semibold transition"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}

export default PageNotFound;