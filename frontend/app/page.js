import Hero from '../components/sections/Hero';
import ProblemSolution from '../components/sections/ProblemSolution';
import ServiceStack from '../components/sections/ServiceStack';
import FeaturedCapabilities from '../components/sections/FeaturedCapabilities';
import WhyUs from '../components/sections/WhyUs';
import Process from '../components/sections/Process';
import AboutTeaser from '../components/sections/AboutTeaser';
import CTASection from '../components/sections/CTASection';

export const metadata = {
  // `absolute` prevents the root layout's "%s | InstaBizWeb" template from
  // appending the brand a second time on the home page.
  title: {
    absolute: 'InstaBizWeb — Digital Solutions for Business Growth',
  },
  description:
    'InstaBizWeb is a technology partner for website development, web and mobile apps, custom software, CRM, ERP and Odoo, business process automation, AI automation, API integration and digital marketing.',
  alternates: { canonical: '/' },
};

/**
 * Home narrative:
 *   hero → the problem → what gets built → capabilities in detail →
 *   why us → how we work → who we are → convert.
 *
 * Section tones alternate dark / muted / light so no two adjacent sections
 * share a background.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <ServiceStack />
      <FeaturedCapabilities />
      <WhyUs />
      <Process />
      <AboutTeaser />
      <CTASection />
    </>
  );
}
