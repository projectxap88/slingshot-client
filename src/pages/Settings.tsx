
import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  User,
  Bell,
  Lock,
  Globe,
  Shield,
  CreditCard,
  Save
} from "lucide-react";
import { motion } from "framer-motion";

const Settings = () => {
  const [email, setEmail] = useState("alex@example.com");
  const [notifications, setNotifications] = useState(true);

  const settingSections = [
    {
      icon: User,
      title: "Profile Settings",
      description: "Update your personal information and preferences"
    },
    {
      icon: Bell,
      title: "Notification Preferences",
      description: "Choose how and when you want to be notified"
    },
    {
      icon: Lock,
      title: "Privacy & Security",
      description: "Manage your account security and privacy settings"
    },
    {
      icon: Globe,
      title: "Language & Region",
      description: "Set your preferred language and regional settings"
    },
    {
      icon: Shield,
      title: "Data & Privacy",
      description: "Control how your data is used and shared"
    },
    {
      icon: CreditCard,
      title: "Billing & Subscription",
      description: "Manage your subscription and payment methods"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Dashboard>
        <div className="max-w-3xl mx-auto w-full space-y-8">
          <div>
            <h1 className="text-2xl font-semibold">Settings</h1>
            <p className="text-gray-600 mt-2">Manage your account preferences and settings</p>
          </div>

          <div className="grid gap-4">
            {settingSections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white cursor-pointer rounded-lg border hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <section.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{section.title}</h3>
                    <p className="text-gray-600 mt-1">{section.description}</p>
                    {section.title === "Profile Settings" && (
                      <div className="mt-4 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Email</label>
                          <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <Button>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Dashboard>
    </div>
  );
};

export default Settings;
