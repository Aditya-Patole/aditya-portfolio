import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  BrainCircuit,
  Box,
  Trophy,
  Layers,
  Smartphone,
} from "lucide-react";

type ProjectDomain = "ANDROID" | "AI/ML" | "AR" | "JAVA";

interface Project {
  title: string;
  domain: ProjectDomain;
  icon: React.ElementType;
  description: string;
  keyFeatures: string[];
  techStack: string[];
}

const projects: Project[] = [
  {
    title: "TeachConnect – Smart Classroom Management & Interactive Learning Platform",
    domain: "ANDROID",
    icon: GraduationCap,
    description:
      "A comprehensive Android-based classroom management platform that enables teachers and students to collaborate through live classes, assignments, attendance tracking, quizzes, and interactive learning. Designed to enhance digital education with secure cloud integration and engaging learning experiences.",
    keyFeatures: [
      "GPS-based attendance validation",
      "Classroom & student management",
      "Assignments, quizzes & polls",
      "Live meetings with Jitsi SDK",
      "Real-time chat & notifications",
      "Interactive video learning with MCQ checkpoints",
      "Firebase authentication & cloud synchronization",
    ],
    techStack: [
      "Java",
      "XML",
      "Firebase Firestore",
      "Google Maps API",
      "Media3 ExoPlayer",
      "Jitsi SDK",
    ],
  },
  {
    title: "MeetIQ – AI Powered Live Meeting Intelligence System",
    domain: "AI/ML",
    icon: BrainCircuit,
    description:
      "An AI-powered desktop meeting assistant that captures conversations in real time, generates intelligent summaries, extracts action items, and provides meeting insights using speech recognition and large language models.",
    keyFeatures: [
      "Real-time speech transcription",
      "AI-generated meeting summaries",
      "Automatic action item extraction",
      "Screen context & visual analysis",
      "Transcript and meeting history dashboard",
      "Intelligent meeting documentation",
    ],
    techStack: [
      "Electron",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "OpenAI Whisper",
      "Groq AI",
    ],
  },
  {
    title: "AR-Based Furniture Shop Management System",
    domain: "AR",
    icon: Box,
    description:
      "An augmented reality furniture shopping platform that allows customers to visualize furniture in their own space before purchasing. It combines AR visualization with inventory management and a modern shopping experience.",
    keyFeatures: [
      "AR furniture preview in real space",
      "Product & inventory management",
      "User authentication & authorization",
      "Shopping cart & order processing",
      "Responsive web interface",
      "REST API integration",
    ],
    techStack: [
      "React.js",
      "Django",
      "MongoDB",
      "Android Studio",
      "AR Technology",
    ],
  },
  {
    title: "QuizArena – Real-Time Multiplayer Quiz System",
    domain: "JAVA",
    icon: Trophy,
    description:
      "A client-server based multiplayer quiz application that enables multiple users to participate in quizzes simultaneously. It features synchronized communication, real-time leaderboard updates, and secure server-side response storage for accurate evaluation and ranking.",
    keyFeatures: [
      "Multi-client quiz participation using Socket Programming",
      "Real-time leaderboard based on score, attempts & completion time",
      "Secure synchronized client-server communication",
      "Server-side storage of participant responses",
      "Automatic quiz timer & submission handling",
      "Teacher dashboard for quiz management",
      "Interactive Java Swing user interface",
    ],
    techStack: [
      "Java",
      "Java Swing",
      "Socket Programming",
      "Multithreading",
      "TCP/IP Networking",
      "File Handling",
    ],
  },
];

interface DomainStyle {
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  hoverBorderColor: string;
  iconBg: string;
  iconColor: string;
  glowShadow: string;
  bulletColor: string;
}

