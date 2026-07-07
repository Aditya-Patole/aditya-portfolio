import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Briefcase, Mail } from "lucide-react";

const ProgrammerModel = lazy(() => import("@/components/3d/ProgrammerModel"));

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
      {/* ── Programmer Model (Background) ── */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <ProgrammerModel />
        </Suspense>
      </div>

      {/* ── Hero Text (Centered, overlapping the 3D model) ── */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-12 px-4 max-w-7xl mx-auto w-full pointer-events-none mt-10">
        <div className="text-center max-w-3xl mx-auto pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium border border-primary/30 text-primary mb-6 tracking-wider uppercase bg-background/50 backdrop-blur-sm">
              Available for work
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
          >
            <span className="text-secondary">Hi, I'm</span>{" "}
            <span className="gradient-text drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">Aditya Patole</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg sm:text-xl text-primary mb-3 font-semibold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-wide"
          >
            Full Stack Developer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-blue-50/90 mb-10 max-w-lg mx-auto drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
          >
            I craft digital experiences that blend clean code with thoughtful design.
            Turning complex problems into elegant, user-friendly solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#projects" className="btn-primary-gradient inline-flex items-center gap-2 justify-center shadow-xl">
              <Briefcase size={18} />
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 justify-center px-6 py-3 rounded-xl border border-border/50 text-foreground font-semibold hover:border-primary/40 hover:bg-background/40 transition-all duration-300 hover:-translate-y-0.5 shadow-lg bg-background/40 backdrop-blur-sm"
            >
              <Mail size={18} />
              Contact Me
            </a>

          </motion.div>
        </div>
      </div>

      {/* Mouse scroll indicator — centered at bottom */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-7 h-11 rounded-full border-2 border-muted-foreground/50 flex items-start justify-center p-1.5 backdrop-blur-md bg-background/20">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </div>
      </motion.a>
    </section>
  );
};

export default HeroSection;
