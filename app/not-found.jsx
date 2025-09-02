import React from "react";
import { Home } from "lucide-react"; // modern icon set
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 px-4">
      <h1 className="text-9xl font-extrabold text-gray-300">404</h1>
      <h2 className="mt-4 text-3xl font-bold">Page Not Found</h2>
      <p className="mt-2 text-gray-600 text-center max-w-md">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-white font-medium shadow-md hover:bg-blue-700 transition"
      >
        <Home size={18} />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
