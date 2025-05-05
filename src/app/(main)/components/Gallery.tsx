"use client";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Download } from "lucide-react";
import { fetchThumbnails } from "@/app/actions/generate"; // Import your server action

interface Thumbnail {
  id: string;
  url: string;
  createdAt: string | Date;
  name?: string;
  key?: string;
}

const Gallery = () => {
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedThumbnail, setSelectedThumbnail] = useState<Thumbnail | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const getThumbnails = async () => {
      try {
        setIsLoading(true);
        const result = await fetchThumbnails();

        if (!result.success) {
          throw new Error(result.message || "Failed to fetch thumbnails");
        }

        if (result.thumbnails && Array.isArray(result.thumbnails)) {
          setThumbnails(result.thumbnails);
        } else {
          setThumbnails([]);
        }
      } catch (err) {
        console.error("Error fetching thumbnails:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    getThumbnails();
  }, []);

  const handleThumbnailClick = (thumbnail: Thumbnail) => {
    setSelectedThumbnail(thumbnail);
    setIsDialogOpen(true);
  };

  const formatDate = (dateValue: Date | string): string => {
    const date = dateValue instanceof Date ? dateValue : new Date(dateValue);

    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="flex flex-col mt-4 min-h-screen w-full py-12 md:py-24 px-4 tracking-tight">
      <div className="w-full mb-12">
        <h1 className="text-3xl md:text-4xl">Your Recent Thumbnails</h1>
      </div>
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64 w-full">
          <div className="h-10 w-10 rounded-full border-4 border-primary-foreground border-t-primary animate-spin mb-4"></div>
          <p className="text-muted-foreground">Loading your thumbnails...</p>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {error ? (
              <div className="col-span-full text-center text-red-500">
                Error: {error}
              </div>
            ) : thumbnails && thumbnails.length > 0 ? (
              thumbnails.map((thumbnail) => (
                <Card
                  key={thumbnail.id}
                  className="w-full h-67 flex items-center justify-center relative overflow-hidden cursor-pointer group shadow-lg"
                  onClick={() => handleThumbnailClick(thumbnail)}
                >
                  <img
                    src={thumbnail.url}
                    alt={`Thumbnail ${thumbnail.id}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white text-sm">Click to view</p>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">
                  No thumbnails found. Create some to see them here.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {`Thumbnail ${selectedThumbnail?.id?.substring(0, 8)}`}
            </AlertDialogTitle>
          </AlertDialogHeader>

          {selectedThumbnail && (
            <div className="space-y-4">
              <div className="w-full h-64 overflow-hidden rounded-md border">
                <img
                  src={selectedThumbnail.url}
                  alt={`Thumbnail ${selectedThumbnail.id}`}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-2">
                <div className="grid grid-cols-3 text-sm">
                  <span className="text-muted-foreground">Created:</span>
                  <span className="col-span-2">
                    {formatDate(selectedThumbnail.createdAt)}
                  </span>
                </div>

                <div className="grid grid-cols-3 text-sm">
                  <span className="text-muted-foreground">ID:</span>
                  <span
                    className="col-span-2 truncate"
                    title={selectedThumbnail.id}
                  >
                    {selectedThumbnail.id}
                  </span>
                </div>
              </div>
            </div>
          )}

          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="cursor-pointer">Close</AlertDialogCancel>
            <AlertDialogAction asChild>
              <a
                href={selectedThumbnail?.url}
                download={
                  selectedThumbnail?.name ||
                  `thumbnail-${selectedThumbnail?.id?.substring(0, 8)}`
                }
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
                onClick={(e) => e.stopPropagation()}
              >
                <Download size={16} />
                Download
              </a>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default Gallery;