"use client";
import { useState } from 'react';
import FullScreenSlider from '../components/FullScreenSlider';
import DigitalEcosystemNew from '../components/sections/DigitalEcosystemNew';
import TrustedBySection from '../components/sections/TrustedBySection';
import DigitalFoundationSection from '../components/sections/DigitalFoundationSection';
import TestimonialsNew from '../components/sections/TestimonialsNew';
import StatsSection from '../components/sections/StatsSection';
import TeamGridSection from '../components/sections/TeamGridSection';
import CEOSection from '../components/sections/CEOSection';
import PartnerCallSection from '../components/sections/PartnerCallSection';
import PartnerBadgesSlider from '../components/sections/PartnerBadgesSlider';
import RegisterPanel from '../components/RegisterPanel';

export default function Home() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <main className="relative overflow-hidden">
      {/* Full Screen Slider */}
      <FullScreenSlider />

      {/* Digital Ecosystem Section */}
      <DigitalEcosystemNew />

      {/* Trusted By Section */}
      <TrustedBySection />

      {/* Digital Foundation Section */}
      <DigitalFoundationSection />

  {/* Testimonials Section */}
  <TestimonialsNew />

  {/* Stats Section (count-up metrics) */}
  <StatsSection />

  {/* Team & Career Grid */}
  <TeamGridSection />

  {/* CEO Section */}
  <CEOSection />

      {/* Partner Call Section */}
      <PartnerCallSection onRegister={() => setShowRegister(true)} />

      {/* Partner Badges Slider */}
      <PartnerBadgesSlider />

      {/* Register Panel */}
      {showRegister && (
        <RegisterPanel
          open={showRegister}
          onClose={() => setShowRegister(false)}
        />
      )}
    </main>
  );
}