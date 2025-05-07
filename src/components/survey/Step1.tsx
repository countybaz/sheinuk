
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SurveyHeader from "@/components/SurveyHeader";
import SurveyOption from "@/components/SurveyOption";
import { useSurvey } from "@/contexts/SurveyContext";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Step1 = () => {
  const { goToNextStep, setAnswer } = useSurvey();
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleNext = () => {
    if (selected) {
      setAnswer("uk_resident", selected);
      
      if (selected === "no") {
        // Redirect to the standalone rejection page
        navigate("/rejection");
      } else {
        goToNextStep();
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <SurveyHeader 
        title=""
        subtitle="We need some information to get started."
      />
      
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">Do you live in the United Kingdom?</h2>
        <p className="text-sm text-gray-600 mb-4">We are looking for participants from the UK only</p>
        <div className="space-y-3">
          <SurveyOption 
            label="Yes" 
            selected={selected === "yes"} 
            onClick={() => setSelected("yes")}
          />
          <SurveyOption 
            label="No" 
            selected={selected === "no"} 
            onClick={() => setSelected("no")}
          />
        </div>
      </div>

      <div className={`${isMobile ? "sticky bottom-4 z-20" : ""}`}>
        <Button 
          onClick={handleNext} 
          disabled={!selected}
          className={`w-full py-5 transition-all duration-300 ${
            isMobile 
              ? 'bg-pink-500 hover:bg-pink-600 text-white font-bold shadow-lg border-2 border-white' 
              : 'bg-pink-600 hover:bg-pink-700'
          }`}
        >
          Continue
        </Button>
        
        {isMobile && selected && (
          <div className="absolute -inset-1 bg-pink-100 rounded-lg -z-10 blur-sm opacity-70"></div>
        )}
      </div>
    </div>
  );
};

export default Step1;
