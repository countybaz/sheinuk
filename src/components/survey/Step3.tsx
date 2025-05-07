
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SurveyHeader from "@/components/SurveyHeader";
import SurveyOption from "@/components/SurveyOption";
import { useSurvey } from "@/contexts/SurveyContext";
import { useIsMobile } from "@/hooks/use-mobile";

const Step3 = () => {
  const { goToNextStep, setAnswer } = useSurvey();
  const [selected, setSelected] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const handleNext = () => {
    if (selected) {
      setAnswer("shein_staff", selected);
      goToNextStep();
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <SurveyHeader 
        title=""
        subtitle="We're making progress!"
      />
      
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">Do you find the Shein customer service helpful?</h2>
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

export default Step3;
