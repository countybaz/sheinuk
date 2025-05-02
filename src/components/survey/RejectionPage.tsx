
import { Button } from "@/components/ui/button";
import SurveyHeader from "@/components/SurveyHeader";
import { useSurvey } from "@/contexts/SurveyContext";
import { RefreshCw } from "lucide-react";
import FAQ from "@/components/FAQ";

const RejectionPage = () => {
  const { goToStep } = useSurvey();
  
  const handleTryAgain = () => {
    goToStep(0); // Go to the start screen
  };
  
  const handleLogoClick = () => {
    goToStep(0); // Go to the start screen when logo is clicked
  };
  
  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center justify-center cursor-pointer mb-6" onClick={handleLogoClick}>
        <img 
          src="/lovable-uploads/91fcee7b-309a-4089-88bf-5e8f451e786b.png" 
          alt="Dollar Tree Scheme Logo" 
          className="h-16 mr-4"
        />
        <h1 className="text-xl font-bold text-green-600">Dollar Tree Scheme</h1>
        <div className="ml-4">
          <FAQ />
        </div>
      </div>
      
      <SurveyHeader 
        title="We're sorry"
        subtitle="Based on your quiz answers, you are not suitable for the requirements of this campaign."
      />
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <p className="text-center mb-6">
          If you think you made a mistake and want to retake the quiz, click the button below:
        </p>
      </div>

      <Button 
        onClick={handleTryAgain} 
        className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
      >
        Try Again <RefreshCw className="ml-2" size={20} />
      </Button>
    </div>
  );
};

export default RejectionPage;
