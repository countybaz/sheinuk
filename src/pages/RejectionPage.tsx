
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const RejectionPage = () => {
  const navigate = useNavigate();
  const [logoLoaded, setLogoLoaded] = useState(false);
  
  // Preload the logo image
  useEffect(() => {
    const img = new Image();
    img.onload = () => setLogoLoaded(true);
    img.src = "/lovable-uploads/92df31cc-3da1-4ac0-abdd-86b665018903.png";
  }, []);
  
  const handleTryAgain = () => {
    // Navigate back to the main page
    navigate("/");
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="shadow-sm py-2 bg-black text-white h-24 flex items-center">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <img 
            src="/lovable-uploads/92df31cc-3da1-4ac0-abdd-86b665018903.png" 
            alt="Shein Review Scheme Logo" 
            className={`h-20 md:h-24 mr-4 ${logoLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.3s' }}
            loading="eager"
            fetchPriority="high"
            onLoad={() => setLogoLoaded(true)}
          />
          <h1 className="text-xl font-bold text-white">Shein Review Scheme</h1>
        </div>
      </header>
      
      <main className="container mx-auto py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">We're sorry</h1>
            <p className="text-gray-600">
              Based on your quiz answers, you are not suitable for the requirements of this campaign.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <p className="text-center mb-6">
              If you think you made a mistake and want to retake the quiz, click the button below:
            </p>
          </div>

          <Button 
            onClick={handleTryAgain} 
            className="w-full bg-pink-600 hover:bg-pink-700 text-lg py-6"
          >
            Try Again <RefreshCw className="ml-2" size={20} />
          </Button>
        </div>
      </main>
      
      <footer className="bg-black text-white border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          {/* Legal Links Section - Header stands out, links are Apple-style */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-white bg-gray-800 inline-block px-4 py-2 rounded-md">Legal Links</h3>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/terms" className="text-pink-400 hover:underline">Terms and Conditions</Link>
              <Link to="/privacy" className="text-pink-400 hover:underline">Privacy Policy</Link>
              <Link to="/non-affiliation" className="text-pink-400 hover:underline">Non-Affiliation Disclaimer</Link>
            </div>
          </div>
          
          {/* Legal Disclaimers */}
          <div className="text-xs text-gray-300 space-y-2">
            <p>Trade names or rights associated with all trademarks on this website are the property of their respective owners and are not associated with this promotion. This offer ends at the end of 2025.</p>
            <p>This website is not part of the Facebook website or of Facebook Inc.</p>
            <p>Furthermore, this website is not endorsed in any way by Facebook. Facebook is a trademark of Facebook, Inc.</p>
          </div>
          
          {/* Copyright */}
          <p className="text-xs text-center text-gray-400 mt-6">
            © {new Date().getFullYear()} Shein Review Scheme. All rights reserved.
            <br />
            This is a limited time promotional offer. Terms and conditions apply.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default RejectionPage;
