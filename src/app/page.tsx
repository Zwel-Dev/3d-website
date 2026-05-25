import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Experience } from '@/components/sections/Experience';
import { Contact } from '@/components/sections/Contact';
import { SectionTransition } from '@/components/sections/SectionTransition';
import { Footer } from '@/components/layout/Footer';
import { ClientBackground } from '@/components/three/ClientBackground';

export default function HomePage() {
  return (
    <>
      <ClientBackground />
      <Hero />
      <SectionTransition text="Crafted in motion" />
      <About />
      <Skills />
      <SectionTransition text="Selected work" />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}
