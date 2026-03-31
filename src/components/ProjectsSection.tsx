import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "CloudSync Dashboard",
    description: "A real-time cloud monitoring dashboard with interactive charts, alerts, and team collaboration features.",
    tech: ["React", "TypeScript", "Tailwind", "Firebase"],
    live: "#",
    github: "#",
  },
  {
    title: "DevConnect",
    description: "A developer networking platform where devs share projects, form teams, and collaborate on open-source.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Socket.io"],
    live: "#",
    github: "#",
  },
  {
    title: "TaskFlow AI",
    description: "Smart task management app with AI-powered prioritization, natural language input, and integrations.",
    tech: ["React", "Python", "OpenAI", "MongoDB"],
    live: "#",
    github: "#",
  },
  {
    title: "FinTrack",
    description: "Personal finance tracker with budgeting, expense categorization, and visual analytics.",
    tech: ["React", "Express", "Chart.js", "Supabase"],
    live: "#",
    github: "#",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <div className="w-16 h-1 bg-primary rounded-full mb-10" />
      </motion.div>

      {/* Horizontal scroll on mobile, grid on desktop */}
      <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-2 md:overflow-visible md:pb-0 scrollbar-hide">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass-card-hover p-6 min-w-[300px] snap-center flex flex-col"
          >
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-xs rounded-md bg-primary/10 text-primary font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href={project.live}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-primary transition-colors"
              >
                <ExternalLink size={15} /> Live Demo
              </a>
              <a
                href={project.github}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github size={15} /> Source
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
