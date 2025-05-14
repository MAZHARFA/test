import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./Cart";

const Header = () => {
  const [input, setInput] = useState("");
  const { cartCount } = useCart();

  return (
    <header className="bg-white p-1 shadow-sm fixed top-0 left-0 w-full z-50 ">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center ">
        <div className="flex items-center space-x-2 hover:animate-bounce">
          <h1 className="text-2xl font-bold text-gray-900">STORE</h1>
        </div>

        <nav className="mt-4 md:mt-0 flex flex-col md:flex-row md:items-center md:space-x-6 w-full md:w-auto">
          <a
            href="#Images"
            className="relative text-gray-700 hover:text-blue-600 font-semibold transition-transform duration-200 hover:scale-110 cursor-pointer 
             after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-red-500 
             hover:after:w-full after:transition-all after:duration-300  "
          >
            Shop
          </a>
          <a
            href="/mens"
            className="relative text-gray-700 hover:text-blue-600 font-semibold transition-transform duration-200 hover:scale-110 cursor-pointer 
             after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-red-500 
             hover:after:w-full after:transition-all after:duration-300"
          >
            Mens
          </a>
          <a
            href="/kids"
            className="relative text-gray-700 hover:text-blue-600 font-semibold transition-transform duration-200 hover:scale-110 cursor-pointer 
             after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-red-500 
             hover:after:w-full after:transition-all after:duration-300"
          >
            Kids
          </a>

          <Link href="/cart" className="relative">
            <Image
              src="/cart.png"
              alt="cart"
              width={50}
              height={50}
              className="transition-transform duration-200 hover:scale-110 cursor-pointer"
            />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                {cartCount}
              </span>
            )}
          </Link>

          <a
            href="/login"
            className=" px-1 py-1 text-blue-600 rounded-full transition-colors duration-200 float-right items-center justify-between font-bold bg-gray-100 font-serif "
          >
            Login
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
