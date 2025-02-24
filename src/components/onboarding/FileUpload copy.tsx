
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUp, X } from "lucide-react";

interface FileUploadProps {
  label: string;
  description: string;
  accept?: string;
  onFileSelect: (file: File) => void;
}

export const FileUpload = ({ label, description, accept, onFileSelect }: FileUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">{label}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      
      {!selectedFile ? (
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <Input
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            className="hidden"
            id={`file-upload-${label}`}
          />
          <label
            htmlFor={`file-upload-${label}`}
            className="cursor-pointer space-y-4 block"
          >
            <FileUp className="h-12 w-12 mx-auto text-gray-400" />
            <div>
              <Button variant="outline" type="button">
                Choose File
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              or drag and drop your file here
            </p>
          </label>
        </div>
      ) : (
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
      )}
    </div>
  );
};
