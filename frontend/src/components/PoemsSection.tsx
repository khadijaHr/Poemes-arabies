import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PoemCard from './PoemCard';
import { getAllPoems, Poem } from '@/services/api';

const PoemsSection: React.FC = () => {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        setLoading(true);
        const data = await getAllPoems();
        setPoems(data);
        setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement des poèmes:', err);
        setError('Impossible de charger les poèmes. Utilisation des données locales.');
        // Fallback vers les données locales en cas d'erreur
        setPoems(fallbackPoems);
      } finally {
        setLoading(false);
      }
    };

    fetchPoems();
  }, []);

  const fallbackPoems = [
    {
      id: "1",
      title: "رؤية الحبيب",  
      verses: [
        "رأيته يمشي مثل أميرِ الظلام",
        "رأيته يركض مثل فارسٍ شجاع",
        "حسبتُه شبحًا…",
        "لكنه أعزُّ الناسِ في الوجدان",
        "رأيته يتكلم بأدبٍ واحترام",
        "كأنّه مبتدئٌ في لغةِ الكلام"
      ],
      author: "شاعرة الحب — خديجة هرموش"
    },
    {
      id: "2",
      title: "جرحٌ عميق",
      verses: [
        "كلمةٌ جرحت قلبي",
        "كلمةٌ أسكنتني وجعي",
        "كلمةٌ كانت كالسيفِ",
        "شقّت صدرَ الجندي",  
      ],
      author: "شاعرة الحب — خديجة هرموش"
    },
    {
      id: "3",
      title: "أسرار بلا عنوان",
      verses: [
        "كلُّ قلبٍ يحملُ أسرارًا",
        "فما ذنبي… وهذا الانتحار؟",
        "كنتُ في انتظارِك",
        "لتقولَ ما يدورُ في بالكَ من أفكار",
    
        "لتبوحَ بكلامٍ",
        "لا يجرحُ… ولا يُسبّبُ الانهيار",    
      ],
      author: "شاعرة الحب — خديجة هرموش"
    }, 
    {
      id: "4",
      title: "الحب والرياضيات",
      verses: [
        "الحبُّ جعلني أفهمُ الرياضيات",
        "حتى صرتُ من العبقريات",
        "لا، بل من أكبرِ الذكيات",
    
        "لم أدرك أنني بذلتُ كلَّ هذه المجهودات",
        "لأحلَّ تلك النهايات",
      ],
      author: "شاعرة الحب — خديجة هرموش"
    }, 
    {
      id: "5",
      title: "أريد أن أكتبَ له رسالةً",
      verses: [
          "أريد أن أكتبَ فيها أجملَ الكلام",
          "ولو كان ذلك في الأحلام",
          "أريد أن أكتبَ له جملةً تسحره فلا ينام",
          "وذلك من كثرةِ مشاهدةِ الأفلام",
          "أريد أن أكتبَ بجميعِ الأقلام",
      ],     
      author: "شاعرة الحب — خديجة هرموش"
    },
    {
      id: "6",
      title: "سئمتُ الانتظار",
      verses: [
        "سَئِمتُ الانتظار،",
        "ولم أجدِ الوقتَ لأختار،",
        "فطال صبري ليلًا ونهار،",
        "سَئِمتُ الانتظار،",

        "فوجدتُ نفسي ألعبُ بالنار،",
      ],
      author: "شاعرة الحب — خديجة هرموش"
    },
    {
      id: "7",
      title: "سأظل أفكر بالفراق",
      verses: [
        "سأظلّ أفكّرُ بالفِراق،",
        "حتى أقتلَ قلبَهُ بمِطراق،",
        "وأُحلّقَ عاليًا كالأطواق،",
        "سأظلّ أفكّرُ بالفِراق،",
    
        "أنا التي كان قلبُها في احتراق،",
      ],
      author: "شاعرة الحب — خديجة هرموش"
    },
    {
      id: "8",
      title: "النسيان",
      verses: [
        "هبَّت رياحُ النسيان،",
        "على جميعِ الأوطان،",
        "لأنَّ الحبَّ مصدرُ عدوان،",
        "بين عشّاقِ هذا الزمان.",
        
        "قرأتُ هذا في كتابٍ بلا عنوان،",
      ],
      author: "شاعرة الحب — خديجة هرموش"
    },    
    {
      id: "9",
      title: "كل إنسان له عيوب",
      verses: [
        "كلُّ إنسانٍ له عُيوب،",
        "فأنا طيّبة، لكن قلبي حَقود،",
        "أبحثُ عن حُبٍّ بلا قُيود،",
        "فالحريةُ شيءٌ غيرُ موجود.",
    
        "كلُّ إنسانٍ له عُيوب،",
      ],
      author: "شاعرة الحب — خديجة هرموش"
    },      
    {
      id: "10",
      title: "آسفه لن أحب غيره",
      verses: [
        "آسفة... لن أحبَّ غيره،",
        "راضيةٌ، أُطيعُ أمرَه،",
        "خادمةٌ، ومُنايَ أن يلقى هناه،",
        "قاضيةٌ، حكمي رهنُ رضاه.",
    
        "آسفة... لن أحبَّ غيره،",
      ],
      author: "شاعرة الحب — خديجة هرموش"
    },    
    {
      id: "11",
      title: "الوقت الضائع",
      verses: [
        "يمرّ الوقتُ علينا،",
      "ولا زلنا كما كُنّا،",
      "ولا تزال الأبوابُ مُقفلةً أمامنا،",
      "ولا يزال الطريقُ لا يجمعنا.",
  
      "فحينَ تُمطرُ السماء،",
      ],
      author: "شاعرة الحب — خديجة هرموش"
    },
    {
      id: "12",
      title: "الشبح",
      verses: [
        "قلبي يعزف لحن الحب",
        "كلما رأيت طيفك",
        "يرقص على أنغام هواك",
        "ويغني أجمل الأشعار"
      ],
      author: "شاعرة الحب — خديجة هرموش"
    },
    {
      id: "13",
      title: "مصير فتاة أحبت ( الفخر)",
      verses: [
        "نظراً لضعف البصر،",
        "صرتُ أرى صورتَك في الخيال أجملَ منظر،",
        "صرتُ أُحسُّ أن حياتي بدونك سيلحقُها الضرر.",
        "",
        "بعدما رسمتُ لحياتي طريقاً بوضوح،",
        "هذا القلبُ بسرِّه يريد أن يبوح،",
      ],
      author: "شاعرة الحب — خديجة هرموش"
    }
  ];

  const displayedPoems = poems.slice(0, 8);

  if (loading) {
    return (
      <section id="poems" className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-pulse">
            <h2 className="font-decorative text-4xl md:text-5xl text-accent mb-6">
              جاري التحميل...
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="poems" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-decorative text-4xl md:text-5xl text-accent mb-6">
            مختارات من الأشعار
          </h2>
          <div className="ornament-divider text-primary/60">❦ ❦ ❦</div>
          {error && (
            <p className="text-sm text-yellow-600 mt-4">⚠️ {error}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPoems.map((poem, index) => (
            <PoemCard
              key={poem.id}
              id={poem.id}
              title={poem.title}
              verses={poem.verses}
              author={poem.author}
              className="hover:scale-105 transition-transform duration-300"
            />
          ))}
        </div>
        
        {poems.length > 8 && (
          <div className="text-center mt-12">
            <Link to="/poems">
              <Button 
                size="lg" 
                variant="outline"
                className="font-arabic text-lg px-8 py-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                عرض جميع الأشعار ({poems.length})
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default PoemsSection;