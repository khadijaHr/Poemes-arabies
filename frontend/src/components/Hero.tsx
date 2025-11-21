import React from 'react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-background.png';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="fade-in-up">
          <h1 className="font-decorative text-5xl md:text-7xl lg:text-8xl text-primary mb-6 leading-tight">
            أشعار العشق والهيام
          </h1>
          
          <p className="font-arabic text-xl md:text-2xl text-foreground/80 mb-8 leading-relaxed max-w-2xl mx-auto">
            مجموعة من أجمل الأشعار العربية في الحب والرومانسية
          </p>
          
          <div className="ornament-divider text-primary/60 text-4xl mb-8">
            ❦ ❦ ❦
          </div>
          
          <p className="font-arabic text-xl md:text-2xl text-foreground/80 mb-8 leading-relaxed max-w-2xl mx-auto">
          بِقَلَمِ الشَّاعِرَةِ: خَدِيجَة هرموش   
          </p>
                 
          <Button 
            size="lg" 
            className="font-arabic text-lg px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground shadow-romantic hover:shadow-xl transition-all duration-300 rounded-xl"
            onClick={() => {
              const poemsSection = document.getElementById('poems');
              poemsSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            اكتشف الأشعار
          </Button>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 text-primary/20 text-6xl animate-pulse">♥</div>
      <div className="absolute bottom-32 right-16 text-primary/15 text-4xl animate-pulse delay-1000">❀</div>
      <div className="absolute top-1/3 right-32 text-primary/25 text-3xl animate-pulse delay-500">♥</div>
    </section>
  );
};

export default Hero;