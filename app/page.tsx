import FloatingContact from "@/components/floating-contact";
import Hero from "@/components/hero";
import PageLoader from "@/components/page-loader";
import ScrollProgress from "@/components/scroll-progress";
import SectionContact from "@/components/section-contact";
import SectionCoverage from "@/components/section-coverage";
import SectionFaq from "@/components/section-faq";
import SectionFleet from "@/components/section-fleet";
import SectionIntro from "@/components/section-intro";
import SectionProcess from "@/components/section-process";
import SectionSplitCards from "@/components/section-split-cards";
import SectionTestimonials from "@/components/section-testimonials";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

export default function Home() {
  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <SiteHeader overlay />
      <main className="flex flex-1 flex-col">
        <Hero />
        <SectionIntro />
        <SectionCoverage />
        <SectionProcess />
        <SectionFleet />
        <SectionSplitCards />
        <SectionTestimonials />
        <SectionFaq />
        <SectionContact />
      </main>
      <SiteFooter />
      <FloatingContact />
    </>
  );
}
