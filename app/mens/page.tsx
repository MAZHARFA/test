"use client";
import {motion} from "framer-motion";

import Image from "next/image";
import image1 from "../../assets/menswatch1.jpg";
import image2 from "../../assets/menswatch2.jpg";
import image3 from "../../assets/menswatch3.jpg";
import image4 from "../../assets/watch1.jpg";
import image5 from "../../assets/kids5.jpeg";
import image6 from "../../assets/watch3.jpg";
import image7 from "../../assets/kids2.jpeg";
import image8 from "../../assets/menswatch5.jpg";
import image9 from "../../assets/kids10.jpeg"

const products = [
  { image: image1, alt: "watch1", price: "$35" },
  { image: image2, alt: "watch2", price: "$125" },
  { image: image3, alt: "watch3", price: "$250" },
  { image: image4, alt: "watch4", price: "$300" },
  { image: image5, alt: "watch5", price: "$40" },
  { image: image6, alt: "watch6", price: "$300" },
  { image: image7, alt: "watch7", price: "$25" },
  { image: image8, alt: "watch8", price: "$235" },
  { image: image9, alt: "watch9", price: "$90" },
];

const Images = () => {
  return (
    <motion.div
      whileInView={{ opacity: 5, y: 0 }}
      initial={{ opacity: 0, y: -100 }}
      transition={{ duration: 1.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 p-8 mt-12"
    >
      {products.map((product, index) => (
        <div key={index} className="flex flex-col items-center space-y-4 bg-white p-4 rounded-lg shadow-md">
          <Image
            src={product.image}
            alt={product.alt}
            width={150}
            height={150}
            className="rounded"
          />
          <span className="text-lg font-semibold">{product.price}</span>
          <button className="px-4 py-2 bg-gray-300 text-blue-600 rounded-full hover:bg-gray-400">
            Add to Cart
          </button>
        </div>
      ))}
    </motion.div>
  );
};

export default Images;
