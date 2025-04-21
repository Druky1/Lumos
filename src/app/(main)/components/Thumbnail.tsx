"use client";

import React, { useState } from "react";
import Dropzone from "./Dropzone";
import Style from "./Style";

const Thumbnail = () => {
  const [selectedStyle, setSelectedStyle] = useState("");
  const setSelectedImage = async (file?: File) => {};
  
  return (
    <>
      <div className="mt-6 mb-6 flex flex-col items-center justify-between md:flex-row md:items-start gap-6">
        <Style 
          image="/test1.jpg" 
          selectStyle={() => setSelectedStyle("style1")} 
          isSelected={selectedStyle === "style1"} 
        />
        <Style 
          image="/test1.jpg" 
          selectStyle={() => setSelectedStyle("style2")} 
          isSelected={selectedStyle === "style2"} 
        />
        <Style 
          image="/test1.jpg" 
          selectStyle={() => setSelectedStyle("style3")} 
          isSelected={selectedStyle === "style3"} 
        />
      </div>
      <Dropzone setSelectedImage={setSelectedImage} />
    </>
  );
};

export default Thumbnail;