import React from 'react'
import Image from 'next/image';
import mainImage from '../assets/main.jpg';
import {motion} from "framer-motion"

const MotionImage = motion(Image);


const Content = () => {
  return (
    <div className="mt-20 px-10 flex items-center justify-between gap-10">
   
      <div className="max-w-xl font-mono">
      
        <p className="text-lg leading-relaxed ml-30 font-light justify-stretch">
          Welcome to our latest timepiece collection, where elegance meets precision. Each watch is
          crafted with the finest materials and cutting-edge design, ensuring not only accurate timekeeping
          but also a timeless aesthetic. Whether you're dressing up for an event or keeping it casual,
          our watches add the perfect touch of sophistication. Discover the harmony of tradition and
          innovation wrapped around your wrist.
        </p>
      </div>

     
      <MotionImage
        src={mainImage}
        alt="watch"
        width={500}
        height={500}
        className="rounded-xl mr-70 "
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 2.5 }}
      />


    </div>
);                                              
};


export default Content;
