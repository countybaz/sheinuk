
import { Button } from "@/components/ui/button";
import SurveyHeader from "@/components/SurveyHeader";
import { useSurvey } from "@/contexts/SurveyContext";
import { ArrowRight } from "lucide-react";
import FacebookReviews from "@/components/FacebookReviews";
import { useIsMobile } from "@/hooks/use-mobile";

const StartScreen = () => {
  const { goToNextStep } = useSurvey();
  const isMobile = useIsMobile();
  
  const handleStart = () => {
    goToNextStep();
  };
  
  return (
    <div className="max-w-md mx-auto">
      <SurveyHeader title="Great news! You are among the first to join our Shein Review Scheme!" />
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <p className="text-center text-lg mb-4">
          Claim a <span className="text-pink-600 font-semibold">$750 Shein Gift Card</span> by participating in our exclusive Shein Review Scheme. Simply share your shopping experience in our quick 5-minute survey!
        </p>
        
        <p className="text-center mb-6">
          Ready to take your fashion shopping to the next level? Click the <span className="text-pink-600 font-semibold">Start</span> button below
        </p>
        
        <p className="text-sm text-red-600 text-center font-medium mb-6">
          As soon as you click the button, a timer starts and you have 3 minutes to complete the process.
        </p>
      </div>

      <div className={`${isMobile ? "sticky bottom-4 z-20" : ""}`}>
        <Button 
          onClick={handleStart} 
          className={`w-full py-6 text-lg transition-all duration-300 ${
            isMobile 
              ? 'bg-pink-500 hover:bg-pink-600 shadow-lg text-white font-bold tracking-wider uppercase border-2 border-white' 
              : 'bg-pink-600 hover:bg-pink-700'
          }`}
        >
          Start <ArrowRight className="ml-2" />
        </Button>
        
        {isMobile && (
          <div className="absolute -inset-1 bg-pink-100 rounded-lg -z-10 blur-sm opacity-70"></div>
        )}
      </div>

      {/* Facebook Review Section - kept in the start screen */}
      <FacebookReviews />

      {/* Add some space at the bottom */}
      <div className="h-10"></div>
    </div>
  );
};

export default StartScreen;
