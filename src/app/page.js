import HeroSection from "@/components/HomePage/HeroSection";
import HowItWorks from "@/components/HomePage/HowItWorks";
import LatestTasksSection from "@/components/HomePage/LatestTasksSection";
import Testimonials from "@/components/HomePage/Testimonials";
import TopFreelancersSection from "@/components/HomePage/TopFreelancersSection";

export default function Home() {
  return (
    <div>
      <HeroSection/>
      <LatestTasksSection/>
      <TopFreelancersSection/>
      <HowItWorks/>
      <Testimonials/>
    </div>
  );
}
