"use client"
import React from 'react';
import {motion} from "framer-motion"
import Image from 'next/image';
import image1 from "../../assets/kids1.jpeg" 
import image2 from "../../assets/kids2.jpeg"  
import image3 from "../../assets/kids3.jpeg"  
import image4 from "../../assets/kids4.jpeg"  
import image5 from "../../assets/kids5.jpeg"  
import image6 from "../../assets/kids6.jpeg"  
import image7 from "../../assets/kids7.jpeg"  
import image8 from "../../assets/kids8.jpeg"  
import image9 from "../../assets/kids9.jpeg"  
import image10 from "../../assets/kids10.jpeg"  
import image11 from "../../assets/kids11.jpeg"  
import image12 from "../../assets/kids12.jpeg"  





const products = [
  { image: image1, alt: "watch1", price: "$20" },
  { image: image2, alt: "watch2", price: "$25" },
  { image: image3, alt: "watch3", price: "$35" },
  { image:image4,  alt: "watch4",  price:"$30"},
  {image: image5,   alt:"watch5",  price:"$40"},
  {image: image6,   alt:"watch6",  price:"$50"},
  {image: image7,   alt:"watch7",  price:"$45"},
  {image: image8,   alt:"watch8",  price:"$60"},
  {image: image9,   alt:"watch9",  price:"$75"},
  {image: image10,   alt:"watch10",  price:"$90"},
  {image: image11,   alt:"watch11",  price:"$55"},
  {image: image12,   alt:"watch12",  price:"$100"},
]
  
const page = () => {
  return (
   <>

      <h4 className="text-4xl text-center font-mono mt-15 text-blue-950 underline uppercase">KIDS COLLECION</h4>
   
   
         <motion.main 
      
          whileInView={{ opacity: 5, y: 0 }}
          initial={{ opacity: 0, y: -100 }}
          transition={{ duration: 1.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  divide-x-6  gap-20 p-8 mt-25">
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
          </motion.main>


   </>
  )
}

export default page;
