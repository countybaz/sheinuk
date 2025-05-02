
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SurveyHeader from "@/components/SurveyHeader";
import SurveyOption from "@/components/SurveyOption";
import { useSurvey } from "@/contexts/SurveyContext";

const Step2 = () => {
  const { goToNextStep, setAnswer } = useSurvey();
  const [selected, setSelected] = useState<string | null>(null);

  const handleNext = () => {
    if (selected) {
      setAnswer("costco_variety", selected);
      goToNextStep();
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <SurveyHeader 
        title=""
        subtitle="Just a few more questions to go!"
      />
      
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">Are you satisfied with the product variety at Costco?</h2>
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

      <Button 
        onClick={handleNext} 
        disabled={!selected}
        className="w-full bg-blue-800 hover:bg-blue-900"
      >
        Continue
      </Button>
    </div>
  );
};

export default Step2;
