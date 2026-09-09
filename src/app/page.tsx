import { CredibilityStrip } from "@/components/sections/CredibilityStrip";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { LocationContact } from "@/components/sections/LocationContact";
import { Packages } from "@/components/sections/Packages";
import { Proof } from "@/components/sections/Proof";
import { Services } from "@/components/sections/Services";
import { StudioShowcase } from "@/components/sections/StudioShowcase";

/**
 * Home.
 *
 * The conversion story in order: what this is, that it is real, what the rooms
 * look like, what it costs, how to book, who vouches for it, the objections,
 * where it is, and the ask.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <CredibilityStrip />
      <StudioShowcase />
      <Services />
      <Packages />
      <HowItWorks />
      <Proof />
      <Faq />
      <LocationContact />
      <FinalCta />
    </>
  );
}
