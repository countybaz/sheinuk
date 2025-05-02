
import { Button } from "@/components/ui/button";
import Timer from "@/components/Timer";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductOfferProps {
  onClaim: () => void;
}

// Define guaranteed working fallback image
const DOLLAR_TREE_GIFT_CARD_IMAGE = "/lovable-uploads/90aa05f7-e6fa-4638-858e-dbd4f05050f0.png";
// Additional fallback from Unsplash with optimized load time parameters
const UNSPLASH_FALLBACK = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&q=50&w=300";

const ProductOffer = ({ onClaim }: ProductOfferProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isMobile = useIsMobile();
  
  // Enhanced image preloading with faster display
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.fetchPriority = "high";
    img.src = DOLLAR_TREE_GIFT_CARD_IMAGE;
    
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
        <p className="text-red-600 font-medium">You've qualified for our special Dollar Tree offer!</p>
      </div>

      <div className="mb-6">
        {/* Mobile-optimized image display with faster loading */}
        <div className="w-full h-40 sm:h-48 relative rounded-md overflow-hidden">
          {!imageLoaded ? (
            <Skeleton className="w-full h-full absolute inset-0 rounded-md" />
          ) : null}
          <img 
            src={DOLLAR_TREE_GIFT_CARD_IMAGE} 
            alt="Dollar Tree $500 Gift Card" 
            className={`w-full h-full object-contain rounded-md ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.1s' }} // Faster transition
            width={isMobile ? "280" : "300"}
            height={isMobile ? "160" : "192"}
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
        <h4 className="font-bold text-lg mb-2">Dollar Tree $500 Gift Card</h4>
        <div className="flex items-center mb-1">
          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
          <span className="text-gray-700">Valid at any Dollar Tree location</span>
        </div>
        <div className="flex items-center mb-1">
          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
          <span className="text-gray-700">Shop household items, snacks, and more</span>
        </div>
        <div className="flex items-center mb-1">
          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
          <span className="text-gray-700">No expiration date</span>
        </div>
      </div>

      <div className="mb-6 text-center">
        <div className="flex items-center justify-center">
          <span className="text-gray-500 line-through text-lg mr-2">$499.99</span>
          <span className="text-2xl font-bold text-green-600">$0.00</span>
        </div>
        <p className="text-green-800 font-medium text-sm mt-1">+ FREE Delivery</p>
      </div>

      <Timer minutes={15} />

      <Button 
        onClick={onClaim} 
        className={`w-full py-6 text-lg bg-green-600 hover:bg-green-700 ${isMobile ? 'mt-4' : 'mt-2'}`}
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
