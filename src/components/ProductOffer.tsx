
import { Button } from "@/components/ui/button";
import Timer from "@/components/Timer";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductOfferProps {
  onClaim: () => void;
}

// Define new gift card image path
const SHEIN_GIFT_CARD_IMAGE = "/lovable-uploads/d1653529-230b-48c5-b241-efce260ff6ec.png";
// Additional fallback from Unsplash with optimized load time parameters
const UNSPLASH_FALLBACK = "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&q=50&w=300";

const ProductOffer = ({ onClaim }: ProductOfferProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isMobile = useIsMobile();
  
  // Enhanced image preloading with faster display
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.fetchPriority = "high";
    img.src = SHEIN_GIFT_CARD_IMAGE;
    
    // Shorter timeout for faster display
    const timeout = setTimeout(() => {
      setImageLoaded(true);
    }, 600); // Reduced from 1000ms to 600ms
    
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <div className="border border-gray-200 rounded-lg shadow-lg p-4 sm:p-6 max-w-md mx-auto bg-white">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">Congratulations!</h3>
        <p className="text-pink-600 font-medium">You've qualified for our special Shein offer!</p>
      </div>

      <div className="mb-6">
        {/* Mobile-optimized image display with faster loading */}
        <div className="w-full h-40 sm:h-48 relative rounded-md overflow-hidden">
          {!imageLoaded ? (
            <Skeleton className="w-full h-full absolute inset-0 rounded-md" />
          ) : null}
          <img 
            src={SHEIN_GIFT_CARD_IMAGE} 
            alt="Shein £750 Gift Card" 
            className={`w-full h-full object-contain rounded-md ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.1s' }} // Faster transition
            width={isMobile ? "240" : "300"}
            height={isMobile ? "135" : "169"}
            loading="eager"
            fetchPriority="high"
            crossOrigin="anonymous"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              // Fall back to Unsplash image
              const fallbackImg = document.querySelector('img') as HTMLImageElement;
              if (fallbackImg) {
                fallbackImg.src = UNSPLASH_FALLBACK;
                setImageLoaded(true);
              }
            }}
          />
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-bold text-lg mb-2">Shein £750 Gift Card</h4>
        <div className="flex items-center mb-1">
          <Check className="h-4 w-4 text-pink-500 mr-2 flex-shrink-0" />
          <span className="text-gray-700">Valid on Shein's website and app</span>
        </div>
        <div className="flex items-center mb-1">
          <Check className="h-4 w-4 text-pink-500 mr-2 flex-shrink-0" />
          <span className="text-gray-700">Shop clothing, accessories, and home decor</span>
        </div>
        <div className="flex items-center mb-1">
          <Check className="h-4 w-4 text-pink-500 mr-2 flex-shrink-0" />
          <span className="text-gray-700">No expiration date</span>
        </div>
      </div>

      <div className="mb-6 text-center">
        <div className="flex items-center justify-center">
          <span className="text-gray-500 line-through text-lg mr-2">£750.00</span>
          <span className="text-2xl font-bold text-pink-600">£0.00</span>
        </div>
        <p className="text-pink-800 font-medium text-sm mt-1">+ FREE Delivery</p>
      </div>

      <Timer minutes={15} />

      <div className={`${isMobile ? "sticky bottom-4 z-20 mt-4" : ""}`}>
        <Button 
          onClick={onClaim} 
          className={`w-full py-6 text-lg ${isMobile ? 
            'shadow-lg bg-green-500 hover:bg-green-600 text-white font-bold uppercase tracking-wider border-2 border-white' : 
            'bg-green-600 hover:bg-green-700'} transition-colors duration-200`}
        >
          CONTINUE
        </Button>
        
        {isMobile && (
          <div className="absolute -inset-1 bg-green-100 rounded-lg -z-10 blur-sm opacity-70"></div>
        )}
      </div>

      <p className="text-xs text-center text-gray-500 mt-4">
        Limited quantity available. Offer valid while supplies last.
      </p>
    </div>
  );
};

export default ProductOffer;
