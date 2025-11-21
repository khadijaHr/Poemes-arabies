import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';

interface PoemCardProps {
  id: string;
  title: string;
  verses: string[];
  author?: string;
  className?: string;
}

const PoemCard: React.FC<PoemCardProps> = ({ id, title, verses, author, className = "" }) => {
  // Afficher seulement les 5 premiers vers (lignes non vides)
  const displayedVerses = verses.filter(v => v.trim() !== '').slice(0, 5);
  const hasMore = verses.filter(v => v.trim() !== '').length > 5;

  return (
    <Link to={`/poem/${id}`} className="block">
      <Card className={`poem-container fade-in-up cursor-pointer hover:shadow-lg transition-all duration-300 ${className}`}>
        <div className="poem-title">{title}</div>
        
        <div className="space-y-4">
          {displayedVerses.map((verse, index) => (
            <p key={index} className="poem-verse">
              {verse}
            </p>
          ))}
          {hasMore && (
            <p className="text-center text-primary/60 text-sm italic">...</p>
          )}
        </div>
        
        {author && (
          <>
            <div className="ornament-divider">❦</div>
            <div className="text-center font-decorative text-lg text-muted-foreground mt-6">
              {author}
            </div>
          </>
        )}
        
        <div className="text-center mt-6 text-primary/60 text-sm">
          اضغط للقراءة كاملة
        </div>
      </Card>
    </Link>
  );
};

export default PoemCard;