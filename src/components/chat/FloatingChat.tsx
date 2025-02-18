
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Minimize2, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="mb-4 w-96 bg-white rounded-lg shadow-xl border overflow-hidden"
          >
            <div className="border-b p-4 flex items-center justify-between bg-primary/5">
              <h3 className="font-medium text-primary flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                AI Assistant
              </h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setIsMinimized(true)}
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="h-96 overflow-y-auto p-4 bg-white/50">
              {/* Chat messages would go here */}
              <div className="text-center text-gray-500 text-sm">
                How can I help with your career goals today?
              </div>
            </div>
            <div className="p-4 border-t bg-white">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Handle message submission
                  setMessage("");
                }}
                className="flex gap-2"
              >
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="lg"
        onClick={() => {
          setIsOpen(!isOpen);
          setIsMinimized(false);
        }}
        className={`rounded-full shadow-lg ${
          isMinimized ? "bg-primary/10 text-primary hover:bg-primary/20" : ""
        }`}
      >
        {isMinimized ? (
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            <span>1 active conversation</span>
            <Maximize2 className="h-4 w-4" />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            <span>{isOpen ? "Close Chat" : "Chat with AI"}</span>
          </div>
        )}
      </Button>
    </motion.div>
  );
};
