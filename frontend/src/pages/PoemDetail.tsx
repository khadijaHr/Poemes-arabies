import React, { useState, useRef, useEffect } from 'react'; 
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mic, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SocialShare from '@/components/SocialShare';
import CommentSection from '@/components/CommentSection';
import { getPoemById, Poem } from '@/services/api';

// Extended poem data with complete versions
const PoemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [poem, setPoem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null); // Ref pour l'objet Audio

  // Charger le poème depuis l'API
  // useEffect(() => {
  //   const fetchPoem = async () => {
  //     if (!id) return;
      
  //     try {
  //       setLoading(true);
  //       const data = await getPoemById(id);
  //       setPoem(data);
  //       setError(null);
  //     } catch (err) {
  //       console.error('Erreur lors du chargement du poème:', err);
  //       setError('Impossible de charger le poème.');
  //       // Fallback vers les données locales
  //       const fallbackPoem = poemsDatabase.find(p => p.id === id);
  //       setPoem(fallbackPoem);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPoem();
  // }, [id]);
  useEffect(() => {
  const fetchPoem = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await getPoemById(id);
      setPoem(data);
    } catch (err) {
      console.error('Erreur lors du chargement du poème:', err);
      setError('Impossible de charger le poème. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };

  fetchPoem();
}, [id]);

  // Nettoyer la lecture audio quand le composant se démonte ou l'ID change
  React.useEffect(() => {
    // Fonction de nettoyage
    return () => {
      // Arrêter la lecture TTS existante
      window.speechSynthesis.cancel(); 
      
      // Mettre en pause et libérer la ressource Audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null; // Libère l'objet
      }
    };
  }, [id]); // Dépendance à l'ID du poème


  // Remplacez votre handlePlayPoem existant par ceci
  const handlePlayPoem = () => {
    if (!poem || !poem.audio) return;

    if (isPlaying) {
      // 1. Si déjà en train de jouer (isPlaying est true), on met en pause l'instance stockée
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      // 2. Si non en train de jouer (isPlaying est false), on démarre/reprend la lecture
      
      // a. Créez l'instance si elle n'existe pas encore
      if (!audioRef.current) {
        const audio = new Audio(poem.audio);
        audioRef.current = audio;

        // b. Définir les gestionnaires d'événements UNIQUEMENT lors de la première création
        audio.onended = () => {
          setIsPlaying(false); // Arrêter le statut de lecture lorsque l'audio se termine
        };
        audio.onerror = () => {
          setIsPlaying(false);
          console.error("Erreur lors de la lecture de l'audio");
        };
      }

      // c. Commencer la lecture
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Erreur lors du démarrage de l'audio", error);
          setIsPlaying(false);
        });
    }
  };
  

  if (loading) {
    return (
      <div className="min-h-screen bg-sunset-gradient">
        <Header />
        <main className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-pulse">
              <h1 className="font-decorative text-3xl text-primary mb-8">جاري تحميل القصيدة...</h1>
              <div className="ornament-divider text-primary/60">❦ ❦ ❦</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!poem) {
    return (
      <div className="min-h-screen bg-sunset-gradient">
        <Header />
        <main className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-decorative text-3xl text-primary mb-8">القصيدة غير موجودة</h1>
            {error && <p className="text-yellow-600 mb-4">⚠️ {error}</p>}
            <Link to="/">
              <Button variant="outline">العودة للصفحة الرئيسية</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sunset-gradient">
      <Header />
      
      <main className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link to="/#poems">
              <Button variant="ghost" className="text-primary hover:text-white/80">
                <ArrowLeft className="ml-2 h-4 w-4" />
                العودة إلى الأشعار
              </Button>
            </Link>
          </div>

          {/* Poem Details */}
          <Card className="poem-container fade-in-up">
            {/* Poem Header */}
            <div className="text-center mb-12">
              <h1 className="poem-title text-4xl md:text-5xl mb-4">
                {poem.title}
              </h1>
              <div className="ornament-divider text-primary/60 mb-6">❦ ❦ ❦</div>
              {poem.description && <p className="text-muted-foreground text-lg mb-2">{poem.description}</p>}
              {(poem.theme || poem.writtenDate) && (
                <div className="flex justify-center gap-6 text-sm text-muted-foreground">
                  {poem.theme && <span>الموضوع: {poem.theme}</span>}
                  {poem.writtenDate && <span>تاريخ الكتابة: {poem.writtenDate}</span>}
                </div>
              )}
              {error && <p className="text-sm text-yellow-600 mt-4">⚠️ {error}</p>}
            </div>

            {/* Poem Content */}
            <div className="space-y-6 mb-12">
              {/* Audio Button */}
              <div className="text-center mb-8">
                {poem.audio ? (
                  <Button 
                    onClick={handlePlayPoem}
                    variant="outline"
                    size="lg"
                    className="font-arabic text-lg px-8 py-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="ml-2 h-5 w-5" />
                        إيقاف الاستماع
                      </>
                    ) : (
                      <>
                        <Mic className="ml-2 h-5 w-5" />
                        استمع إلى القصيدة
                      </>
                    )}
                  </Button>
                ) : (
                  <div className="text-muted-foreground text-sm">
                    <Mic className="h-5 w-5 mx-auto mb-2" />
                    <p>الاستماع غير disponible pour cette القصيدة</p>
                  </div>
                )}
              </div>

              {poem.verses.map((verse, index) => (
                verse === "" ? (
                  <div key={index} className="h-4"></div>
                ) : (
                  <p key={index} className="poem-verse text-center leading-relaxed">
                    {verse}
                  </p>
                )
              ))}
            </div>

            {/* Author */}
            <div className="text-center">
              <div className="ornament-divider">❦</div>
              <div className="font-decorative text-xl text-muted-foreground mt-6">
                {poem.author}
              </div>
            </div>

            {/* Social Share and Like */}
            <SocialShare 
              poemId={poem.id}
              poemTitle={poem.title}
              poemUrl={window.location.href}
            />

            {/* Comment Section */}
            <CommentSection poemId={poem.id} />
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PoemDetail;