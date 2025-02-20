import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { authService } from "@/services/auth.service";

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter a complete verification code.",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    try {
      await authService.verifyEmail(email, otp);
      toast({
        title: "Success!",
        description: "Your email has been verified.",
      });
      navigate("/onboarding");
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: error instanceof Error ? error.message : "Failed to verify email",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  if (!email) {
    navigate("/signup");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
        <div className="max-w-md mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Verify your email</h2>
        <p className="text-gray-600">
          We've sent a verification code to <span className="font-medium">{email}</span>
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-center">
          <Input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
            className="text-center text-2xl tracking-widest w-48"
            placeholder="······"
          />
        </div>

        <Button 
          className="w-full" 
          onClick={handleVerify}
          disabled={isVerifying || otp.length !== 6}
        >
          {isVerifying ? "Verifying..." : "Verify Email"}
        </Button>

        <p className="text-center text-sm text-gray-600">
          Didn't receive the code?{" "}
          <Button 
            variant="link" 
            className="p-0 h-auto text-primary"
            onClick={() => {
              // Implement resend code logic
            }}
          >
            Resend
          </Button>
        </p>
      </div>
    </motion.div>
    </div>
      </div>

  ); 
};

export default OtpVerification;