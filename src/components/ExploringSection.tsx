import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const exploringItems = [
  { name: "Rust", emoji: "🦀" },
  { name: "Web3 / Solidity", emoji: "⛓️" },
  { name: "Three.js", emoji: "🎨" },
  { name: "Go", emoji: "🐹" },
  { name: "Kubernetes", emoji: "☸️" },
  { name: "Machine Learning", emoji: "🤖" },
  { name: "GraphQL", emoji: "📊" },
  { name: "Edge Computing", emoji: "⚡" },
];

const ExploringSection = () => {
  return (
    <section id="exploring" className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">What's Next</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-2 inline-flex items-center gap-3">
          Currently <span className="gradient-text-accent">Exploring</span>
          <Sparkles className="text-accent" size={28} />
        </h2>
        <div className="w-16 h-1 bg-accent rounded-full mb-10 mx-auto" />
      </motion.div>

      <div className="flex flex-wrap gap-4 justify-center max-w-3xl mx-auto">
        {exploringItems.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            whileHover={{ scale: 1.08, y: -4 }}
            className="glass-card px-5 py-3 flex items-center gap-2.5 cursor-default skill-glow transition-shadow duration-300"
          >
            <span className="text-xl">{item.emoji}</span>
            <span className="text-sm font-medium text-foreground">{item.name}</span>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center text-muted-foreground text-sm mt-8"
      >
        Always learning, always building. The journey never stops. 🚀
      </motion.p>
    </section>
  );
};

export default ExploringSection;
