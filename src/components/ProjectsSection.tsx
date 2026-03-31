import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Layers, Globe, Smartphone, Brain } from "lucide-react";

type ProjectCategory = "All" | "Web" | "Application" | "Machine Learning";

interface Project {
  title: string;
  description: string;
  tech: string[];
  live: string;
  github: string;
  category: ProjectCategory[];
}

const projects: Project[] = [
  {
    title: "CloudSync Dashboard",
    description: "A real-time cloud monitoring dashboard with interactive charts, alerts, and team collaboration features.",
    tech: ["React", "TypeScript", "Tailwind", "Firebase"],
    live: "#",
    github: "#",
    category: ["Web"],
  },
  {
    title: "DevConnect",
    description: "A developer networking platform where devs share projects, form teams, and collaborate on open-source.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Socket.io"],
    live: "#",
    github: "#",
    category: ["Web"],
  },
  {
    title: "TaskFlow AI",
    description: "Smart task management app with AI-powered prioritization, natural language input, and integrations.",
    tech: ["React", "Python", "OpenAI", "MongoDB"],
    live: "#",
    github: "#",
    category: ["Application", "Machine Learning"],
  },
  {
    title: "FinTrack",
    description: "Personal finance tracker with budgeting, expense categorization, and visual analytics.",
    tech: ["React", "Express", "Chart.js", "Supabase"],
    live: "#",
    github: "#",
    category: ["Web", "Application"],
  },
];

const tabs: { label: ProjectCategory; icon: React.ElementType }[] = [
  { label: "All", icon: Layers },
  { label: "Web", icon: Globe },
  { label: "Application", icon: Smartphone },
  { label: "Machine Learning", icon: Brain },
];

const ProjectsSection = () => {
  const [active, setActive] = useState<ProjectCategory>("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category.includes(active));

  return (
    <section id="projects" className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Things I've Built</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">
          Featured <span className="gradient-text">Projects</span>
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

      <motion.div layout className="grid md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.25 }}
              className="glass-card-hover p-6 flex flex-col"
            >
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 text-xs rounded-md bg-primary/10 text-primary font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <a href={project.live} className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-primary transition-colors">
                  <ExternalLink size={15} /> Live Demo
                </a>
                <a href={project.github} className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  <Github size={15} /> Source
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
