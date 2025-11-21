import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';

const AboutAuthor: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="font-decorative text-5xl text-primary my-4 fade-in-up">
              عن الشاعرة 
            </h1>
            <div className="ornament-divider text-3xl">❦</div>
          </div>

          <Card className="poem-container fade-in-up max-w-3xl mx-auto">
            <div className="space-y-6 text-center">
              <div className="w-32 h-32 mx-auto bg-[#691b1c] from-primary/20 to-secondary/30 rounded-full flex items-center justify-center mb-8">
                <span className="text-4xl"><img src='/logo.png'/></span>
              </div>
              
              <h2 className="font-decorative text-3xl text-primary mb-6">
                شاعرة العشق والغرام
              </h2>
              
              <div className="space-y-4 font-arabic text-lg leading-relaxed">
                <p className="poem-verse">
                خديجة هرموش شاعرة مبدعة تنسج من الحروف عالماً من الضوء والعطر، تغوص في أعماق القلب 
                </p>
                
                <p className="poem-verse">
                 لتستخرج أجمل المشاعر وأنقاها، تتميز قصائدها بالعمق الروحاني والجمال اللغوي،   
                </p>

                <p className="poem-verse">                
                حيث ترسم بالكلمات لوحاتٍ فنية تنبض بالعاطفة وتأسِر القلوب، تستلهم شعرها من الطبيعة  
                </p>
                
                <p className="poem-verse"> ومن دفء الحب الصادق، فتحوّل المشاعر إلى أبياتٍ خالدة تبقى في الذاكرة وتُضيء دروب العاشقين 
                </p>
                
                <div className="ornament-divider">❦</div>
                
                <h3 className="font-decorative text-2xl text-primary mt-8 mb-4">
                  رحلة الإبداع
                </h3>
                
                <p className="poem-verse">
                بدأتُ رحلتي الشعرية في سنٍّ مبكرة، حين تفتَّحت موهبتي على أصوات الطبيعة ونسائم الحب
                </p>
                
                <p className="poem-verse">
                أؤمن بأن الشعر رسالةٌ سامية، تنقل أجمل المشاعر وتربط بين قلوب المحبين في كل مكان 
                </p>
                
                <p className="poem-verse">
                كتبتُ العديد من القصائد التي لامست أرواح القرّاء وأصبحت جزءًا من ذاكرة الحب العربي 
                </p>

              </div>
              
              <div className="ornament-divider text-2xl">❦</div>
              
              <div className="bg-[#691b1c] from-primary/10 to-secondary/10 rounded-lg p-6 mt-8">
                <p className="font-decorative text-xl text-[#FFE7E7] italic">
                  "الشعر هو لغة القلب التي تتجاوز حدود الكلام وتصل إلى أعماق الروح"
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutAuthor;