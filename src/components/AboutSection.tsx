import { motion } from "framer-motion";
import { Monitor, Database, Smartphone, BrainCircuit } from "lucide-react";

const professionalExpertise = [
  { icon: Monitor, title: "Full Stack Development", desc: "End-to-end web applications with modern frameworks and scalable architectures." },
  { icon: Database, title: "Backend API Architecture", desc: "RESTful APIs, database design, and server-side logic with Node.js & Django." },
  { icon: Smartphone, title: "Mobile + Web Solutions", desc: "Cross-platform mobile apps and responsive progressive web applications." },
  { icon: BrainCircuit, title: "Machine Learning", desc: "Data-driven solutions with Python, model training, and intelligent automation." },
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
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card p-8 space-y-4"
        >
          <h3 className="text-xl font-semibold text-foreground">My Journey</h3>
          <p className="text-muted-foreground leading-relaxed">
            I'm a passionate Full Stack Developer who fell in love with programming through
            building small tools and automating everyday tasks. What started as curiosity
            quickly turned into a career dedicated to crafting meaningful digital products.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Today, I focus on building modern web applications with React, Node.js, and
            cloud technologies. I believe the best software is built at the intersection
            of great engineering and thoughtful design.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            When I'm not coding, you'll find me exploring open-source projects, learning
            about system design, or experimenting with new frameworks and tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {professionalExpertise.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="glass-card-hover p-6 text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-3">
                <item.icon size={24} />
              </div>
              <h4 className="font-semibold text-foreground text-sm mb-1">{item.title}</h4>
              <p className="text-muted-foreground text-xs">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
