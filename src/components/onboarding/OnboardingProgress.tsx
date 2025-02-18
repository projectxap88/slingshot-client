
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
  steps: {
    label: string;
    completed: boolean;
  }[];
}

export const OnboardingProgress = ({ currentStep, totalSteps, steps }: OnboardingProgressProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="space-y-6">
      <Progress value={progress} className="h-2" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
              step.completed 
                ? "bg-primary/10 border-primary" 
                : index + 1 === currentStep
                ? "bg-white border-primary shadow-lg"
                : "bg-gray-50 border-transparent"
            } border-2`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                step.completed 
                  ? "bg-primary text-white"
                  : index + 1 === currentStep
                  ? "bg-primary/20 text-primary"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step.completed ? <Check className="h-5 w-5" /> : index + 1}
            </div>
            <span className={`text-sm font-medium ${
              index + 1 === currentStep ? "text-primary" : "text-gray-600"
            }`}>
              {step.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
