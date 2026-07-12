import HeroSection from "@/components/HomePage/HeroSection";
import HowItWorks from "@/components/HomePage/HowItWorks";
import LatestTasksSection from "@/components/HomePage/LatestTasksSection";
import Testimonials from "@/components/HomePage/Testimonials";
import TopFreelancersSection from "@/components/HomePage/TopFreelancersSection";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function Home() {
  return (
    <div className="bg-[#F4EFEA]">
      <HeroSection />
      <ScrollReveal direction="up" delay={0.2}>
        <LatestTasksSection />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={0.2}>
        <TopFreelancersSection />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={0.2}>
        <HowItWorks />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={0.2}>
        <Testimonials />
      </ScrollReveal>
    </div>
  );
}
