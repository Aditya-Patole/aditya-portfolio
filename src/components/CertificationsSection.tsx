import { motion } from "framer-motion";
import { Award } from "lucide-react";

interface Certification {
  title: string;
  issuer: string;
  year: string;
}

const certifications: Certification[] = [
  { title: "Java Programming Certification", issuer: "XYZ Platform", year: "2024" },
  { title: "Web Development Bootcamp", issuer: "ABC Institute", year: "2023" },
  { title: "Python for Data Science", issuer: "Coursera", year: "2023" },
];

const CertificationsSection = () => {
  return (
    <section id="certifications" className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Achievements</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">
          My <span className="gradient-text">Certifications</span>
        </h2>
        <div className="w-16 h-1 bg-primary rounded-full mb-10 mx-auto" />
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
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
            <h4 className="font-semibold text-foreground text-sm mb-1">{cert.title}</h4>
            <p className="text-muted-foreground text-xs mb-2">{cert.issuer}</p>
            <span className="mt-auto text-xs text-accent font-medium">{cert.year}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CertificationsSection;
