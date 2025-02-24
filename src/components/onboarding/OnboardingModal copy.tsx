import { useState } from "react";
import { OnboardingProgress } from "./OnboardingProgress";
import { CVUpload } from "./CVUpload";
import { ExperienceDisplay } from "./ExperienceDisplay";
import { AIAnalysis } from "./AIAnalysis";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

interface OnboardingModalProps {
  onComplete?: () => void;
}

export const OnboardingModal = ({ onComplete }: OnboardingModalProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    bio: "",
    headline: "",
    phone: "",
    location: "",
  });

  const steps = [
    { label: "Professional Profile", completed: currentStep > 1 },
    { label: "Experience & Skills", completed: currentStep > 2 },
    { label: "AI Analysis", completed: currentStep > 3 },
  ];

  const handleCVDataExtracted = (data: any) => {
    setExtractedData(data);
    setFormData({
      ...formData,
      fullName: data.personalInfo.fullName || formData.fullName,
      email: data.personalInfo.email || formData.email,
      bio: data.personalInfo.bio || formData.bio,
    });
  };

  const handleNext = () => {
    if (currentStep < 3) {
      toast({
        title: "Processing...",
        description: "Analyzing your professional data...",
        duration: 2000,
      });
      setCurrentStep(currentStep + 1);
    } else {
      toast({
        title: "Profile Complete! 🎉",
        description: "Your AI-powered career assistant is ready to help you succeed.",
        duration: 5000,
      });
      if (onComplete) {
        onComplete();
      }
      navigate('/');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Upload your CV</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Upload your CV and our AI will automatically fill out your profile information
                </p>
              </div>
              <CVUpload
                onFileSelect={() => {}}
                onDataExtracted={handleCVDataExtracted}
              />
            </div>

            <div className="border-t pt-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="City, Country"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="headline">Professional Headline</Label>
                  <Input
                    id="headline"
                    placeholder="e.g., Senior Software Engineer at Tech Corp"
                    value={formData.headline}
                    onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Summary</Label>
                  <Textarea
                    id="bio"
                    placeholder="Write a brief summary about your professional background"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="min-h-[100px] resize-none"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <ExperienceDisplay
              experience={extractedData?.experience || null}
              education={extractedData?.education || null}
              skills={extractedData?.skills || null}
            />
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <AIAnalysis userData={extractedData || { personalInfo: formData }} />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <img 
            src="/lovable-uploads/c82971a4-b8bb-4499-8eb2-de40acc879d8.png" 
            alt="Slingshot" 
            className="h-16 w-16 mx-auto mb-6"
          />
          <h1 className="text-3xl font-semibold mb-3">Welcome to Slingshot</h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Let's set up your professional profile to get the most out of your AI career assistant.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <OnboardingProgress
            currentStep={currentStep}
            totalSteps={3}
            steps={steps}
          />
          
          <div className="mt-8 min-h-[400px]">
            {renderStepContent()}
          </div>

          <div className="flex justify-between pt-6 border-t mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="w-32"
            >
              Back
            </Button>
            <Button 
              onClick={handleNext} 
              className="w-32"
            >
              {currentStep === 3 ? "Complete" : "Next"}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
