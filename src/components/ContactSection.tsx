import { useState, FormEvent, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import StarField from "@/components/3d/StarField";

const EarthModel = lazy(() => import("@/components/3d/EarthModel"));

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedSubject = form.subject.trim();
    const trimmedMessage = form.message.trim();

    // 1. Validate no empty or whitespace-only fields
    if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
      toast.error("Validation Error", {
        description: "Please fill out all fields before sending.",
      });
      return;
    }

    // 2. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Invalid Email", {
        description: "Please enter a valid email address.",
      });
      return;
    }

    // Read EmailJS configuration from environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast.error("Configuration Error", {
        description: "Email service credentials are not configured correctly.",
      });
      console.error("EmailJS Error: Missing environment variables.");
      return;
    }

    setLoading(true);
    try {
      const templateParams = {
        from_name: trimmedName,
        from_email: trimmedEmail,
        subject: trimmedSubject,
        message: trimmedMessage,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      toast.success("Thank you!", {
        description: "Your message has been sent successfully. I'll get back to you as soon as possible.",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("EmailJS Error:", err);
      toast.error("Failed to send your message.", {
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-muted border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 text-sm";

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Star field background */}
      <StarField />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10"
      >
        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Let's Connect</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">
          Contact <span className="gradient-text">Me</span>
        </h2>
        <div className="w-16 h-1 bg-primary rounded-full mb-10 mx-auto" />
      </motion.div>

      <div className="relative z-10 flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-16 max-w-5xl mx-auto">
        {/* ── Contact Form (left, exactly as before) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full lg:w-1/2"
        >
          <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Subject</label>
              <input
                type="text"
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className={inputClass}
                placeholder="What's this about?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputClass} resize-none`}
                placeholder="What's on your mind?"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`btn-primary-gradient w-full inline-flex items-center justify-center gap-2 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* ── 3D Globe (right, desktop only) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:flex items-center justify-center lg:w-1/2"
          style={{ height: 480, marginTop: "25px" }}
        >
          <Suspense fallback={null}>
            <EarthModel />
          </Suspense>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
