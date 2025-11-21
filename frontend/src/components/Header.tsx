import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// --- Icônes de remplacement pour l'exemple (Hamburger et Fermer) ---
const MenuIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);
const XIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
// -------------------------------------------------------------------

const Header: React.FC = () => {
  // Gérer l'état d'ouverture/fermeture du menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Basculer l'état du menu et fermer lors de la navigation
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Définir la destination du lien de contact (à adapter selon votre route)
  const contactLink = "/contact"; 

  const menuLinkClasses = "font-arabic text-foreground hover:text-primary transition-colors w-full text-right py-2 border-b border-border/20";
  const lastMenuLinkClasses = "font-arabic text-foreground hover:text-primary transition-colors w-full text-right py-2";

   
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex justify-between items-center">
          {/* Titre/Logo */}
          <div className="font-decorative text-2xl text-primary font-bold">
          أشعار العشق والهيام 
          </div>
          
          {/* Menu de navigation pour les écrans larges (Desktop) */}
          <div className="hidden md:flex space-x-8 space-x-reverse">
            <Link to="/" className="font-arabic text-foreground hover:text-primary transition-colors">
              الرئيسية
            </Link>
            <Link to="/poems" className="font-arabic text-foreground hover:text-primary transition-colors">
              الأشعار
            </Link>
            <Link to="/about" className="font-arabic text-foreground hover:text-primary transition-colors">
             عن الشاعرة
            </Link>
          </div>
          
          <div className="flex items-center">
            {/* Bouton Hamburger pour Mobile */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu} 
              className="md:hidden" 
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </Button>
            
            {/* Bouton "Contactez-nous" (Visible uniquement sur Desktop) */}
            <Link to={contactLink}>
              <Button variant="outline" size="sm" className="font-arabic hidden md:flex">
                تواصل معنا
              </Button>
            </Link>
          </div>

        </nav>
      </div>

      {/* Menu Déroulant pour Mobile (Affichage conditionnel) */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border/50 shadow-lg pb-4">
          <div className="flex flex-col items-end px-6 space-y-2">
            
            {/* Liens du Menu */}
            <Link 
              to="/" 
              onClick={closeMenu} 
              className="font-arabic text-foreground hover:text-primary transition-colors w-full text-right py-2 border-b border-border/20"
            >
              الرئيسية
            </Link>
            
            <Link 
              to="/#poems" 
              onClick={closeMenu} 
              className="font-arabic text-foreground hover:text-primary transition-colors w-full text-right py-2 border-b border-border/20"
            >
              الأشعار
            </Link>
            
            <Link 
              to="/about" 
              onClick={closeMenu} 
              className="font-arabic text-foreground hover:text-primary transition-colors w-full text-right py-2 border-b border-border/20"
            >
              عن الشاعرة
            </Link>
            
            {/* 🎯 Le bouton "تواصل معنا" est maintenant dans le menu mobile */}
             <Link
              to={contactLink}
              onClick={closeMenu}
              // Utilisez le même style de lien, mais retirez la bordure si c'est le dernier élément.
              className={lastMenuLinkClasses + " text-primary font-bold"} 
            >
              تواصل معنا
            </Link>
            
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;