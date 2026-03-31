import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import JourneySection from "@/components/JourneySection";
import ExpertiseSection from "@/components/ExpertiseSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExploringSection from "@/components/ExploringSection";
import ContactSection from "@/components/ContactSection";
import ConnectSection from "@/components/ConnectSection";
import CertificationsSection from "@/components/CertificationsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <JourneySection />
      <ExpertiseSection />
      <ProjectsSection />
      <ExploringSection />
      <ContactSection />
      <ConnectSection />
      <CertificationsSection />
      <Footer />
    </div>
  );
};

export default Index;
