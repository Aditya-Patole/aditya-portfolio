import { motion } from "framer-motion";
import { Code2, Lightbulb, Rocket, Heart } from "lucide-react";

const highlights = [
  { icon: Code2, title: "Clean Code", desc: "Writing maintainable, scalable solutions" },
  { icon: Lightbulb, title: "Problem Solver", desc: "Turning ideas into working products" },
  { icon: Rocket, title: "Fast Learner", desc: "Constantly exploring new technologies" },
  { icon: Heart, title: "User Focused", desc: "Building for people, not just machines" },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">
          About <span className="gradient-text">Me</span>
        </h2>
        <div className="w-16 h-1 bg-primary rounded-full mb-10" />
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Story */}
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

        {/* Highlight cards */}
        <div className="grid grid-cols-2 gap-4">
          {highlights.map((item, i) => (
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
