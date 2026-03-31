import { motion } from "framer-motion";

interface Skill {
  name: string;
  level: number; // 0-100
}

interface Category {
  title: string;
  color: string;
  skills: Skill[];
}

const categories: Category[] = [
  {
    title: "Frontend",
    color: "primary",
    skills: [
      { name: "React", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "Tailwind CSS", level: 90 },
      { name: "HTML/CSS", level: 95 },
    ],
  },
  {
    title: "Backend",
    color: "secondary",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 80 },
      { name: "Python", level: 75 },
      { name: "PostgreSQL", level: 78 },
      { name: "MongoDB", level: 80 },
    ],
  },
  {
    title: "Tools & DevOps",
    color: "accent",
    skills: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 70 },
      { name: "AWS", level: 65 },
      { name: "Figma", level: 75 },
      { name: "Linux", level: 72 },
    ],
  },
];

const barColorMap: Record<string, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
};

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">
          My <span className="gradient-text">Skills</span>
        </h2>
        <div className="w-16 h-1 bg-primary rounded-full mb-10" />
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((cat, ci) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: ci * 0.15 }}
            className="glass-card-hover p-6"
          >
            <h3 className="text-lg font-semibold text-foreground mb-6">{cat.title}</h3>
            <div className="space-y-4">
              {cat.skills.map((skill, si) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-foreground font-medium">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.1 * si + ci * 0.15, ease: "easeOut" }}
                      className={`h-full rounded-full ${barColorMap[cat.color]}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
