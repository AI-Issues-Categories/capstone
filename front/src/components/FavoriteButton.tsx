import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';
import { useLanguage } from './LanguageContext';

interface FavoriteButtonProps {
  topicId: string;
  topicLabel: string;
}

export function FavoriteButton({ topicId, topicLabel }: FavoriteButtonProps) {
  const { t } = useLanguage();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if topic is favorited
    const favorites = JSON.parse(localStorage.getItem('favoriteTopics') || '[]');
    setIsFavorite(favorites.includes(topicId));
  }, [topicId]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteTopics') || '[]');
    
    if (favorites.includes(topicId)) {
      // Remove from favorites
      const updated = favorites.filter((id: string) => id !== topicId);
      localStorage.setItem('favoriteTopics', JSON.stringify(updated));
      setIsFavorite(false);
      toast.success(t.removedFromFavorites, {
        description: `"${topicLabel}"`,
        duration: 2000
      });
    } else {
      // Add to favorites
      const updated = [...favorites, topicId];
      localStorage.setItem('favoriteTopics', JSON.stringify(updated));
      setIsFavorite(true);
      toast.success(t.addedToFavorites, {
        description: `"${topicLabel}"`,
        duration: 2000
      });
    }
    
    // Dispatch custom event for same-window updates
    window.dispatchEvent(new Event('favoriteTopicsChanged'));
  };

  return (
    <Button
      variant={isFavorite ? 'default' : 'outline'}
      onClick={toggleFavorite}
      className="gap-2"
    >
      <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
      {isFavorite ? t.removeFromFavorites : t.addToFavorites}
    </Button>
  );
}