const domainStyles: Record<ProjectDomain, DomainStyle> = {
  ANDROID: {
    badgeBg: "bg-[#172554]",
    badgeText: "text-[#3a86ff]",
    borderColor: "border-[#1e3a8a]/50",
    hoverBorderColor: "hover:border-[#3a86ff]/60",
    iconBg: "bg-[#172554]/80",
    iconColor: "text-[#3a86ff]",
    glowShadow: "hover:shadow-[0_12px_40px_rgba(58,134,255,0.15)]",
    bulletColor: "text-[#3a86ff]",
  },
  "AI/ML": {
    badgeBg: "bg-[#3b0764]",
    badgeText: "text-[#c084fc]",
    borderColor: "border-[#581c87]/50",
    hoverBorderColor: "hover:border-[#c084fc]/60",
    iconBg: "bg-[#3b0764]/80",
    iconColor: "text-[#c084fc]",
    glowShadow: "hover:shadow-[0_12px_40px_rgba(192,132,252,0.15)]",
    bulletColor: "text-[#c084fc]",
  },
  AR: {
    badgeBg: "bg-[#064e3b]",
    badgeText: "text-[#2ec4b6]",
    borderColor: "border-[#0f2d24]",
    hoverBorderColor: "hover:border-[#2ec4b6]/60",
    iconBg: "bg-[#0f2d24]/90",
    iconColor: "text-[#2ec4b6]",
    glowShadow: "hover:shadow-[0_12px_40px_rgba(46,196,182,0.18)]",
    bulletColor: "text-[#2ec4b6]",
  },
  JAVA: {
    badgeBg: "bg-[#451a03]",
    badgeText: "text-[#fbbf24]",
    borderColor: "border-[#78350f]/50",
    hoverBorderColor: "hover:border-[#fbbf24]/60",
    iconBg: "bg-[#451a03]/80",
    iconColor: "text-[#fbbf24]",
    glowShadow: "hover:shadow-[0_12px_40px_rgba(251,191,36,0.15)]",
    bulletColor: "text-[#fbbf24]",
  },
};

const tabs: { label: "All" | ProjectDomain; icon: React.ElementType }[] = [
  { label: "All", icon: Layers },
  { label: "ANDROID", icon: Smartphone },
  { label: "AI/ML", icon: BrainCircuit },
  { label: "AR", icon: Box },
  { label: "JAVA", icon: Trophy },
];

const ProjectCard = ({ project }: { project: Project }) => {
  const style = domainStyles[project.domain];
  const Icon = project.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`group bg-[#0B1120]/95 backdrop-blur-xl rounded-[24px] p-6 sm:p-8 border ${style.borderColor} ${style.hoverBorderColor} shadow-[0_8px_30px_rgba(0,0,0,0.4)] ${style.glowShadow} transition-all duration-300 flex flex-col h-full`}
    >
      {/* 1. Header Section */}
      <div className="flex items-start gap-4 sm:gap-5 mb-6">
        <div
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-[18px] ${style.iconBg} border ${style.borderColor} flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300`}
        >
          <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${style.iconColor}`} />
        </div>
        <div className="flex flex-col items-start min-w-0 flex-1">
          <h3 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] tracking-tight leading-snug mb-2.5">
            {project.title}
          </h3>
          <span
            className={`inline-block px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider rounded-md ${style.badgeBg} ${style.badgeText} border ${style.borderColor} shadow-sm`}
          >
            {project.domain}
          </span>
        </div>
      </div>

      {/* 2. Body Section */}
      <div className="mb-8 flex-1">
        <p className="text-[#94a3b8] text-sm sm:text-[15px] leading-[1.7] mb-6 font-normal">
          {project.description}
        </p>

        <div>
          <h4 className="text-xs sm:text-sm font-bold text-[#64dfdf] uppercase tracking-wider mb-3 flex items-center gap-2">
            Key Features
          </h4>
          <ul className="space-y-2 sm:space-y-2.5">
            {project.keyFeatures.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start text-[#94a3b8] text-sm leading-[1.7]"
              >
                <span
                  className={`${style.bulletColor} mr-2.5 font-bold text-base leading-[1.4] shrink-0`}
                >
                  •
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 3. Footer Section */}
      <div className="mt-auto pt-6 border-t border-slate-800/60">
        <h4 className="text-xs sm:text-sm font-bold text-[#64dfdf] uppercase tracking-wider mb-3">
          Tech Stack
        </h4>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 text-xs font-medium rounded-full bg-[#1e293b]/80 text-[#e2e8f0] border border-slate-700/50 group-hover:border-slate-600 group-hover:bg-[#1e293b] transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [active, setActive] = useState<"All" | ProjectDomain>("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.domain === active);

  return (
    <section id="projects" className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">
          Things I've Built
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <div className="w-16 h-1 bg-primary rounded-full mb-10 mx-auto" />
      </motion.div>

      {/* Filter Tabs */}
      <div className="mb-10 flex flex-wrap gap-2 justify-center">
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

      {/* Projects Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;

