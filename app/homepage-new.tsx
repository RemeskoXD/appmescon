import FullScreenSlider from '../components/FullScreenSlider';
import ServicesStrip from '../components/sections/ServicesStrip';
import DigitalEcosystem from '../components/sections/DigitalEcosystem';
import TrustLogos from '../components/sections/TrustLogos';
import ServiceCards from '../components/sections/ServiceCards';
import Testimonials from '../components/sections/Testimonials';
import InnovationCTA from '../components/sections/InnovationCTA';
import PartnerSection from '../components/sections/PartnerSection';
import PartnersLogos from '../components/sections/PartnersLogos';

export default function Home() {
  return (
    <>
      {/* Hero - Úvodní fullscreen slider */}
      <FullScreenSlider />

      {/* Services Strip - Horizontální řada služeb */}
      <ServicesStrip />

      {/* Digital Ecosystem - Propojený digitální ekosystém */}
      <DigitalEcosystem />

      {/* Trust Logos - Loga firem pro důvěryhodnost */}
      <TrustLogos />

      {/* Service Cards - Detailní karty služeb */}
      <ServiceCards />

      {/* Testimonials - Co říkají naši klienti */}
      <Testimonials />

      {/* Innovation CTA - Inovativní řešení */}
      <InnovationCTA />

      {/* Partner Section - Staň se partnerem */}
      <PartnerSection />

      {/* Partners Logos - Loga partnerů */}
      <PartnersLogos />
    </>
  );
}