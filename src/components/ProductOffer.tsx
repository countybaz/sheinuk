import { Button } from "@/components/ui/button";
import Timer from "@/components/Timer";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductOfferProps {
  onClaim: () => void;
}

// Define guaranteed working fallback image with quality parameter
const COSTCO_GIFT_CARD_IMAGE = "/lovable-uploads/90aa05f7-e6fa-4638-858e-dbd4f05050f0.png";
// Additional fallback from Unsplash with optimized load time
const UNSPLASH_FALLBACK = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&q=50&w=300";

const ProductOffer = ({ onClaim }: ProductOfferProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Preload the fallback image immediately on component mount
  useEffect(() => {
    // Try loading both fallback options
    const unsplashFallback = new Image();
    unsplashFallback.src = UNSPLASH_FALLBACK;
    
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = COSTCO_GIFT_CARD_IMAGE;
    
    // Set a shorter timeout for faster display
    const timeout = setTimeout(() => {
      setImageLoaded(true);
    }, 1000); // Reduced from 2000ms to 1000ms
    
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <div className="border border-gray-200 rounded-lg shadow-lg p-6 max-w-md mx-auto bg-white">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">Congratulations!</h3>
        <p className="text-red-600 font-medium">You've qualified for our special Costco offer!</p>
      </div>

      <div className="mb-6">
        {/* Display the selected image with optimizations */}
        <div className="w-full h-48 relative rounded-md overflow-hidden">
          {!imageLoaded ? (
            <Skeleton className="w-full h-full absolute inset-0 rounded-md" />
          ) : null}
          <img 
            src={COSTCO_GIFT_CARD_IMAGE} 
            alt="Costco $500 Gift Card" 
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
              // Try Unsplash fallback
              const unsplashFallback = new Image();
              unsplashFallback.onload = () => {
                const img = document.querySelector('img') as HTMLImageElement;
                if (img) {
                  img.src = UNSPLASH_FALLBACK;
                  setImageLoaded(true);
                }
              };
              unsplashFallback.onerror = () => {
                // If Unsplash fails too, just mark as loaded
                setImageLoaded(true);
              };
              unsplashFallback.src = UNSPLASH_FALLBACK;
            }}
          />
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-bold text-lg mb-2">Costco $500 Gift Card</h4>
        <div className="flex items-center mb-1">
          <Check className="h-4 w-4 text-red-500 mr-2" />
          <span className="text-gray-700">Valid at any Costco location</span>
        </div>
        <div className="flex items-center mb-1">
          <Check className="h-4 w-4 text-red-500 mr-2" />
          <span className="text-gray-700">Shop groceries, electronics, and more</span>
        </div>
        <div className="flex items-center mb-1">
          <Check className="h-4 w-4 text-red-500 mr-2" />
          <span className="text-gray-700">No expiration date</span>
        </div>
      </div>

      <div className="mb-6 text-center">
        <div className="flex items-center justify-center">
          <span className="text-gray-500 line-through text-lg mr-2">$499.99</span>
          <span className="text-2xl font-bold text-red-600">$0.00</span>
        </div>
        <p className="text-blue-800 font-medium text-sm mt-1">+ FREE Delivery</p>
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
