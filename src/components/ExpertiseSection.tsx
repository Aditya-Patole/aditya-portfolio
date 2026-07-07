import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2, Globe, Server, Smartphone, Wrench, Layers, Sparkles
} from "lucide-react";

type Category = "All" | "Languages" | "Frontend" | "Backend & APIs" | "Mobile" | "Tools";

interface SkillItem {
  name: string;
  iconUrl: string;
  categories: Category[];
  invertOnDark?: boolean;
}

const skills: SkillItem[] = [
  // Languages
  {
    name: "Python",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    categories: ["Languages"],
  },
  {
    name: "Java",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    categories: ["Languages"],
  },
  {
    name: "JavaScript",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    categories: ["Languages"],
  },
  {
    name: "TypeScript",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    categories: ["Languages"],
  },
  {
    name: "C++",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
    categories: ["Languages"],
  },

  // Frontend
  {
    name: "React.js",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    categories: ["Frontend"],
  },
  {
    name: "Next.js",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    categories: ["Frontend"],
    invertOnDark: true,
  },
  {
    name: "HTML5",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    categories: ["Frontend"],
  },
  {
    name: "CSS3",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    categories: ["Frontend"],
  },
  {
    name: "Tailwind CSS",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    categories: ["Frontend"],
  },
  {
    name: "Bootstrap",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg",
    categories: ["Frontend"],
  },

  // Backend & APIs
  {
    name: "Node.js",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    categories: ["Backend & APIs"],
  },
  {
    name: "Express.js",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
    categories: ["Backend & APIs"],
    invertOnDark: true,
  },
  {
    name: "Django REST",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg",
    categories: ["Backend & APIs"],
  },
  {
    name: "Firebase",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg",
    categories: ["Backend & APIs"],
  },
  {
    name: "MongoDB",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    categories: ["Backend & APIs"],
  },
  {
    name: "MySQL",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    categories: ["Backend & APIs"],
  },
  {
    name: "PostgreSQL",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    categories: ["Backend & APIs"],
  },

  // Mobile
  {
    name: "Android (Java)",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg",
    categories: ["Mobile"],
  },
  {
    name: "Android Studio",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg",
    categories: ["Mobile"],
  },
  {
    name: "Retrofit",
    iconUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' fill='none'><rect width='48' height='48' rx='12' fill='%231E293B'/><path d='M14 24h20M26 16l8 8-8 8' stroke='%2338BDF8' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/><circle cx='16' cy='24' r='5' fill='%238B5CF6'/><path d='M14 15h6v18h-6z' fill='%2338BDF8' fill-opacity='0.2'/></svg>",
    categories: ["Mobile"],
  },

  // Tools
  {
    name: "Git",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    categories: ["Tools"],
  },
  {
    name: "GitHub",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    categories: ["Tools"],
    invertOnDark: true,
  },
  {
    name: "VS Code",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
    categories: ["Tools"],
  },
  {
    name: "Docker",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    categories: ["Tools"],
  },
  {
    name: "Postman",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
    categories: ["Tools"],
  },
  {
    name: "Figma",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
    categories: ["Tools"],
  },
  {
    name: "MongoDB Compass",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    categories: ["Tools"],
  },
];

const tabs: { label: Category; icon: React.ElementType }[] = [
  { label: "All", icon: Layers },
  { label: "Languages", icon: Code2 },
  { label: "Frontend", icon: Globe },
  { label: "Backend & APIs", icon: Server },
  { label: "Mobile", icon: Smartphone },
  { label: "Tools", icon: Wrench },
];

const ExpertiseSection = () => {
  const [active, setActive] = useState<Category>("All");

  const filtered = active === "All" ? skills : skills.filter((s) => s.categories.includes(active));

  return (
    <section id="skills" className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">My Expertise</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">
          Tech <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6]">Stack</span>
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] rounded-full mb-10 mx-auto" />
      </motion.div>

      {/* Filter Tabs */}
      <div className="mb-10 overflow-x-auto scrollbar-hide -mx-4 px-4">
        <div className="flex gap-2.5 justify-center min-w-max">
          {tabs.map((tab) => {
            const isActive = active === tab.label;
            return (
              <button
                key={tab.label}
                onClick={() => setActive(tab.label)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? "bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] scale-[1.02]"
                    : "bg-[#111827]/70 backdrop-blur-md text-slate-400 hover:text-white border border-white/10 hover:border-white/20 hover:-translate-y-[2px] hover:shadow-lg hover:shadow-purple-500/10"
                }`}
              >
                <tab.icon size={16} className={isActive ? "text-white" : "text-slate-400"} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Skills Grid */}
      <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((skill) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="group relative overflow-hidden bg-[#111827]/75 hover:bg-[#1e293b]/85 backdrop-blur-xl rounded-xl p-5 border border-white/10 hover:border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_35px_rgba(0,0,0,0.6),0_0_25px_rgba(139,92,246,0.2)] transition-all duration-300 flex flex-col items-center justify-center text-center gap-3.5 min-h-[130px]"
            >
              {/* Top Gradient Glow (Signature Design Element) */}
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#8b5cf6] via-[#6366f1] to-[#3b82f6] opacity-75 group-hover:opacity-100 group-hover:h-[3px] transition-all duration-300 shadow-[0_0_12px_rgba(139,92,246,0.5)] group-hover:shadow-[0_0_20px_rgba(139,92,246,0.8)]" />

              {/* Technology Icon */}
              <div className="w-12 h-12 flex items-center justify-center shrink-0 mb-0.5">
                <img
                  src={skill.iconUrl}
                  alt={skill.name}
                  className={`w-11 h-11 object-contain transition-transform duration-300 group-hover:scale-110 ${
                    skill.invertOnDark ? "invert brightness-200" : ""
                  }`}
                />
              </div>

              {/* Technology Name */}
              <span className="text-sm font-medium text-white tracking-wide">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default ExpertiseSection;
