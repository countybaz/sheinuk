
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSurvey } from "@/contexts/SurveyContext";
import ProductOffer from "@/components/ProductOffer";
import SurveyHeader from "@/components/SurveyHeader";
import { useToast } from "@/components/ui/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useIsMobile } from "@/hooks/use-mobile";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";

// Tracking URL
const TRACKING_URL = "https://glstrck.com/aff_c?offer_id=1285&aff_id=25969";

// Newly uploaded Shein gift card image
const SHEIN_GIFT_CARD_IMAGE = "/lovable-uploads/d1653529-230b-48c5-b241-efce260ff6ec.png";

// External placeholder images with lower quality and optimized size
const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&q=50&w=240", // Low quality, smaller size - clothing related
  "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&q=50&w=240"  // Low quality, smaller size - fashion related
];

const Results = () => {
  const { answers } = useSurvey();
  const { toast } = useToast();
  const [showingOffer, setShowingOffer] = useState(false);
  const [giftCardImage, setGiftCardImage] = useState<string>(SHEIN_GIFT_CARD_IMAGE);
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
    img.src = SHEIN_GIFT_CARD_IMAGE;
    
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
            subtitle="Continue to the next step to receive your £750 Shein Gift Card:"
            className="mb-4"
          />
          
          <div className="mb-4 space-y-3">
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <div className="w-full">
                <AspectRatio ratio={16/9} className="max-h-40 sm:max-h-48">
                  {!imageLoaded ? (
                    <Skeleton className="w-full h-full rounded-md" />
                  ) : (
                    <img 
                      src={giftCardImage} 
                      alt="Shein Gift Card" 
                      className="rounded-md object-contain w-full h-full" 
                      loading="eager"
                      width={isMobile ? "240" : "280"}
                      height={isMobile ? "135" : "158"}
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
            
            {/* Pink promotional text - improved mobile padding */}
            <div className="text-center px-2 py-2 bg-pink-50 rounded-lg border border-pink-100">
              <p className={`text-pink-600 font-medium ${isMobile ? 'text-sm' : 'text-base'}`}>
                Upgrade your wardrobe with stylish fashion! Get a £750 Shein Gift Card when you reach the end of the survey!
              </p>
            </div>
          </div>
          
          {/* Enhanced CTA button for better mobile visibility - Updated to green with pulse animation */}
          <div className={`${isMobile ? "sticky bottom-4 z-20 mt-4" : ""} pb-2`}>
            <a 
              href={TRACKING_URL}
              target="_blank" 
              rel="noopener noreferrer" 
              className="block w-full"
            >
              <Button 
                className={`w-full py-6 text-lg ${isMobile ? 
                  'shadow-lg bg-green-500 hover:bg-green-600 text-white font-bold border-2 border-white uppercase tracking-wider pulse' : 
                  'bg-green-600 hover:bg-green-700'} transition-colors duration-200`}
              >
                CONTINUE <ArrowRight className="ml-2 animate-bounce" size={24} />
              </Button>
            </a>
            {isMobile && (
              <div className="absolute -inset-1 bg-green-100 rounded-lg -z-10 blur-sm opacity-70"></div>
            )}
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
