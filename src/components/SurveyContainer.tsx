
import { useEffect } from "react";
import { useSurvey } from "@/contexts/SurveyContext";
import SurveyProgress from "@/components/SurveyProgress";
import StartScreen from "@/components/survey/StartScreen";
import Step1 from "@/components/survey/Step1";
import Step2 from "@/components/survey/Step2";
import Step3 from "@/components/survey/Step3";
import Step5 from "@/components/survey/Step5";
import Results from "@/components/survey/Results";
import RejectionPage from "@/components/survey/RejectionPage";
import Timer from "@/components/Timer";
import FacebookReviews from "@/components/FacebookReviews";
import { useIsMobile } from "@/hooks/use-mobile";

const SurveyContainer = () => {
  const { currentStep, totalSteps } = useSurvey();
  const isMobile = useIsMobile();

  // Scroll to top when step changes with smooth scrolling
  useEffect(() => {
    window.scrollTo({ 
      top: 0, 
      behavior: "smooth" 
    });
  }, [currentStep]);

  return (
    <div className={`w-full mx-auto px-3 sm:px-4 py-4 sm:py-8 ${isMobile ? 'max-w-[95%]' : 'max-w-lg'}`}>
      {/* Timer only visible during active survey steps (not on start screen) */}
      {currentStep > 0 && currentStep <= totalSteps && <Timer minutes={3} />}
      
      {/* Progress bar only shown during active survey steps */}
      {currentStep > 0 && currentStep <= totalSteps && (
        <SurveyProgress currentStep={currentStep} totalSteps={totalSteps} />
      )}
      
      {/* Survey steps */}
      {currentStep === 0 && <StartScreen />}
      {currentStep === 1 && <Step1 />}
      {currentStep === 2 && <Step2 />}
      {currentStep === 3 && <Step3 />}
      {currentStep === 4 && <Step5 />}
      {currentStep === 5 && <Results />}
      {currentStep === 6 && <RejectionPage />}
      
      {/* Facebook Reviews - shown in all steps except start screen and rejection page */}
      {currentStep !== 0 && currentStep !== 6 && <FacebookReviews />}
      
      {/* Extra padding at the bottom for mobile to prevent content from being hidden by browser UI */}
      {isMobile && <div className="h-16"></div>}
    </div>
  );
};

export default SurveyContainer;
