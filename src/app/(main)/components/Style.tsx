"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Style = ({
  image,
  selectStyle,
  isSelected,
}: {
  image: string;
  selectStyle: () => void;
  isSelected: boolean;
}) => {
  return (
    <motion.div
      onClick={selectStyle}
      whileHover={{ 
        scale: 1.05, 
        transition: { duration: 0.2 } 
      }}
      className="relative cursor-pointer"
    >
      <motion.div 
        className="relative rounded-lg z-10 overflow-hidden"
      >
        <div className="w-95 h-56 relative">
          <Image 
            src={image} 
            alt="thumbnail style" 
            fill
            sizes="(max-width: 768px) 100vw, 288px"
            className="object-cover rounded-lg"
            priority
          />
        </div>
        
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute top-2 right-2 bg-black rounded-full w-6 h-6 flex items-center justify-center shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Style;