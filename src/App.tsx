import { useState, useEffect } from 'react';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import GlobalCanvas from './components/GlobalCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isLoading]);

  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden">
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <>
          <CustomCursor />
          <GlobalCanvas />
          
          {/* Overlays */}
          <div className="fixed inset-0 z-[1000] pointer-events-none scanlines opacity-40" />
          <div className="fixed inset-0 z-[1001] pointer-events-none noise animate-noise" />
          
          <Navbar />
          
          <div id="content-wrap" className="glitch-wrapper">
            <Hero />
            <Marquee />
            <Services />
            <Portfolio />
            <Process />
            <Contact />
            <Footer />
          </div>
        </>
      )}
    </main>
  );
}
