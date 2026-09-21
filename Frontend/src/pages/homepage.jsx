import Navbar from "../Components/homepage/Navbar";
import HeroSection from "../Components/homepage/HeroSection";
import FeaturesSection from "../Components/homepage/FeaturesSection";
import HowItWorksSection from "../Components/homepage/HowItWorksSection";
import RolesSection from "../Components/homepage/RolesSection";
import CTASection from "../Components/homepage/CTASection";
import Footer from "../Components/homepage/Footer";

function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-100">

      {/* Background Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-500/15 blur-[120px]" />

        <div className="absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[120px]" />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <RolesSection />
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default Home;
