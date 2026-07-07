import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
const certPdf = "/imp_files/WebDevelopmentCertificate.pdf";

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
        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">
          Achievements & Credentials
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">
          My{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#38bdf8] to-[#c084fc]">
            Certifications
          </span>
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-[#38bdf8] to-[#c084fc] rounded-full mb-12 mx-auto" />
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <motion.a
          href={certPdf}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          whileHover={{ y: -6, scale: 1.01 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="group block bg-[#0B1120]/95 backdrop-blur-xl rounded-[24px] p-6 sm:p-8 border border-[#1e3a8a]/50 hover:border-[#38bdf8]/60 shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(56,189,248,0.18)] transition-all duration-300 cursor-pointer relative overflow-hidden"
        >
          {/* Subtle top highlight glow */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#1e3a8a] via-[#38bdf8] to-[#c084fc] opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="flex items-center gap-4 sm:gap-6">
            {/* Certificate Icon Container */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[18px] bg-[#172554]/80 border border-[#1e3a8a]/50 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
              <Award className="w-7 h-7 sm:w-8 sm:h-8 text-[#38bdf8]" />
            </div>

            {/* Certificate Info */}
            <div className="flex flex-col items-start min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1.5 w-full justify-between">
                <h3 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] tracking-tight leading-snug truncate group-hover:text-[#38bdf8] transition-colors duration-200">
                  MERN Stack Development
                </h3>
              </div>
              <div className="flex items-center gap-3 text-sm sm:text-base">
                <span className="font-medium text-[#38bdf8]">
                  Issued by Udemy
                </span>
                <span className="text-slate-600">•</span>
                <span className="inline-flex items-center gap-1 text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                  <span>Click to view PDF</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </span>
              </div>
            </div>

            {/* Year Badge */}
            <span className="inline-block px-3.5 py-1.5 text-xs sm:text-sm font-extrabold tracking-wider rounded-xl bg-[#0f172a] text-[#c084fc] border border-[#581c87]/50 shadow-sm shrink-0">
              2025
            </span>
          </div>
        </motion.a>
      </div>
    </section>
  );
};

export default CertificationsSection;
