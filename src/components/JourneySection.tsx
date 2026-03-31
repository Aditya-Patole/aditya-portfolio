import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar, MapPin } from "lucide-react";

interface Education {
  degree: string;
  institute: string;
  duration: string;
  description: string;
}

interface Certification {
  title: string;
  issuer: string;
  year: string;
}

const educationData: Education[] = [
  {
    degree: "B.Tech in Information Technology",
    institute: "Walchand College of Engineering, Sangli",
    duration: "2025 - Present",
    description:
      "Pursuing Bachelor's degree with focus on software development, algorithms, and modern web technologies.",
  },
  {
    degree: "Diploma in Computer Engineering",
    institute: "Government Polytechnic, Miraj",
    duration: "2022 - 2025",
    description:
      "Completed diploma with strong foundation in computer science fundamentals and programming.",
  },
];

const certifications: Certification[] = [
  {
    title: "Java Programming Certification",
    issuer: "XYZ Platform",
    year: "2024",
  },
  {
    title: "Web Development Bootcamp",
    issuer: "ABC Institute",
    year: "2023",
  },
  {
    title: "Python for Data Science",
    issuer: "Coursera",
    year: "2023",
  },
];

const JourneySection = () => {
  return (
    <section id="journey" className="section-padding">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">
          My <span className="gradient-text">Journey</span>
        </h2>
        <div className="w-16 h-1 bg-primary rounded-full mb-12" />
      </motion.div>

      {/* Education Timeline */}
      <div className="mb-16">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xl font-semibold text-foreground mb-8 flex items-center gap-2"
        >
          <GraduationCap className="text-primary" size={24} />
          Education
        </motion.h3>

        <div className="relative ml-4 sm:ml-8">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

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
                {/* Timeline dot */}
                <div className="absolute left-0 top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-[0_0_12px_hsl(var(--primary)/0.5)]" />

                <div className="glass-card-hover p-6">
                  <h4 className="text-lg font-semibold text-foreground mb-1">
                    {edu.degree}
                  </h4>
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
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications */}
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-xl font-semibold text-foreground mb-8 flex items-center gap-2"
      >
        <Award className="text-secondary" size={24} />
        Certifications
      </motion.h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.12 }}
            className="glass-card-hover p-6 flex flex-col"
          >
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/10 text-secondary mb-4">
              <Award size={20} />
            </div>
            <h4 className="font-semibold text-foreground text-sm mb-1">
              {cert.title}
            </h4>
            <p className="text-muted-foreground text-xs mb-2">{cert.issuer}</p>
            <span className="mt-auto text-xs text-accent font-medium">
              {cert.year}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default JourneySection;
