import Hero from '../components/Hero';
import KeyOfferings from '../components/KeyOfferings';
import ServicesPreview from '../components/ServicesPreview';
import WhyChooseUsPreview from '../components/WhyChooseUsPreview';
import FinalCTA from '../components/FinalCTA';

export const metadata = {
  title: 'InstaBizWeb - Digital Solutions for Business Growth',
  description: 'Enterprise web development, custom CRM/ERP systems, process automation, and digital growth solutions for modern businesses.',
};

export default function Home() {
  return (
    <>
      <Hero />
      <KeyOfferings />
      <ServicesPreview />
      <WhyChooseUsPreview />
      <FinalCTA />
    </>
  );
}
