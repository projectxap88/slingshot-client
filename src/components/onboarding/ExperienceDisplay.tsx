
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Lightbulb, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

interface ExperienceDisplayProps {
  experience: any;
  education: any;
  skills: any;
}

export const ExperienceDisplay = ({ experience, education, skills }: ExperienceDisplayProps) => {
  const mockData = {
    experience: [
      {
        title: "Senior Software Engineer",
        company: "Tech Innovations Inc.",
        duration: "2020 - Present",
        description: "Leading development of enterprise applications and mentoring junior developers"
      },
      {
        title: "Frontend Developer",
        company: "Digital Solutions Ltd",
        duration: "2018 - 2020",
        description: "Developed responsive web applications using modern JavaScript frameworks"
      }
    ],
    education: [
      {
        degree: "Master of Computer Science",
        institution: "Tech University",
        year: "2018"
      },
      {
        degree: "Bachelor of Software Engineering",
        institution: "State University",
        year: "2016"
      }
    ],
    skills: {
      technical: ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker"],
      soft: ["Leadership", "Communication", "Problem Solving", "Team Management", "Agile"],
      tools: ["Git", "VS Code", "Jira", "Figma", "Jenkins", "Kubernetes"]
    }
  };

  const [localData, setLocalData] = useState({
    experience: experience?.length ? experience : mockData.experience,
    education: education?.length ? education : mockData.education,
    skills: skills || mockData.skills
  });

  const [newSkill, setNewSkill] = useState("");
  const [skillCategory, setSkillCategory] = useState<"technical" | "soft" | "tools">("technical");

  const addExperience = () => {
    setLocalData({
      ...localData,
      experience: [...localData.experience, {
        title: "",
        company: "",
        duration: "",
        description: ""
      }]
    });
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const newExperience = [...localData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setLocalData({ ...localData, experience: newExperience });
  };

  const removeExperience = (index: number) => {
    setLocalData({
      ...localData,
      experience: localData.experience.filter((_, i) => i !== index)
    });
  };

  const addEducation = () => {
    setLocalData({
      ...localData,
      education: [...localData.education, {
        degree: "",
        institution: "",
        year: ""
      }]
    });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const newEducation = [...localData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setLocalData({ ...localData, education: newEducation });
  };

  const removeEducation = (index: number) => {
    setLocalData({
      ...localData,
      education: localData.education.filter((_, i) => i !== index)
    });
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setLocalData({
        ...localData,
        skills: {
          ...localData.skills,
          [skillCategory]: [...localData.skills[skillCategory], newSkill.trim()]
        }
      });
      setNewSkill("");
    }
  };

  const removeSkill = (category: "technical" | "soft" | "tools", index: number) => {
    setLocalData({
      ...localData,
      skills: {
        ...localData.skills,
        [category]: localData.skills[category].filter((_, i) => i !== index)
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold flex items-center gap-3">
            <Briefcase className="h-6 w-6 text-primary" />
            Work Experience
          </h3>
          <Button onClick={addExperience} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </div>
        {localData.experience.map((exp: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors relative"
          >
            <button
              onClick={() => removeExperience(index)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
            <Input
              value={exp.title}
              onChange={(e) => updateExperience(index, "title", e.target.value)}
              placeholder="Job Title"
              className="font-medium text-lg text-primary mb-2"
            />
            <Input
              value={exp.company}
              onChange={(e) => updateExperience(index, "company", e.target.value)}
              placeholder="Company Name"
              className="text-sm text-gray-600 mb-2"
            />
            <Input
              value={exp.duration}
              onChange={(e) => updateExperience(index, "duration", e.target.value)}
              placeholder="Duration (e.g., 2020 - Present)"
              className="text-sm text-primary/70 mb-2"
            />
            <Textarea
              value={exp.description}
              onChange={(e) => updateExperience(index, "description", e.target.value)}
              placeholder="Job Description"
              className="text-sm text-gray-600 mt-2"
            />
          </motion.div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold flex items-center gap-3">
            <GraduationCap className="h-6 w-6 text-primary" />
            Education
          </h3>
          <Button onClick={addEducation} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {localData.education.map((edu: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors relative"
            >
              <button
                onClick={() => removeEducation(index)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
              <Input
                value={edu.degree}
                onChange={(e) => updateEducation(index, "degree", e.target.value)}
                placeholder="Degree"
                className="font-medium text-lg text-primary mb-2"
              />
              <Input
                value={edu.institution}
                onChange={(e) => updateEducation(index, "institution", e.target.value)}
                placeholder="Institution"
                className="text-sm text-gray-600 mb-2"
              />
              <Input
                value={edu.year}
                onChange={(e) => updateEducation(index, "year", e.target.value)}
                placeholder="Year"
                className="text-sm text-primary/70"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-3 mb-6">
          <Lightbulb className="h-6 w-6 text-primary" />
          Skills
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors"
          >
            <h4 className="font-medium text-primary mb-3">Technical Skills</h4>
            <div className="flex flex-wrap gap-2">
              {localData.skills.technical.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="bg-gray-50 text-gray-600 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill("technical", index)}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-3 w-3 inline" />
                  </button>
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors"
          >
            <h4 className="font-medium text-primary mb-3">Soft Skills</h4>
            <div className="flex flex-wrap gap-2">
              {localData.skills.soft.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="bg-gray-50 text-gray-600 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill("soft", index)}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-3 w-3 inline" />
                  </button>
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors"
          >
            <h4 className="font-medium text-primary mb-3">Tools & Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {localData.skills.tools.map((tool: string, index: number) => (
                <span
                  key={index}
                  className="bg-gray-50 text-gray-600 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tool}
                  <button
                    onClick={() => removeSkill("tools", index)}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-3 w-3 inline" />
                  </button>
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="flex gap-2 mt-4">
          <select
            className="border rounded-md px-3 py-2 text-sm"
            value={skillCategory}
            onChange={(e) => setSkillCategory(e.target.value as "technical" | "soft" | "tools")}
          >
            <option value="technical">Technical Skills</option>
            <option value="soft">Soft Skills</option>
            <option value="tools">Tools & Technologies</option>
          </select>
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a new skill"
            className="flex-1"
          />
          <Button onClick={addSkill} variant="outline">
            Add Skill
          </Button>
        </div>
      </div>
    </div>
  );
};
