import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PoemsSection from '@/components/PoemsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-sunset-gradient">
      <Header />
      
      <main>
        <section id="home">
          <Hero />
        </section>
        
        <section id="poems">
          <PoemsSection />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
