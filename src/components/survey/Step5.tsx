
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import SurveyHeader from "@/components/SurveyHeader";
import { useSurvey } from "@/contexts/SurveyContext";
import { Check } from "lucide-react";

const Step5 = () => {
  const { goToNextStep } = useSurvey();
  const [checks, setChecks] = useState({
    saved: false,
    eligible: false,
    rewards: false,
    reserved: false
  });

  useEffect(() => {
    // Stagger the animations with clear timing
    const timers = [
      setTimeout(() => setChecks(prev => ({ ...prev, saved: true })), 1000),
      setTimeout(() => setChecks(prev => ({ ...prev, eligible: true })), 2000),
      setTimeout(() => setChecks(prev => ({ ...prev, rewards: true })), 3000),
      setTimeout(() => setChecks(prev => ({ ...prev, reserved: true })), 4000)
    ];

    // Fixed timing: Auto-progress only after the last check is complete and visible
    const autoProgress = setTimeout(() => {
      // Ensure all checks are visible before proceeding
      setChecks({
        saved: true,
        eligible: true,
        rewards: true,
        reserved: true
      });
      // Add a small delay to ensure the last check is fully visible
      setTimeout(() => goToNextStep(), 500);
    }, 5000);

    return () => {
      timers.forEach(timer => clearTimeout(timer));
      clearTimeout(autoProgress);
    };
  }, [goToNextStep]);

  return (
    <div className="max-w-md mx-auto">
      <SurveyHeader 
        title="Thanks for your time!" 
        subtitle="Please wait a few seconds while we process your responses."
      />
      
      <div className="space-y-4 mb-8">
        <div className="flex items-center">
          <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${checks.saved ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
            {checks.saved && <Check className="w-4 h-4" />}
          </div>
          <p className="text-lg">Survey responses are saved</p>
        </div>
        
        <div className="flex items-center">
          <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${checks.eligible ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
            {checks.eligible && <Check className="w-4 h-4" />}
          </div>
          <p className="text-lg">You are an eligible participant</p>
        </div>
        
        <div className="flex items-center">
          <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${checks.rewards ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
            {checks.rewards && <Check className="w-4 h-4" />}
          </div>
          <p className="text-lg">Only 15 Rewards left</p>
        </div>
        
        <div className="flex items-center">
          <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center transition-colors duration-200 ${checks.reserved ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
            {checks.reserved && <Check className="w-4 h-4 transition-opacity duration-150" />}
          </div>
          <p className="text-lg">Your place is reserved until the timer runs out</p>
        </div>
      </div>

      <div className="w-full bg-gray-100 rounded-md h-2 mt-6">
        <div className="bg-green-600 h-2 rounded-md animate-pulse"></div>
      </div>
      
      <p className="text-center text-sm text-gray-500 mt-2">Processing your information...</p>
    </div>
  );
};

export default Step5;
