"use client";

import LandingHero from "@/components/landing/hero";
import LandingNavbar from "@/components/landing/navbar";
import LandingBanner from "@/components/landing/banner";
import LandingFeature from "@/components/landing/feature";
import LandingPricing from "@/components/landing/pricing";
import LandingContact from "@/components/landing/contact";
import LandingFooter from "@/components/landing/footer";
import LandingNavbarMobile from "@/components/landing/navbar-mobile";

export default function LandingPage() {
  return (
    <div className="flex h-full flex-col gap-y-12 lg:gap-y-20">
      <section id="home">
        <LandingNavbar />
        <LandingNavbarMobile />
      </section>
      <LandingHero />
      <LandingBanner />
      <section id="features">
        <LandingFeature />
      </section>
      <section id="pricing">
        <LandingPricing />
      </section>
      <section id="contact">
        <LandingContact />
      </section>
      <LandingFooter />
    </div>
  );
}
