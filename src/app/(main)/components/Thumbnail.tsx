"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import Dropzone from "./Dropzone";
import Style from "./Style";
import { removeBackground } from "@imgly/background-removal";
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import { ArrowLeft, Save } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { creditDeduction, revalidate, checkCredits } from "@/app/actions/generate";
import { RoughNotation } from "react-rough-notation";
import { useTheme } from "next-themes";

const thumbnailStyles = {
  style1: {
    fontSize: 500,
    fontFamily: "Instrument Serif",
    fontWeight: 400,
    color: "white",
    opacity: 1,
    xOffset: 0,
    yOffset: 0,
  },
  style2: {
    fontSize: 500,
    fontFamily: "Inter",
    fontWeight: 500,
    color: "#00997E",
    opacity: 0.9,
    xOffset: 0,
    yOffset: 0,
  },
  style3: {
    fontSize: 200,
    fontFamily: "Manrope",
    fontWeight: 600,
    color: "white",
    opacity: 0.8,
    xOffset: 0,
    yOffset: 0,
  },
};

const Thumbnail = ({ userName }: { userName: string }) => {
  const {theme} = useTheme()
  const [selectedStyle, setSelectedStyle] = useState("style1");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [processedImageSrc, setProcessedImageSrc] = useState<string | null>(null);
  const [canvasReady, setCanvasReady] = useState(false);
  const [text, setText] = useState("GLOW");
  const [textColor, setTextColor] = useState(() => {
    return thumbnailStyles[selectedStyle as keyof typeof thumbnailStyles].color;
  });
  const [textOpacity, setTextOpacity] = useState(() => {
    return (
      thumbnailStyles[selectedStyle as keyof typeof thumbnailStyles].opacity * 100
    );
  });
  const [xOffset, setXOffset] = useState(() => {
    return thumbnailStyles[selectedStyle as keyof typeof thumbnailStyles].xOffset;
  });
  const [yOffset, setYOffset] = useState(() => {
    return thumbnailStyles[selectedStyle as keyof typeof thumbnailStyles].yOffset;
  });
  const [pendingColorUpdate, setPendingColorUpdate] = useState<string | null>(null);
  const [pendingOpacityUpdate, setPendingOpacityUpdate] = useState<number | null>(null);
  const [pendingXOffsetUpdate, setPendingXOffsetUpdate] = useState<number | null>(null);
  const [pendingYOffsetUpdate, setPendingYOffsetUpdate] = useState<number | null>(null);
  const [fontSize, setFontSize] = useState(() => {
    return thumbnailStyles[selectedStyle as keyof typeof thumbnailStyles].fontSize;
  });
  const [fontFamily, setFontFamily] = useState(() => {
    return thumbnailStyles[selectedStyle as keyof typeof thumbnailStyles].fontFamily;
  });
  const [fontWeight, setFontWeight] = useState(() => {
    return thumbnailStyles[selectedStyle as keyof typeof thumbnailStyles].fontWeight;
  });
  const colorUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const opacityUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const xOffsetUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const yOffsetUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: async () => {
      setIsUploading(false);
      setUploadProgress(100);
      toast.success("Thumbnail saved successfully!");
      const result = await creditDeduction();
      if (!result.success) {
        toast.error("Error deducting credits");
      } else {
       
        await revalidate();
      }
    },
    onUploadError: (error) => {
      setIsUploading(false);
      setUploadProgress(0);
      toast.error("Error saving thumbnail. Please try again later.");
      console.error("Upload error:", error);
    },
    onUploadProgress: (progress) => {
      setUploadProgress(progress);
    },
  });

  const handleSaveThumbnail = async () => {
    if (!canvasRef.current) return;
    const creditCheck = await checkCredits();
    if (!creditCheck.success || (creditCheck.credits ?? 0) < 1) {
      toast.error("Not enough credits to save thumbnail!");
      return;
    }
  
    setIsUploading(true);
    setUploadProgress(0);
  
    try {
      // converting canvas to file
      const dataUrl = canvasRef.current.toDataURL("image/png");
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], `thumbnail-${Date.now()}.png`, {
        type: "image/png",
      });
  
      // upload 
      await startUpload([file]);
    } catch (error) {
      setIsUploading(false);
      toast.error("Unable to save thumbnail. Please try again later.");
      console.error("Error saving thumbnail:", error);
    }
  };

  useEffect(() => {
    const style = thumbnailStyles[selectedStyle as keyof typeof thumbnailStyles];
    setTextColor(style.color);
    setTextOpacity(style.opacity * 100);
    setFontSize(style.fontSize);
    setFontFamily(style.fontFamily);
    setFontWeight(style.fontWeight);
    setXOffset(style.xOffset);
    setYOffset(style.yOffset);
  }, [selectedStyle]);

  const setSelectedImage = async (file?: File) => {
    if (file) {
      // checking credits before processing the image
      const creditCheck = await checkCredits();
      if (!creditCheck.success || (creditCheck.credits ?? 0) < 1) {
        toast.error("Not enough credits to process image!");
        return;
      }

      setLoading(true);
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const src = e.target?.result as string;
          setImageSrc(src);
          const blob = await removeBackground(src);
          const processedUrl = URL.createObjectURL(blob);
          setProcessedImageSrc(processedUrl);
          setCanvasReady(true);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          toast.error("Error processing image. Please try again.");
          console.error("Error removing background:", error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (pendingColorUpdate !== null) {
      if (colorUpdateTimeoutRef.current) {
        clearTimeout(colorUpdateTimeoutRef.current);
      }
      colorUpdateTimeoutRef.current = setTimeout(() => {
        setTextColor(pendingColorUpdate);
        setPendingColorUpdate(null);
      }, 100); // 100ms debounce
    }
    return () => {
      if (colorUpdateTimeoutRef.current) {
        clearTimeout(colorUpdateTimeoutRef.current);
      }
    };
  }, [pendingColorUpdate]);

  useEffect(() => {
    if (pendingOpacityUpdate !== null) {
      if (opacityUpdateTimeoutRef.current) {
        clearTimeout(opacityUpdateTimeoutRef.current);
      }
      opacityUpdateTimeoutRef.current = setTimeout(() => {
        setTextOpacity(pendingOpacityUpdate);
        setPendingOpacityUpdate(null);
      }, 0);
    }
    return () => {
      if (opacityUpdateTimeoutRef.current) {
        clearTimeout(opacityUpdateTimeoutRef.current);
      }
    };
  }, [pendingOpacityUpdate]);

  useEffect(() => {
    if (pendingXOffsetUpdate !== null) {
      if (xOffsetUpdateTimeoutRef.current) {
        clearTimeout(xOffsetUpdateTimeoutRef.current);
      }
      xOffsetUpdateTimeoutRef.current = setTimeout(() => {
        setXOffset(pendingXOffsetUpdate);
        setPendingXOffsetUpdate(null);
      }, 0);
    }
    return () => {
      if (xOffsetUpdateTimeoutRef.current) {
        clearTimeout(xOffsetUpdateTimeoutRef.current);
      }
    };
  }, [pendingXOffsetUpdate]);

  useEffect(() => {
    if (pendingYOffsetUpdate !== null) {
      if (yOffsetUpdateTimeoutRef.current) {
        clearTimeout(yOffsetUpdateTimeoutRef.current);
      }
      yOffsetUpdateTimeoutRef.current = setTimeout(() => {
        setYOffset(pendingYOffsetUpdate);
        setPendingYOffsetUpdate(null);
      }, 0);
    }
    return () => {
      if (yOffsetUpdateTimeoutRef.current) {
        clearTimeout(yOffsetUpdateTimeoutRef.current);
      }
    };
  }, [pendingYOffsetUpdate]);

  const drawCompImage = useCallback(() => {
    if (!canvasRef.current || !canvasReady || !imageSrc || !processedImageSrc)
      return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new Image();
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      ctx.save();

      // Calculating font size to fill image 90% width
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
      ctx.fillStyle = textColor;
      ctx.globalAlpha = textOpacity / 100;

      const x = canvas.width / 2 + (xOffset * canvas.width / 100); 
      const y = canvas.height / 2 + (yOffset * canvas.height / 100); 

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
  }, [
    canvasReady,
    imageSrc,
    processedImageSrc,
    text,
    textColor,
    textOpacity,
    fontSize,
    fontFamily,
    fontWeight,
    xOffset,
    yOffset,
  ]);

  useEffect(() => {
    if (canvasReady) {
      drawCompImage();
    }
  }, [
    canvasReady,
    text,
    textColor,
    textOpacity,
    fontSize,
    fontFamily,
    fontWeight,
    xOffset,
    yOffset,
    drawCompImage
  ]);

  const handleDownloadImage = async () => {
    if (canvasRef.current) {
      const link = document.createElement("a");
      link.download = "thumbnail.png";
      link.href = canvasRef.current.toDataURL("image/png");
      link.click();
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setPendingColorUpdate(newColor);
  };

  const handleFontFamilyChange = (value: string) => {
    setFontFamily(value);
  };

  const handleFontSizeChange = (values: number[]) => {
    setFontSize(values[0]);
  };

  const handleOpacityChange = (values: number[]) => {
    const newOpacity = values[0];
    setPendingOpacityUpdate(newOpacity);
  };

  const handleXOffsetChange = (values: number[]) => {
    const newXOffset = values[0];
    setPendingXOffsetUpdate(newXOffset);
  };

  const handleYOffsetChange = (values: number[]) => {
    const newYOffset = values[0];
    setPendingYOffsetUpdate(newYOffset);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center gap-1 mt-48">
          <div className="h-3 w-3 bg-black dark:bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-3 w-3 bg-black dark:bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-3 w-3 bg-black dark:bg-white rounded-full animate-bounce"></div>
        </div>
      ) : imageSrc ? (
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Image Preview */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center mb-2">
                <button
                  onClick={() => {
                    setImageSrc(null);
                    setProcessedImageSrc(null);
                    setCanvasReady(false);
                    revalidate();
                  }}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm">Back</span>
                </button>
              </div>

              <canvas
                ref={canvasRef}
                className="w-full rounded-lg max-h-[600px] object-contain"
              ></canvas>

              <Button
                onClick={handleDownloadImage}
                className="mt-2 cursor-pointer flex items-center justify-center gap-2"
              >
                Download
                <FiDownload className="w-4 h-4" />
              </Button>
              <Button
                onClick={handleSaveThumbnail}
                className="flex-1 cursor-pointer flex items-center justify-center gap-2"
                disabled={isUploading}
                variant="outline"
              >
                {isUploading
                  ? `Saving (${uploadProgress}%)`
                  : "Save Thumbnail"}
                <Save className="w-4 h-4" />
              </Button>
            </div>

            {/* Right Column - Editing Controls */}
            <div className="flex flex-col gap-4 md:mt-10">
              <Card>
                <CardContent className="space-y-6 pt-6 pb-2">
                  <div className="space-y-2">
                    <Label htmlFor="text-input">Text</Label>
                    <Input
                      id="text-input"
                      value={text}
                      onChange={handleTextChange}
                      placeholder="Enter text for thumbnail"
                    />
                  </div>

                  <div className="flex justify-between items-center gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="color-picker">Text Color</Label>
                      <Input
                        id="color-picker"
                        type="color"
                        value={textColor}
                        onChange={handleColorChange}
                        className="h-10 cursor-pointer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="font-family">Font Family</Label>
                      <Select
                        value={fontFamily}
                        onValueChange={handleFontFamilyChange}
                        defaultValue="Instrument Serif"
                      >
                        <SelectTrigger id="font-family">
                          <SelectValue placeholder="Select font" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Instrument Serif">
                            Instrument Serif
                          </SelectItem>
                          <SelectItem value="Inter">Inter</SelectItem>
                          <SelectItem value="Manrope">Manrope</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="font-size-slider">Font Size</Label>
                    </div>
                    <Slider
                      id="font-size-slider"
                      min={100}
                      max={1000}
                      step={10}
                      value={[fontSize]}
                      onValueChange={handleFontSizeChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="opacity-slider">Text Opacity</Label>
                      <span className="text-sm text-muted-foreground">
                        {pendingOpacityUpdate !== null
                          ? pendingOpacityUpdate
                          : textOpacity}
                        %
                      </span>
                    </div>
                    <Slider
                      id="opacity-slider"
                      min={0}
                      max={100}
                      step={1}
                      value={[textOpacity]}
                      onValueChange={handleOpacityChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="x-position-slider">X Position</Label>
                      <span className="text-sm text-muted-foreground">
                        {pendingXOffsetUpdate !== null
                          ? pendingXOffsetUpdate
                          : xOffset}
                        %
                      </span>
                    </div>
                    <Slider
                      id="x-position-slider"
                      min={-50}
                      max={50}
                      step={1}
                      value={[xOffset]}
                      onValueChange={handleXOffsetChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="y-position-slider">Y Position</Label>
                      <span className="text-sm text-muted-foreground">
                        {pendingYOffsetUpdate !== null
                          ? pendingYOffsetUpdate
                          : yOffset}
                        %
                      </span>
                    </div>
                    <Slider
                      id="y-position-slider"
                      min={-50}
                      max={50}
                      step={1}
                      value={[yOffset]}
                      onValueChange={handleYOffsetChange}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-instrument-serif tracking-tight text-center">
            Hello! {userName}
          </h1>
          <h2 className="text-md md:text-lg lg:text-lg tracking-tight text-center text-primary-foreground mt-2">
            <RoughNotation type="highlight" show={true} color={theme === "dark" ? "white" : "black"}>

            Get started by creating beautiful thumbnails for your content
            </RoughNotation>
          </h2>
          <div className="mt-6 mb-6 flex flex-col items-center justify-between md:flex-row md:items-start gap-4 ">
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