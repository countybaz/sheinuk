
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSurvey } from "@/contexts/SurveyContext";
import ProductOffer from "@/components/ProductOffer";
import SurveyHeader from "@/components/SurveyHeader";
import { useToast } from "@/components/ui/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useIsMobile } from "@/hooks/use-mobile";
import { Skeleton } from "@/components/ui/skeleton";

// Define main image path for the Dollar Tree gift card
const DOLLAR_TREE_GIFT_CARD_IMAGE = "/lovable-uploads/39ce19a4-ca1e-49e7-865f-6bd020b9c9af.png";

// External placeholder images with lower quality and optimized size
const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1498936178812-4b2e558d2937?auto=format&q=50&w=240", // Low quality, smaller size
  "https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&q=50&w=240"  // Low quality, smaller size
];

const Results = () => {
  const { answers } = useSurvey();
  const { toast } = useToast();
  const [showingOffer, setShowingOffer] = useState(false);
  const [giftCardImage, setGiftCardImage] = useState<string>(DOLLAR_TREE_GIFT_CARD_IMAGE);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isMobile = useIsMobile();

  // Improved image loading with immediate initialization and shorter timeout
  useEffect(() => {
    // Pre-load the image when component mounts
    const img = new Image();
    
    img.onload = () => {
      setImageLoaded(true);
    };
    
    // Set loading priority and src after attaching onload handler
    img.fetchPriority = "high";
    img.src = DOLLAR_TREE_GIFT_CARD_IMAGE;
    
    // Shorter timeout for faster display fallback
    const timeout = setTimeout(() => {
      setImageLoaded(true);
    }, 600); // Even shorter timeout for faster display
    
    return () => clearTimeout(timeout);
  }, []);

  const handleClaim = () => {
    toast({
      title: "Offer Claimed!",
      description: "Thank you! Check your email for next steps.",
      duration: 5000,
    });
  };

  return (
    <div className="max-w-md mx-auto px-4">
      {!showingOffer ? (
        <>
          <SurveyHeader 
            title="Congratulations!" 
            subtitle="Continue to the next step to receive your Dollar Tree Gift Card:"
            className="mb-4"
          />
          
          <div className="mb-4 space-y-3">
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <div className="w-full">
                <AspectRatio ratio={16/9}>
                  {!imageLoaded ? (
                    <Skeleton className="w-full h-full rounded-md" />
                  ) : (
                    <img 
                      src={giftCardImage} 
                      alt="Dollar Tree Gift Card" 
                      className="rounded-md object-contain w-full h-full" 
                      loading="eager"
                      width={isMobile ? "280" : "300"}
                      height={isMobile ? "158" : "169"}
                      fetchPriority="high"
                      crossOrigin="anonymous"
                      decoding="async"
                      onLoad={() => setImageLoaded(true)}
                      onError={() => {
                        // If error, try placeholder image
                        setGiftCardImage(PLACEHOLDER_IMAGES[0]);
                        setImageLoaded(true);
                      }}
                    />
                  )}
                </AspectRatio>
              </div>
            </div>
            
            {/* Green promotional text - improved mobile padding */}
            <div className="text-center px-2 py-2 bg-green-50 rounded-lg border border-green-100">
              <p className={`text-green-600 font-medium ${isMobile ? 'text-sm' : 'text-base'}`}>
                Upgrade your shopping experience! A Dollar Tree Gift Card when you reach the end of the survey!
              </p>
            </div>
          </div>
          
          {/* Improved CTA button for mobile with sticky positioning and updated URL */}
          <div className={isMobile ? "sticky bottom-4 z-10 mt-4" : ""}>
            <a 
              href="https://unlockrwrd.com/l37ECYyFM" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block w-full"
            >
              <Button 
                className={`w-full bg-green-600 hover:bg-green-700 py-6 text-lg animate-pulse ${isMobile ? 'shadow-lg' : ''}`}
              >
                Continue
              </Button>
            </a>
          </div>
          
          <p className={`text-sm text-center text-gray-500 mt-4 ${isMobile ? 'pb-20' : 'pb-16'}`}>
            Limited time offer. Your reward is reserved for the time shown in the timer.
          </p>
        </>
      ) : (
        <ProductOffer onClaim={handleClaim} />
      )}
    </div>
  );
};

export default Results;
