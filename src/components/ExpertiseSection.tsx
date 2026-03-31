import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2, Globe, Server, Smartphone, Wrench, Layers,
  FileCode2, Coffee, Braces, Binary,
  Atom, FileType, Palette, Layout,
  ServerCog, Route, Database, CircleDot,
  TabletSmartphone, Plug,
  GitBranch, Github, Send, Compass, MonitorSmartphone,
} from "lucide-react";

type Category = "All" | "Languages" | "Frontend" | "Backend & APIs" | "Mobile" | "Tools";

interface SkillItem {
  name: string;
  icon: React.ElementType;
  categories: Category[];
}

const skills: SkillItem[] = [
  { name: "Python", icon: FileCode2, categories: ["Languages"] },
  { name: "Java", icon: Coffee, categories: ["Languages"] },
  { name: "JavaScript", icon: Braces, categories: ["Languages"] },
  { name: "C++", icon: Binary, categories: ["Languages"] },
  { name: "React.js", icon: Atom, categories: ["Frontend"] },
  { name: "HTML5", icon: FileType, categories: ["Frontend"] },
  { name: "CSS3", icon: Palette, categories: ["Frontend"] },
  { name: "Bootstrap", icon: Layout, categories: ["Frontend"] },
  { name: "Node.js", icon: ServerCog, categories: ["Backend & APIs"] },
  { name: "Express.js", icon: Route, categories: ["Backend & APIs"] },
  { name: "Django REST", icon: Server, categories: ["Backend & APIs"] },
  { name: "MongoDB", icon: Database, categories: ["Backend & APIs"] },
  { name: "MySQL", icon: CircleDot, categories: ["Backend & APIs"] },
  { name: "Android (Java)", icon: TabletSmartphone, categories: ["Mobile"] },
  { name: "Retrofit", icon: Plug, categories: ["Mobile"] },
  { name: "Git", icon: GitBranch, categories: ["Tools"] },
  { name: "GitHub", icon: Github, categories: ["Tools"] },
  { name: "Postman", icon: Send, categories: ["Tools"] },
  { name: "MongoDB Compass", icon: Compass, categories: ["Tools"] },
  { name: "Android Studio", icon: MonitorSmartphone, categories: ["Tools"] },
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
          Tech <span className="gradient-text">Stack</span>
        </h2>
        <div className="w-16 h-1 bg-primary rounded-full mb-10 mx-auto" />
      </motion.div>

      {/* Filter Tabs */}
      <div className="mb-10 overflow-x-auto scrollbar-hide -mx-4 px-4">
        <div className="flex gap-2 justify-center min-w-max">
          {tabs.map((tab) => {
            const isActive = active === tab.label;
            return (
              <button
                key={tab.label}
                onClick={() => setActive(tab.label)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
                    : "glass-card text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Skills Grid */}
      <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((skill) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.25 }}
              className="glass-card-hover p-5 flex flex-col items-center justify-center text-center gap-3 min-h-[100px]"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <skill.icon size={20} />
              </div>
              <span className="text-sm font-medium text-foreground">{skill.name}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default ExpertiseSection;
