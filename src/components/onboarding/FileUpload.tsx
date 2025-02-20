import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Link as LinkIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

interface FileUploadProps {
  label: string;
  description: string;
  accept: string;
  onFileSelect: (file: File | null) => void;
  onTextInput?: (text: string) => void;
  value?: File | null;
  textValue?: string;
  id: string;
  allowText?: boolean;
  textPlaceholder?: string;
}

export function FileUpload({
  label,
  description,
  accept,
  onFileSelect,
  onTextInput,
  value,
  textValue = "",
  id,
  allowText = true,
  textPlaceholder = "Or paste your content here..."
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [activeTab, setActiveTab] = useState<"upload" | "text">("upload");

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    onFileSelect(null);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTextInput?.(e.target.value);
  };

  return (
    <div className="space-y-2">
      <p className="font-medium text-sm">{label}</p>
      
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "upload" | "text")}>
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload File
          </TabsTrigger>
          {allowText && (
            <TabsTrigger value="text" className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4" />
              Paste Text
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="upload">
          <div
            className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
              dragActive ? "border-primary bg-primary/5" : "border-gray-200"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id={id}
              className="hidden"
              accept={accept}
              onChange={handleChange}
            />
            
            {value ? (
              <div className="flex items-center justify-between bg-primary/5 p-3 rounded-lg">
                <span className="text-sm truncate max-w-[200px]">{value.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemove}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <label
                htmlFor={id}
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 text-center mb-1">
                  Drag & drop or click to upload
                </p>
                <p className="text-xs text-gray-500 text-center">{description}</p>
              </label>
            )}
          </div>
        </TabsContent>

        {allowText && (
          <TabsContent value="text">
            <div className="space-y-2">
              <Textarea
                placeholder={textPlaceholder}
                className="min-h-[200px] resize-none"
                value={textValue}
                onChange={handleTextChange}
              />
              <p className="text-xs text-gray-500">{description}</p>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
