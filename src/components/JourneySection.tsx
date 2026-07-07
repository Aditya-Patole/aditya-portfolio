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
          <GraduationCap className="text-[#38bdf8]" size={24} />
          Education
        </motion.h3>

        <div className="relative max-w-2xl mx-auto ml-4 sm:ml-auto sm:pl-8">
          <div className="absolute left-0 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#38bdf8] via-[#8b5cf6] to-[#c084fc]" />

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
                <div className="absolute left-0 top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#38bdf8] border-4 border-[#0f172a] shadow-[0_0_12px_rgba(56,189,248,0.8)]" />

                <motion.div
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="group bg-[#0B1120]/95 backdrop-blur-xl rounded-[24px] p-6 sm:p-8 border border-[#1e3a8a]/50 hover:border-[#38bdf8]/60 shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(56,189,248,0.18)] transition-all duration-300 relative overflow-hidden"
                >
                  {/* Subtle top highlight glow */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#1e3a8a] via-[#38bdf8] to-[#c084fc] opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

                  <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#38bdf8] transition-colors duration-200 mb-2">
                    {edu.degree}
                  </h4>
                  <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-slate-400 mb-4 font-medium">
                    <span className="flex items-center gap-1.5 text-[#38bdf8]">
                      <MapPin size={15} />
                      <span className="text-slate-300">{edu.institute}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-[#c084fc]">
                      <Calendar size={15} />
                      <span className="text-slate-300">{edu.duration}</span>
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                    {edu.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
