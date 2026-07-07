import { motion } from "framer-motion";
import { Monitor, Database, Smartphone, BrainCircuit } from "lucide-react";

interface DomainStyle {
  borderColor: string;
  hoverBorderColor: string;
  iconBg: string;
  iconColor: string;
  titleColor: string;
  hoverTitleColor: string;
  descColor: string;
  glowShadow: string;
  topGlow: string;
}

interface ProfessionalExpertiseItem {
  icon: React.ElementType;
  title: string;
  desc: string;
  style: DomainStyle;
}

const professionalExpertise: ProfessionalExpertiseItem[] = [
  {
    icon: Monitor,
    title: "Full Stack Development",
    desc: "End-to-end web applications with modern frameworks and scalable architectures.",
    style: {
      borderColor: "border-[#1e3a8a]/50",
      hoverBorderColor: "hover:border-[#38bdf8]/60",
      iconBg: "bg-[#172554]/80",
      iconColor: "text-[#38bdf8]",
      titleColor: "text-[#e0f2fe]",
      hoverTitleColor: "group-hover:text-[#38bdf8]",
      descColor: "text-[#94a3b8] group-hover:text-[#cbd5e1]",
      glowShadow: "hover:shadow-[0_12px_40px_rgba(56,189,248,0.2)]",
      topGlow: "from-[#1e3a8a] via-[#38bdf8] to-[#7dd3fc]",
    },
  },
  {
    icon: Database,
    title: "Backend API Architecture",
    desc: "RESTful APIs, database design, and server-side logic with Node.js & Django.",
    style: {
      borderColor: "border-[#115e59]/50",
      hoverBorderColor: "hover:border-[#2dd4bf]/60",
      iconBg: "bg-[#042f2e]/80",
      iconColor: "text-[#2dd4bf]",
      titleColor: "text-[#ccfbf1]",
      hoverTitleColor: "group-hover:text-[#2dd4bf]",
      descColor: "text-[#94a3b8] group-hover:text-[#cbd5e1]",
      glowShadow: "hover:shadow-[0_12px_40px_rgba(45,212,191,0.2)]",
      topGlow: "from-[#0f766e] via-[#2dd4bf] to-[#5eead4]",
    },
  },
  {
    icon: Smartphone,
    title: "Mobile + Web Solutions",
    desc: "Cross-platform mobile apps and responsive progressive web applications.",
    style: {
      borderColor: "border-[#78350f]/50",
      hoverBorderColor: "hover:border-[#fbbf24]/60",
      iconBg: "bg-[#451a03]/80",
      iconColor: "text-[#fbbf24]",
      titleColor: "text-[#fef3c7]",
      hoverTitleColor: "group-hover:text-[#fbbf24]",
      descColor: "text-[#94a3b8] group-hover:text-[#cbd5e1]",
      glowShadow: "hover:shadow-[0_12px_40px_rgba(251,191,36,0.2)]",
      topGlow: "from-[#92400e] via-[#fbbf24] to-[#fcd34d]",
    },
  },
  {
    icon: BrainCircuit,
    title: "Machine Learning",
    desc: "Data-driven solutions with Python, model training, and intelligent automation.",
    style: {
      borderColor: "border-[#581c87]/50",
      hoverBorderColor: "hover:border-[#c084fc]/60",
      iconBg: "bg-[#3b0764]/80",
      iconColor: "text-[#c084fc]",
      titleColor: "text-[#f3e8ff]",
      hoverTitleColor: "group-hover:text-[#c084fc]",
      descColor: "text-[#94a3b8] group-hover:text-[#cbd5e1]",
      glowShadow: "hover:shadow-[0_12px_40px_rgba(192,132,252,0.2)]",
      topGlow: "from-[#6b21a8] via-[#c084fc] to-[#e879f9]",
    },
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Discover More</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">
          About <span className="gradient-text">Me</span>
        </h2>
        <div className="w-16 h-1 bg-primary rounded-full mb-10 mx-auto" />
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left summary tab/card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{ y: -6, scale: 1.01 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="group bg-[#0B1120]/95 backdrop-blur-xl rounded-[24px] p-8 border border-[#1e3a8a]/50 hover:border-[#38bdf8]/60 shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(56,189,248,0.18)] transition-all duration-300 relative overflow-hidden space-y-4"
        >
          {/* Subtle top highlight glow */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#1e3a8a] via-[#38bdf8] to-[#c084fc] opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

          <h3 className="text-xl sm:text-2xl font-extrabold text-[#38bdf8] group-hover:text-[#7dd3fc] transition-colors duration-200">
            My Journey
          </h3>
          <p className="text-[#cbd5e1] group-hover:text-[#f1f5f9] leading-relaxed text-sm sm:text-base transition-colors duration-200">
            I’m a passionate Full Stack Developer specializing in the MERN stack and 
            Android development, focused on building impactful solutions that address 
            real-world problems. I enjoy turning ideas into scalable web and mobile 
            applications that deliver seamless and engaging user experiences.
          </p>
          <p className="text-[#cbd5e1] group-hover:text-[#f1f5f9] leading-relaxed text-sm sm:text-base transition-colors duration-200">
            With hands-on experience in developing interactive systems, including 
            AR-based applications, I aim to create products that are both innovative 
            and user-centric. My approach blends strong technical skills with thoughtful 
            design, ensuring that every solution is efficient, intuitive, and reliable.
          </p>
          <p className="text-[#cbd5e1] group-hover:text-[#f1f5f9] leading-relaxed text-sm sm:text-base transition-colors duration-200">
            From crafting responsive user interfaces to designing scalable backend systems 
            and integrating modern technologies, I am committed to delivering high-quality 
            solutions that create real value and meaningful user impact.
          </p>
        </motion.div>

        {/* Right expertise grid tabs/cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {professionalExpertise.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`group bg-[#0B1120]/95 backdrop-blur-xl rounded-[24px] p-6 text-center min-h-[220px] border ${item.style.borderColor} ${item.style.hoverBorderColor} shadow-[0_8px_30px_rgba(0,0,0,0.4)] ${item.style.glowShadow} transition-all duration-300 relative overflow-hidden flex flex-col items-center justify-center`}
            >
              {/* Subtle top highlight glow */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${item.style.topGlow} opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className={`w-14 h-14 rounded-[18px] ${item.style.iconBg} border ${item.style.borderColor} flex items-center justify-center ${item.style.iconColor} mb-4 shadow-inner group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                <item.icon size={28} />
              </div>
              <h4 className={`font-bold ${item.style.titleColor} ${item.style.hoverTitleColor} transition-colors duration-200 text-lg mb-2`}>
                {item.title}
              </h4>
              <p className={`${item.style.descColor} text-sm leading-relaxed transition-colors duration-200`}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
