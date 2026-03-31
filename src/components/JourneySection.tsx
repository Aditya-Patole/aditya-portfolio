import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

interface Education {
  degree: string;
  institute: string;
  duration: string;
  description: string;
}

const educationData: Education[] = [
  {
    degree: "B.Tech in Information Technology",
    institute: "Walchand College of Engineering, Sangli",
    duration: "2025 - Present",
    description: "Pursuing Bachelor's degree with focus on software development, algorithms, and modern web technologies.",
  },
  {
    degree: "Diploma in Computer Engineering",
    institute: "Government Polytechnic, Miraj",
    duration: "2022 - 2025",
    description: "Completed diploma with strong foundation in computer science fundamentals and programming.",
  },
];

const JourneySection = () => {
  return (
    <section id="journey" className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Where I've Been</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">
          My <span className="gradient-text">Journey</span>
        </h2>
        <div className="w-16 h-1 bg-primary rounded-full mb-12 mx-auto" />
      </motion.div>

      {/* Education Timeline */}
      <div>
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xl font-semibold text-foreground mb-8 flex items-center gap-2 justify-center"
        >
          <GraduationCap className="text-primary" size={24} />
          Education
        </motion.h3>

        <div className="relative max-w-2xl mx-auto ml-4 sm:ml-auto sm:pl-8">
          <div className="absolute left-0 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

          <div className="space-y-10">
            {educationData.map((edu, i) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="relative pl-8"
              >
                <div className="absolute left-0 top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-[0_0_12px_hsl(var(--primary)/0.5)]" />

                <div className="glass-card-hover p-6">
                  <h4 className="text-lg font-semibold text-foreground mb-1">{edu.degree}</h4>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} className="text-secondary" />
                      {edu.institute}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} className="text-accent" />
                      {edu.duration}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{edu.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
