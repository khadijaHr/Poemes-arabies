import React, { useState, useEffect } from 'react';
import { Heart, Share2, Mail, Facebook, Twitter, MessageCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getLikes, toggleLike, recordView, getViews } from '@/services/api';

interface SocialShareProps {
  poemId: string;
  poemTitle: string;
  poemUrl: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ poemId, poemTitle, poemUrl }) => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [views, setViews] = useState(0);
  const { toast } = useToast();

  // Charger les likes et les vues depuis l'API
  useEffect(() => {
    const loadData = async () => {
      try {
        // Vérifier si l'utilisateur a déjà vu ce poème dans cette session
        const viewedPoems = JSON.parse(sessionStorage.getItem('viewedPoems') || '[]');
        const hasViewed = viewedPoems.includes(poemId);

        // Charger les likes
        const likesData = await getLikes(poemId);
        setLikes(likesData.count);
        setIsLiked(likesData.isLiked);

        // Charger le nombre de vues
        const viewsData = await getViews(poemId);
        setViews(viewsData.count);

        // Si l'utilisateur n'a pas encore vu ce poème dans cette session, enregistrer une vue
        if (!hasViewed) {
          try {
            const viewData = await recordView(poemId);
            setViews(viewData.count);
            
            // Marquer ce poème comme vu dans la session
            sessionStorage.setItem('viewedPoems', JSON.stringify([...viewedPoems, poemId]));
          } catch (error) {
            console.error('Erreur lors de l\'enregistrement de la vue:', error);
          }
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        // Fallback vers localStorage en cas d'erreur
        const globalLikesKey = `poem_global_likes_${poemId}`;
        const storedGlobalLikes = localStorage.getItem(globalLikesKey);
        const globalLikes = storedGlobalLikes ? parseInt(storedGlobalLikes, 10) : 0;
        setLikes(globalLikes);
        
        const userLikedKey = `poem_user_liked_${poemId}`;
        const userHasLiked = localStorage.getItem(userLikedKey) === 'true';
        setIsLiked(userHasLiked);
        
        // Gestion des vues avec sessionStorage
        const sessionViewedKey = `poem_viewed_${poemId}`;
        const hasViewed = sessionStorage.getItem(sessionViewedKey) === 'true';
        
        const viewsKey = `poem_views_${poemId}`;
        const storedViews = localStorage.getItem(viewsKey);
        let currentViews = storedViews ? parseInt(storedViews, 10) : 0;
        
        if (!hasViewed) {
          currentViews += 1;
          localStorage.setItem(viewsKey, currentViews.toString());
          sessionStorage.setItem(sessionViewedKey, 'true');
        }
        
        setViews(currentViews);
      }
    };

    loadData();
  }, [poemId]);

  // Gérer le like
  const handleLike = async () => {
    try {
      const result = await toggleLike(poemId);
      setLikes(result.count);
      setIsLiked(result.isLiked);
      
      toast({
        description: result.isLiked ? "شكراً لإعجابك! ❤️" : "تم إلغاء الإعجاب",
      });
    } catch (error) {
      console.error('Erreur lors de la gestion du like:', error);
      
      // Fallback vers localStorage en cas d'erreur
      const globalLikesKey = `poem_global_likes_${poemId}`;
      const userLikedKey = `poem_user_liked_${poemId}`;
      
      if (isLiked) {
        const newLikes = Math.max(0, likes - 1);
        setLikes(newLikes);
        setIsLiked(false);
        localStorage.setItem(globalLikesKey, newLikes.toString());
        localStorage.setItem(userLikedKey, 'false');
        toast({ description: "تم إلغاء الإعجاب" });
      } else {
        const newLikes = likes + 1;
        setLikes(newLikes);
        setIsLiked(true);
        localStorage.setItem(globalLikesKey, newLikes.toString());
        localStorage.setItem(userLikedKey, 'true');
        toast({ description: "شكراً لإعجابك! ❤️" });
      }
    }
  };

  // Partager sur Facebook
  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(poemUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
    
    toast({
      description: "تم فتح نافذة المشاركة على فيسبوك",
    });
  };

  // Partager sur Twitter
  const shareOnTwitter = () => {
    const text = `${poemTitle} - قصيدة رائعة`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(poemUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
    
    toast({
      description: "تم فتح نافذة المشاركة على تويتر",
    });
  };

  // Partager sur WhatsApp
  const shareOnWhatsApp = () => {
    const text = `${poemTitle} - قصيدة رائعة\n${poemUrl}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    
    toast({
      description: "تم فتح واتساب للمشاركة",
    });
  };

  const shareByEmail = () => {
    const subject = encodeURIComponent("قصيدة جميلة تستحق القراءة");
    const body = encodeURIComponent(`أنصحك بقراءة هذه القصيدة:\n${window.location.href}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };
  

  // Copier le lien
  const copyLink = () => {
    navigator.clipboard.writeText(poemUrl).then(() => {
      toast({
        description: "تم نسخ الرابط بنجاح! 📋",
      });
    }).catch(() => {
      toast({
        description: "فشل نسخ الرابط",
        variant: "destructive",
      });
    });
  };

  return (
    <div className="mt-8 pt-8 border-t border-primary/20">
      {/* Compteur de visiteurs */}
      <div className="flex items-center justify-center gap-2 mb-6 text-muted-foreground">
        <Eye className="h-5 w-5" />
        <span className="text-sm font-arabic">
          {views} {views === 1 ? 'زائر' : 'زائر'}
        </span>
      </div>

      {/* Bouton J'aime et Boutons de partage sur la même ligne */}
      <div className="flex flex-col sm:flex-row items-center justify-evenly gap-2 flex-wrap">
        {/* Bouton J'aime avec compteur */}
        <div className="flex flex-col items-center gap-2">
          <Button
            onClick={handleLike}
            variant={isLiked ? "default" : "outline"}
            size="lg"
            className={`font-arabic text-base px-6 py-3 transition-all duration-300 shadow-md hover:shadow-lg ${
              isLiked 
                ? 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white border-none' 
                : 'border-2 border-rose-400 text-rose-600 hover:bg-rose-50'
            }`}
          >
            <Heart className={`ml-2 h-5 w-5 ${isLiked ? 'fill-current animate-pulse' : ''}`} />
            أعجبني
          </Button>
          {likes > 0 && (
            <span className="text-sm font-semibold text-rose-600">
              {likes} {likes === 1 ? 'إعجاب' : 'إعجابات'}
            </span>
          )}
        </div>

        {/* Séparateur vertical */}
        <div className="hidden sm:block h-16 w-px bg-primary/20"></div>

        {/* Boutons de partage */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Share2 className="h-4 w-4" />
            <span className="text-sm font-arabic">شارك القصيدة</span>
          </div>

          <div className="flex items-center gap-4">           
            {/* Twitter */}
            <button
              onClick={shareOnTwitter}
              title="مشاركة على تويتر"
              className="text-[#b83250] hover:text-[#d24c68] transition-colors duration-300"
            >
              <Twitter className="h-6 w-6" />
            </button>

            {/* Facebook */}
            <button
              onClick={shareOnFacebook}
              title="مشاركة على فيسبوك"
              className="text-[#b83250] hover:text-[#d24c68] transition-colors duration-300"
            >
              <Facebook className="h-6 w-6" />
            </button>
             {/* WhatsApp */}
             <button
              onClick={shareOnWhatsApp}
              title="مشاركة على واتساب"
              className="text-[#b83250] hover:text-[#d24c68] transition-colors duration-300"
            >
              <MessageCircle className="h-6 w-6" />
            </button>

            {/* Copier le lien */}
            <button
              onClick={copyLink}
              title="نسخ الرابط"
              className="text-[#b83250] hover:text-[#d24c68] transition-colors duration-300"
            >
              <Share2 className="h-6 w-6" />
            </button>
            
            {/* Email */}
            <button
            onClick={shareByEmail}
              title="مشاركة عبر البريد الإلكتروني"
              className="text-[#b83250] hover:text-[#d24c68] transition-colors duration-300"
            >
              <Mail className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialShare;
