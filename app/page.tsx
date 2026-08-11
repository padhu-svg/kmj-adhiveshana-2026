import HeroSection from "@/sections/HeroSection";
import EventInfoSection from "@/sections/EventInfoSection";
import RegistrationSection from "@/sections/RegistrationSection";
import TempleFrieze from "@/components/TempleFrieze";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TempleFrieze />
      <EventInfoSection />
      <RegistrationSection />
    </>
  );
}
