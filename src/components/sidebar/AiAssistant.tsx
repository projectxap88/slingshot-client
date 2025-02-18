
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, FileText, BrainCircuit, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const AiAssistant = () => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const features = [
    {
      id: "career",
      icon: <MessageSquare className="h-4 w-4" />,
      title: "Career Strategy Session",
      description: "Get personalized career advice from AI"
    },
    {
      id: "resume",
      icon: <FileText className="h-4 w-4" />,
      title: "Review My Resume",
      description: "AI-powered resume optimization"
    },
    {
      id: "interview",
      icon: <BrainCircuit className="h-4 w-4" />,
      title: "Interview Practice",
      description: "Practice with AI interviewer"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-4 w-4 text-primary animate-pulse" />
        <h3 className="text-sm font-medium text-gray-500">AI ASSISTANT</h3>
      </div>
      <div className="space-y-3">
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="secondary"
              className={`w-full justify-start p-4 h-auto ${
                activeFeature === feature.id 
                ? "bg-primary/10 text-primary" 
                : "hover:bg-secondary/80"
              }`}
              onClick={() => setActiveFeature(feature.id)}
            >
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  {feature.icon}
                </div>
                <div className="text-left">
                  <p className="font-medium">{feature.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                </div>
              </div>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
