
import { Button } from "@/components/ui/button";
import SurveyHeader from "@/components/SurveyHeader";
import { useSurvey } from "@/contexts/SurveyContext";
import { ArrowRight } from "lucide-react";
import FacebookReviews from "@/components/FacebookReviews";
const StartScreen = () => {
  const {
    goToNextStep
  } = useSurvey();
  const handleStart = () => {
    goToNextStep();
  };
  return <div className="max-w-md mx-auto">
      <SurveyHeader title="Great news! You are among the first to join our Ultimate Costco Program!" />
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <p className="text-center text-lg mb-4">
          Claim a <span className="text-blue-800 font-semibold">$500 Costco Gift Card</span> by participating in our exclusive Ultimate Costco Program. Simply share your shopping experience in our quick 3-question survey!
        </p>
        
        <p className="text-center mb-6">
          Join thousands of satisfied customers who've already received their rewards. It only takes a minute!
        </p>
        
        <p className="text-sm text-red-600 text-center font-medium mb-6">
          As soon as you click the button, a timer starts and you have 3 minutes to complete the process.
        </p>
      </div>

      <Button onClick={handleStart} className="w-full bg-blue-800 hover:bg-blue-900 text-lg py-6">
        Start <ArrowRight className="ml-2" />
      </Button>

      {/* Facebook Review Section - kept in the start screen */}
      <FacebookReviews />

      {/* Add some space at the bottom */}
      <div className="h-10"></div>
    </div>;
};
export default StartScreen;
