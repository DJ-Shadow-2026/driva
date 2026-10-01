import { Circle } from "@/components/sections/circle";
import { Coming } from "@/components/sections/coming";
import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { Founding } from "@/components/sections/founding";
import { Garage } from "@/components/sections/garage";
import { Hero } from "@/components/sections/hero";
import { Nav } from "@/components/sections/nav";
import { Road } from "@/components/sections/road";
import { Share } from "@/components/sections/share";
import { Supporters } from "@/components/sections/supporters";
import { Thesis } from "@/components/sections/thesis";
import { Track } from "@/components/sections/track";
import { Waitlist } from "@/components/sections/waitlist";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Supporters />
        <Thesis />
        <Garage />
        <Track />
        <Share />
        <Circle />
        <Coming />
        <Road />
        <Founding />
        <Waitlist />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
