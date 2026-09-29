import HeroShowroom from "@/components/hero-showroom";
import SectionContact from "@/components/section-contact";
import SectionFaq from "@/components/section-faq";
import SectionIntro from "@/components/section-intro";
import SectionSplitCards from "@/components/section-split-cards";
import SectionTestimonials from "@/components/section-testimonials";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <HeroShowroom />
        <SectionIntro />
        <SectionSplitCards />
        <SectionTestimonials />
        <SectionFaq />
        <SectionContact />
      </main>
      <SiteFooter />
    </>
  );
}