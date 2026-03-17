import Navbar from "@/components/Navbar";
import FooterSection from "@/components/landing/FooterSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import SecurityImpactSection from "@/components/landing/SecurityImpactSection";

const Features = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-24">
      <FeaturesSection />
      <SecurityImpactSection />
    </div>
    <FooterSection />
  </div>
);

export default Features;
