
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSurvey } from "@/contexts/SurveyContext";
import ProductOffer from "@/components/ProductOffer";
import SurveyHeader from "@/components/SurveyHeader";
import { useToast } from "@/components/ui/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import IPhoneImageFetcher from "@/components/IPhoneImageFetcher";
import { useIsMobile } from "@/hooks/use-mobile";
import { Skeleton } from "@/components/ui/skeleton";

// Define fallback image path with low quality parameters
const COSTCO_GIFT_CARD_IMAGE = "/lovable-uploads/73921274-7afe-4bc3-9ae2-83873c2f871a.png?q=30&w=300";

// External placeholder images with low quality
const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1498936178812-4b2e558d2937?auto=format&q=50&w=240", // Low quality, smaller size
  "https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&q=50&w=240"  // Low quality, smaller size
];

const Results = () => {
  const { answers } = useSurvey();
  const { toast } = useToast();
  const [showingOffer, setShowingOffer] = useState(false);
  const [giftCardImage, setGiftCardImage] = useState<string>(COSTCO_GIFT_CARD_IMAGE);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isMobile = useIsMobile();

  // Pre-load the gift card image immediately when component mounts
  useEffect(() => {
    // Start loading the gift card image
    const img = new Image();
    
    img.onload = () => {
      setImageLoaded(true);
    };
    
    // Set src after attaching onload handlers
    img.src = COSTCO_GIFT_CARD_IMAGE;
    
    // Mark as loaded after a short timeout to avoid waiting too long
    const timeout = setTimeout(() => {
      setImageLoaded(true);
    }, 800); // Short timeout for faster display
    
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
            subtitle="Continue to the next step to receive your Costco Gift Card:"
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
                      alt="Costco $500 Gift Card" 
                      className="rounded-md object-contain w-full h-full" 
                      loading="eager"
                      width="300"
                      height="169"
                      fetchPriority="high"
                      crossOrigin="anonymous"
                      decoding="async"
                      onLoad={() => setImageLoaded(true)}
                      onError={() => {
                        // If error, try placeholder image
                        const imgPlaceholder = document.createElement('img');
                        imgPlaceholder.onload = () => setImageLoaded(true);
                        imgPlaceholder.src = PLACEHOLDER_IMAGES[0];
                        setGiftCardImage(PLACEHOLDER_IMAGES[0]);
                      }}
                    />
                  )}
                </AspectRatio>
              </div>
            </div>
            
            {/* Blue promotional text */}
            <div className="text-center px-3 py-2 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-blue-600 font-medium text-sm">
                Upgrade your inventory and Cash in! A Costco $500 Gift Card when you reach the end of the survey!
              </p>
            </div>
          </div>
          
          {/* Fixed CTA button for mobile */}
          <div className={isMobile ? "sticky bottom-4 z-10 mt-4" : ""}>
            <a 
              href="https://unlockrwrd.com/Jp6DC41Fn" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block w-full"
            >
              <Button 
                className={`w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg animate-pulse ${isMobile ? 'shadow-lg' : ''}`}
              >
                Continue
              </Button>
            </a>
          </div>
          
          <p className="text-sm text-center text-gray-500 mt-4 pb-16">
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
