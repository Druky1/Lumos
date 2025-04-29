import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

type DropzoneProps = {
  setSelectedImage: (file?: File) => void;
};

const Dropzone = (props: DropzoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      if (files[0].type.startsWith('image/')) {
        props.setSelectedImage(files[0]);
      } else {
        alert('Please upload an image file.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <input
        className="hidden"
        type="file"
        id="file-upload"
        accept="image/*"
        onChange={(e) => props.setSelectedImage(e.target.files?.[0])}
      />
      <label 
        htmlFor="file-upload" 
        className={`flex flex-col items-center justify-center w-full h-72 cursor-pointer border-2 border-dashed rounded-lg ${
          isDragging 
            ? "border-blue-500 bg-blue-50" 
            : "border-gray-300 bg-gray-50 hover:bg-gray-100"
        } transition duration-200 ease-in-out tracking-tight text-center text-muted-foreground`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <FiUploadCloud className={`w-6 h-6 mb-2 ${isDragging ? "text-blue-500" : "text-muted-foreground"}`}/>
        <span>{isDragging ? "Drop your image here" : "Drag and drop your image here"}</span>
        <span>or click to select an image</span>
      </label>
    </div>
  );
};

export default Dropzone;