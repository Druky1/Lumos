"use client";

import React, { useState, useRef, useEffect } from "react";
import Dropzone from "./Dropzone";
import Style from "./Style";
import { removeBackground } from "@imgly/background-removal";
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import { ArrowLeft } from "lucide-react";

const thumbnailStyles = {
  style1: {
    fontSize: 500,
    fontFamily: "Instrument Serif",
    fontWeight: 400,
    color: "white",
    opacity: 1,
  },
  style2: {
    fontSize: 500,
    fontFamily: "Inter",
    fontWeight: 500,
    color: "#00997E",
    opacity: 0.9,
  },
  style3: {
    fontSize: 600,
    fontFamily: "Manrope",
    fontWeight: 600,
    color: "white",
    opacity: 0.8,
  },
};

const Thumbnail = ({ userName }: { userName: string }) => {
  const [selectedStyle, setSelectedStyle] = useState("style1");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [processedImageSrc, setProcessedImageSrc] = useState<string | null>(
    null
  );
  const [canvasReady, setCanvasReady] = useState(false);
  const [text, setText] = useState("GLOW");

  const setSelectedImage = async (file?: File) => {
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const src = e.target?.result as string;
        setImageSrc(src);
        // Don't forget to set loading to false when done
        const blob = await removeBackground(src);
        const processedUrl = URL.createObjectURL(blob);
        setProcessedImageSrc(processedUrl);
        setCanvasReady(true);
        setLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (canvasReady) {
      drawCompImage();
    }
  }, [canvasReady]);

  const drawCompImage = () => {
    if (!canvasRef.current || !canvasReady || !imageSrc || !processedImageSrc)
      return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const image = new Image();
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      let preset = thumbnailStyles.style1;
      switch (selectedStyle) {
        case "style1":
          preset = thumbnailStyles.style1;
          break;
        case "style2":
          preset = thumbnailStyles.style2;
          break;
        case "style3":
          preset = thumbnailStyles.style3;
          break;
        default:
          preset = thumbnailStyles.style1;
          break;
      }
      ctx.save();

      // Calculating font size to fill image 90% width
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const fontSize = Number(preset.fontSize);
      ctx.font = `${preset.fontWeight} ${fontSize}px ${preset.fontFamily}`;
      ctx.fillStyle = preset.color;
      ctx.globalAlpha = preset.opacity;

      const x = canvas.width / 2;
      const y = canvas.height / 2;

      ctx.translate(x, y);
      ctx.fillText(text, 0, 0, canvas.width * 0.9);
      ctx.restore();

      const fgImage = new Image();
      fgImage.onload = () => {
        ctx.drawImage(fgImage, 0, 0, canvas.width, canvas.height);
      };
      fgImage.src = processedImageSrc;
    };
    image.src = imageSrc;
  };

  const handleDownloadImage = async () => {
    if (canvasRef.current) {
      const link = document.createElement("a");
      link.download = "thumbnail.png";
      link.href = canvasRef.current.toDataURL("image/png");
      link.click();
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center gap-1 mt-48">
          <div className="h-3 w-3 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-3 w-3 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-3 w-3 bg-black rounded-full animate-bounce"></div>
        </div>
      ) : imageSrc ? (
        <div className="flex flex-col items-center justify-center gap-4">
          {/* <img src={imageSrc} alt="Uploaded" className="rounded-lg max-w-full" /> */}
          <div className="flex items-center justify-start w-full max-w-lg">
            <button
              onClick={() => {
                setImageSrc(null);
                setProcessedImageSrc(null);
                setCanvasReady(false);
              }}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </button>
          </div>
          <canvas
            ref={canvasRef}
            className="max-h-lg h-auto w-full max-w-lg rounded-lg "
          ></canvas>
          <Button
            onClick={handleDownloadImage}
            className="mt-2 cursor-pointer md:w-full flex items-center"
          >
            Download
            <FiDownload className="w-4 h-4" />
          </Button>
          {/* Add any other UI elements for when the image is processed */}
        </div>
      ) : (
        <>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-instrument-serif tracking-tight text-center">
            Hello! {userName}
          </h1>
          <h2 className="text-md md:text-lg lg:text-lg tracking-tight text-center text-muted-foreground">
            Get started by creating beautiful thumbnails for your content
          </h2>
          <div className="mt-6 mb-6 flex flex-col items-center justify-between md:flex-row md:items-start gap-6">
            <Style
              image="/thumbnail1.png"
              selectStyle={() => setSelectedStyle("style1")}
              isSelected={selectedStyle === "style1"}
            />
            <Style
              image="/thumbnail2.png"
              selectStyle={() => setSelectedStyle("style2")}
              isSelected={selectedStyle === "style2"}
            />
            <Style
              image="/thumbnail3.png"
              selectStyle={() => setSelectedStyle("style3")}
              isSelected={selectedStyle === "style3"}
            />
          </div>
          <Dropzone setSelectedImage={setSelectedImage} />
        </>
      )}
    </>
  );
};

export default Thumbnail;
