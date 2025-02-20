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
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { onboardingService } from "@/services/onboarding.service";

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
    cvText: "",
    writingSample: null as File | null,
    writingSampleText: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.fullName.trim()) {
          newErrors.fullName = "Full name is required";
        }
        if (!formData.bio.trim()) {
          newErrors.bio = "Professional summary is required";
        }
        break;
      case 2:
        if (!formData.skills.trim()) {
          newErrors.skills = "Skills are required";
        }
        if (!formData.cv && !formData.cvText) {
          newErrors.cv = "Please upload a CV or provide CV content";
        }
        break;
      case 3:
        if (!formData.writingSample && !formData.writingSampleText) {
          newErrors.writingSample = "Please provide a writing sample";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateStep(currentStep)) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      switch (currentStep) {
        case 1:
          // Update personal info
          await onboardingService.updatePersonalInfo({
            fullName: formData.fullName,
            bio: formData.bio,
            skills: formData.skills.split(',').map(s => s.trim())
          });
          showAILearningToast("AI is analyzing your professional background...");
          break;

        case 2:
          // Handle CV upload/text
          if (formData.cv) {
            await onboardingService.uploadDocuments({
              cv: formData.cv
            });
          } else if (formData.cvText) {
            await onboardingService.saveDocumentText({
              cvText: formData.cvText
            });
          }
          showAILearningToast("AI is processing your experience...");
          break;

        case 3:
          // Handle writing sample upload/text
          if (formData.writingSample) {
            await onboardingService.uploadDocuments({
              writingSample: formData.writingSample
            });
          } else if (formData.writingSampleText) {
            await onboardingService.saveDocumentText({
              writingSampleText: formData.writingSampleText
            });
          }
          showAILearningToast("AI is analyzing your communication style...");
          break;

        case 4:
          // Complete onboarding
          await onboardingService.completeOnboarding(formData).then(()=>{
            toast({
              title: "Onboarding Complete! 🎉",
              description: "Your AI-powered career assistant is ready.",
              duration: 5000,
            });
            navigate('/');
          }).catch((error)=>{
            toast({
              title: "Error",
              description: error instanceof Error ? error.message : "Failed to complete onboarding",
              variant: "destructive",
            });
          });
      
          if (onComplete) {
            onComplete();
          }
          return;
      }

      setCurrentStep(currentStep + 1);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      // Prepare the onboarding data
      const onboardingData = {
        personalInfo: {
          fullName: formData.fullName,
          bio: formData.bio,
        },
        skills: formData.skills.split(',').map(skill => skill.trim()),
        documents: {
          cv: formData.cv,
          cvText: formData.cvText,
          writingSample: formData.writingSample,
          writingSampleText: formData.writingSampleText,
        }
      };

      // Submit the onboarding data
      await onboardingService.completeOnboarding(onboardingData);

      toast({
        title: "Profile Complete! 🎉",
        description: "Your AI-powered career assistant is ready to help you succeed.",
        duration: 5000,
      });

      if (onComplete) {
        onComplete();
      }
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to complete onboarding",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Enter your full name"
                  className={errors.fullName ? "border-red-500" : ""}
                />
                {errors.fullName && (
                  <p className="text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Professional Summary *</Label>
                <div className="relative">
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Tell us about your professional journey and aspirations..."
                    className={`min-h-[120px] pr-12 ${errors.bio ? "border-red-500" : ""}`}
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
                {errors.bio && (
                  <p className="text-sm text-red-500">{errors.bio}</p>
                )}
                <p className="text-sm text-gray-500 mt-2 cursor-pointer">
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
              id="cv-upload"
              label="Upload your CV"
              description="Our AI will analyze your CV to personalize your job recommendations and highlight your strengths."
              accept=".pdf,.doc,.docx"
              onFileSelect={(file) => setFormData({ ...formData, cv: file })}
              onTextInput={(text) => setFormData({ ...formData, cvText: text })}
              value={formData.cv}
              textValue={formData.cvText}
              textPlaceholder="Paste your CV content here..."
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
              id="writing-sample-upload"
              label="Writing Sample"
              description="This helps our AI create personalized content that matches your tone and style."
              accept=".pdf,.doc,.docx,.txt"
              onFileSelect={(file) => setFormData({ ...formData, writingSample: file })}
              onTextInput={(text) => setFormData({ ...formData, writingSampleText: text })}
              value={formData.writingSample}
              textValue={formData.writingSampleText}
              textPlaceholder="Paste your writing sample here..."
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
                    CV: {formData.cv?.name || (formData.cvText ? "Text input provided" : "Not provided")}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Writing Sample: {formData.writingSample?.name || (formData.writingSampleText ? "Text input provided" : "Not provided")}
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
              disabled={currentStep === 1 || isSubmitting}
              className="w-32"
            >
              Back
            </Button>
            <Button 
              onClick={handleNext} 
              className="w-32"
              disabled={isSubmitting}
            >
              {currentStep === 4 ? (
                isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <LoadingSpinner size="sm" className="mr-2" />
                    Completing...
                  </span>
                ) : (
                  "Complete"
                )
              ) : (
                "Next"
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
