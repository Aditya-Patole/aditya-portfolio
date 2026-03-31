import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2, Globe, Server, Smartphone, Wrench, Layers,
  Monitor, Database, BrainCircuit,
} from "lucide-react";

type Category = "All" | "Languages" | "Frontend" | "Backend & APIs" | "Mobile" | "Tools";

interface SkillItem {
  name: string;
  categories: Category[];
}

const skills: SkillItem[] = [
  { name: "Python", categories: ["Languages"] },
  { name: "Java", categories: ["Languages"] },
  { name: "JavaScript", categories: ["Languages"] },
  { name: "C++", categories: ["Languages"] },
  { name: "React.js", categories: ["Frontend"] },
  { name: "HTML5", categories: ["Frontend"] },
  { name: "CSS3", categories: ["Frontend"] },
  { name: "Bootstrap", categories: ["Frontend"] },
  { name: "Node.js", categories: ["Backend & APIs"] },
  { name: "Express.js", categories: ["Backend & APIs"] },
  { name: "Django REST", categories: ["Backend & APIs"] },
  { name: "MongoDB", categories: ["Backend & APIs"] },
  { name: "MySQL", categories: ["Backend & APIs"] },
  { name: "Android (Java)", categories: ["Mobile"] },
  { name: "Retrofit", categories: ["Mobile"] },
  { name: "Git", categories: ["Tools"] },
  { name: "GitHub", categories: ["Tools"] },
  { name: "Postman", categories: ["Tools"] },
  { name: "MongoDB Compass", categories: ["Tools"] },
  { name: "Android Studio", categories: ["Tools"] },
];

const tabs: { label: Category; icon: React.ElementType }[] = [
  { label: "All", icon: Layers },
  { label: "Languages", icon: Code2 },
  { label: "Frontend", icon: Globe },
  { label: "Backend & APIs", icon: Server },
  { label: "Mobile", icon: Smartphone },
  { label: "Tools", icon: Wrench },
];

const professionalExpertise = [
  { icon: Monitor, title: "Full Stack Development", desc: "End-to-end web applications with modern frameworks and scalable architectures." },
  { icon: Database, title: "Backend API Architecture", desc: "RESTful APIs, database design, and server-side logic with Node.js & Django." },
  { icon: Smartphone, title: "Mobile + Web Solutions", desc: "Cross-platform mobile apps and responsive progressive web applications." },
  { icon: BrainCircuit, title: "Machine Learning", desc: "Data-driven solutions with Python, model training, and intelligent automation." },
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

      {/* Professional Expertise Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
        {professionalExpertise.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="glass-card-hover p-6 text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
              <item.icon size={24} />
            </div>
            <h4 className="font-semibold text-foreground text-sm mb-2">{item.title}</h4>
            <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

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
                <Code2 size={20} />
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
