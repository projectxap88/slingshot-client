import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Github, Mail, KeyRound, Linkedin } from "lucide-react";
import { useAuth } from '@/contexts/auth.context';
import { PasswordInput } from "@/components/ui/password-input";
import { authService } from "@/services/auth.service";

const Login = () => {
  const navigate = useNavigate();
  const { login,user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      toast({
        title: "Welcome back!",
        description: "Successfully logged in.",
      });
      if(user?.onboarding) {
        navigate("/");
      }
      else {
        navigate("/onboarding") 
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <div className="max-w-md mx-auto space-y-8">
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
          <h1 className="text-3xl font-semibold mb-3">Welcome back</h1>
          <p className="text-gray-600">
            Log in to continue your career journey
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="space-y-4 mb-6">
            {/* <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                toast({
                  title: "GitHub Login",
                  description: "Connecting to GitHub...",
                });
              }}
            >
              <Github className="mr-2 h-4 w-4" />
              Continue with GitHub
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                toast({
                  title: "LinkedIn Login",
                  description: "Connecting to LinkedIn...",
                });
              }}
            >
              <Linkedin className="mr-2 h-4 w-4" />
              Continue with LinkedIn
            </Button> */}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                authService.handleGoogleLogin();
              }}
            >
              <Mail className="mr-2 h-4 w-4" />
              Continue with Google
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">Or continue with</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-sm font-normal"
                  onClick={() => {
                    toast({
                      title: "Reset Password",
                      description: "Password reset functionality coming soon!",
                    });
                  }}
                >
                  Forgot password?
                </Button>
              </div>
              <PasswordInput
                id="password"
                required
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              <KeyRound className="mr-2 h-4 w-4" />
              {isLoading ? "Logging in..." : "Log in"}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <Button 
              variant="link" 
              className="p-0 h-auto font-semibold text-primary"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;