
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUp, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface CVUploadProps {
  onFileSelect: (file: File) => void;
  onDataExtracted: (data: any) => void;
}

export const CVUpload = ({ onFileSelect, onDataExtracted }: CVUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file);
      await processCV(file);
    }
  };

  const processCV = async (file: File) => {
    setIsProcessing(true);
    setUploadProgress(0);

    // Simulate file upload progress
    for (let i = 0; i <= 100; i += 20) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Simulate CV data extraction
    // In a real implementation, this would call an API to process the CV
    const mockExtractedData = {
      personalInfo: {
        fullName: "John Doe",
        email: "john@example.com",
        bio: "Experienced software developer with a passion for building innovative solutions."
      },
      experience: [
        {
          title: "Senior Developer",
          company: "Tech Corp",
          duration: "2020 - Present",
          description: "Led development of enterprise applications"
        }
      ],
      education: [
        {
          degree: "MSc Computer Science",
          institution: "University of Technology",
          year: "2019"
        }
      ],
      skills: {
        technical: ["React", "TypeScript", "Node.js"],
        soft: ["Leadership", "Communication"],
        tools: ["Git", "Docker"]
      }
    };

    onDataExtracted(mockExtractedData);
    setIsProcessing(false);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Upload your CV</h3>
        <p className="text-sm text-gray-600">
          Our AI will analyze your CV to personalize your experience
        </p>
      </div>
      
      {!selectedFile ? (
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <Input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileSelect}
            className="hidden"
            id="cv-upload"
          />
          <label
            htmlFor="cv-upload"
            className="cursor-pointer space-y-4 block"
          >
            <FileUp className="h-12 w-12 mx-auto text-gray-400" />
            <div>
              <Button variant="outline" type="button">
                Choose CV File
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              or drag and drop your CV here
            </p>
          </label>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
            <div className="flex items-center gap-3">
              <FileUp className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">{selectedFile.name}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemoveFile}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {isProcessing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Processing CV...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
