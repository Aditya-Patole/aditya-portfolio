import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+91 9307513366", href: "tel:+919307513366" },
  { icon: Mail, label: "Email", value: "adityapatole908@gmail.com", href: "mailto:adityapatole908@gmail.com" },
  { icon: MapPin, label: "Location", value: "Sangli, Maharashtra, India", href: "https://maps.google.com/?q=Sangli,Maharashtra,India" },
];

const socials = [
  { icon: FaGithub, href: "https://github.com/Aditya-Patole", label: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/aditya-patole", label: "LinkedIn" },
];

const ConnectSection = () => {
  return (
    <section className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Connect</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">
          Let's Work <span className="gradient-text">Together</span>
        </h2>
        <div className="w-16 h-1 bg-primary rounded-full mb-10 mx-auto" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Contact Details Tabs */}
        <div className="space-y-5">
          {contactInfo.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="group block bg-[#0B1120]/95 hover:bg-[#111827]/95 backdrop-blur-xl rounded-[24px] p-6 border border-[#1e3a8a]/50 hover:border-[#38bdf8]/60 shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(56,189,248,0.18)] transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle top highlight glow */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#1e3a8a] via-[#38bdf8] to-[#c084fc] opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-[18px] bg-[#172554]/80 border border-[#1e3a8a]/50 flex items-center justify-center text-[#38bdf8] shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
                  <item.icon size={24} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1 font-medium">
                    {item.label}
                  </p>
                  <p className="text-white font-bold text-base tracking-wide group-hover:text-[#38bdf8] transition-colors">
                    {item.value}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Social Links Tabs Container */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="group bg-[#0B1120]/95 backdrop-blur-xl rounded-[24px] p-8 border border-[#1e3a8a]/50 hover:border-[#38bdf8]/60 shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(56,189,248,0.18)] transition-all duration-300 relative overflow-hidden flex flex-col items-center justify-center"
        >
          {/* Subtle top highlight glow */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#1e3a8a] via-[#38bdf8] to-[#c084fc] opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#38bdf8] transition-colors duration-200 mb-2">
            Follow Me
          </h3>
          <p className="text-slate-400 text-sm mb-8 text-center leading-relaxed">
            Let's connect on social media and build something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="group/btn flex-1 bg-[#172554]/60 hover:bg-[#1e3a8a]/80 backdrop-blur-xl rounded-[18px] p-4 border border-[#1e3a8a]/50 hover:border-[#38bdf8]/60 shadow-[0_6px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_35px_rgba(56,189,248,0.2)] transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden cursor-pointer"
              >
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#38bdf8] to-[#c084fc] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                <s.icon size={24} className="text-[#38bdf8] group-hover/btn:scale-110 transition-transform duration-300 shrink-0" />
                <span className="text-white font-bold text-base group-hover/btn:text-[#38bdf8] transition-colors">
                  {s.label}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConnectSection;
