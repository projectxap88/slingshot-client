import { useState } from "react";
import { OnboardingProgress } from "./OnboardingProgress";
import { FileUpload } from "./FileUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { 
  Briefcase, 
  GraduationCap, 
  Github, 
  Linkedin, 
  MessageSquare, 
  Lightbulb,
  Import,
  Check
} from "lucide-react";

interface OnboardingModalProps {
  onComplete?: () => void;
}

export const OnboardingModal = ({ onComplete }: OnboardingModalProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    skills: "",
    cv: null as File | null,
    writingSample: null as File | null,
  });

  const steps = [
    { label: "Professional Profile", completed: currentStep > 1 },
    { label: "Experience & Skills", completed: currentStep > 2 },
    { label: "Writing & Style", completed: currentStep > 3 },
    { label: "AI Personalization", completed: currentStep > 4 },
  ];

  const showAILearningToast = (message: string) => {
    toast({
      title: "AI Learning",
      description: message,
      duration: 3000,
    });
  };

  const handleNext = () => {
    if (currentStep < 4) {
      switch (currentStep) {
        case 1:
          showAILearningToast("AI is analyzing your professional background and building your career profile...");
          break;
        case 2:
          showAILearningToast("AI is processing your experience to identify key strengths and opportunities...");
          break;
        case 3:
          showAILearningToast("AI is analyzing your communication style to personalize your experience...");
          break;
      }
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

  const handleImportProfile = (platform: string) => {
    toast({
      title: `Importing from ${platform}`,
      description: "AI is analyzing and importing your professional data...",
      duration: 3000,
    });
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
            <div className="bg-primary/5 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Import className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">Import Your Professional Profile</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Quickly import your professional data from other platforms
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => handleImportProfile("LinkedIn")}
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => handleImportProfile("GitHub")}
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Enter your full name"
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Professional Summary</Label>
                <div className="relative">
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Tell us about your professional journey and aspirations..."
                    className="min-h-[120px] pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 text-primary"
                    onClick={() => showAILearningToast("AI is helping enhance your professional summary...")}
                  >
                    <Lightbulb className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  💡 Click the lightbulb for AI-powered writing suggestions
                </p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-primary/5 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Work Experience</h3>
                </div>
                <p className="text-sm text-gray-600">
                  AI will analyze your experience to identify key achievements
                </p>
              </div>
              <div className="bg-primary/5 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Education & Skills</h3>
                </div>
                <p className="text-sm text-gray-600">
                  We'll match your skills with current market demands
                </p>
              </div>
            </div>

            <FileUpload
              label="Upload your CV"
              description="Our AI will analyze your CV to personalize your job recommendations and highlight your strengths."
              accept=".pdf,.doc,.docx"
              onFileSelect={(file) => setFormData({ ...formData, cv: file })}
            />

            <div className="space-y-2 mt-6">
              <Label htmlFor="skills">Key Skills & Expertise</Label>
              <div className="relative">
                <Textarea
                  id="skills"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="Enter your key skills (separated by commas)"
                  className="min-h-[100px] pr-12"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-2 text-primary"
                  onClick={() => showAILearningToast("AI is suggesting relevant skills based on your profile...")}
                >
                  <Lightbulb className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-primary/5 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Communication Style Analysis</h3>
              </div>
              <p className="text-sm text-gray-600">
                Upload a writing sample to help our AI understand and match your communication style
              </p>
            </div>

            <FileUpload
              label="Writing Sample"
              description="This helps our AI create personalized content that matches your tone and style."
              accept=".pdf,.doc,.docx,.txt"
              onFileSelect={(file) => setFormData({ ...formData, writingSample: file })}
            />

            <div className="bg-primary/5 rounded-xl p-6">
              <h4 className="font-medium mb-3">AI Writing Assistant Benefits</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="h-4 w-4 text-primary" />
                  Personalized cover letter generation
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="h-4 w-4 text-primary" />
                  Professional email templates
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="h-4 w-4 text-primary" />
                  Interview response suggestions
                </li>
              </ul>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 mb-6">
              <h3 className="font-medium mb-4">AI Learning Summary</h3>
              <div className="space-y-4">
                <div className="bg-white/60 p-4 rounded-lg">
                  <p className="text-sm font-medium">Professional Profile</p>
                  <p className="text-sm text-gray-600 mt-1">{formData.fullName}</p>
                  <p className="text-sm text-gray-600 mt-1">{formData.bio}</p>
                </div>
                <div className="bg-white/60 p-4 rounded-lg">
                  <p className="text-sm font-medium">Skills & Expertise</p>
                  <p className="text-sm text-gray-600 mt-1">{formData.skills}</p>
                </div>
                <div className="bg-white/60 p-4 rounded-lg">
                  <p className="text-sm font-medium">Uploaded Documents</p>
                  <p className="text-sm text-gray-600 mt-1">
                    CV: {formData.cv?.name || "Not uploaded"}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Writing Sample: {formData.writingSample?.name || "Not uploaded"}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-primary/20 rounded-lg bg-white">
                <h4 className="font-medium mb-2">AI Career Assistant</h4>
                <p className="text-sm text-gray-600">
                  Personalized job recommendations and career guidance based on your profile
                </p>
              </div>
              <div className="p-4 border border-primary/20 rounded-lg bg-white">
                <h4 className="font-medium mb-2">Smart Content Generator</h4>
                <p className="text-sm text-gray-600">
                  AI-powered writing assistance for applications and professional communications
                </p>
              </div>
            </div>
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
            Let's set up your AI-powered career assistant. We'll personalize your experience based on your profile.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <OnboardingProgress
            currentStep={currentStep}
            totalSteps={4}
            steps={steps}
          />
          
          <div className="min-h-[400px] mt-8">
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
            <Button onClick={handleNext} className="w-32">
              {currentStep === 4 ? "Complete" : "Next"}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
