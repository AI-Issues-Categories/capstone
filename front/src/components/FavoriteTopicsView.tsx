import { useState, useEffect } from 'react';
import { Star, ArrowRight, Home } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { FavoriteButton } from './FavoriteButton';
import { Topic } from '../App';
import { mockTopics } from './mockData';
import { useLanguage } from './LanguageContext';

interface FavoriteTopicsViewProps {
  onTopicSelect: (topic: Topic) => void;
  onGoHome: () => void;
}

export function FavoriteTopicsView({ onTopicSelect, onGoHome }: FavoriteTopicsViewProps) {
  const { t } = useLanguage();
  const [favoriteTopicIds, setFavoriteTopicIds] = useState<string[]>([]);

  useEffect(() => {
    loadFavorites();
    
    const handleFavoritesChanged = () => {
      loadFavorites();
    };
    
    window.addEventListener('favoriteTopicsChanged', handleFavoritesChanged);
    return () => window.removeEventListener('favoriteTopicsChanged', handleFavoritesChanged);
  }, []);

  const loadFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteTopics') || '[]');
    setFavoriteTopicIds(favorites);
  };

  const favoriteTopics = mockTopics.filter(topic => favoriteTopicIds.includes(topic.id));

  const getStanceLabel = (stance: string) => {
    switch (stance) {
      case 'support': return t.supportMost;
      case 'oppose': return t.opposeMost;
      case 'alternative': return t.alternativeSuggested;
      default: return t.diverseOpinions;
    }
  };

  const getStanceColor = (stance: string) => {
    switch (stance) {
      case 'support': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'oppose': return 'bg-red-100 text-red-700 border-red-200';
      case 'alternative': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (favoriteTopics.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
          <Star className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-gray-900 mb-3">{t.noFavorites}</h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto whitespace-pre-line">
          {t.noFavoritesDesc}
        </p>
        <Button 
          size="lg" 
          onClick={onGoHome}
          className="gap-2"
        >
          <Home className="w-4 h-4" />
          {t.browseTopics}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-full">
          <Star className="w-4 h-4 text-yellow-600 fill-current" />
          <span className="text-sm text-yellow-700">{favoriteTopics.length}{t.totalFavorites}</span>
        </div>
        <h2 className="text-gray-900">{t.myFavorites}</h2>
        <p className="text-gray-600">
          {t.manageDesc}
        </p>
      </div>

      <div className="grid gap-4">
        {favoriteTopics.map((topic) => (
          <Card key={topic.id} className="hover:shadow-xl transition-all border-2 hover:border-yellow-300">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-yellow-500 fill-current flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`px-3 py-1 rounded-full text-sm border ${getStanceColor(topic.stance)}`}>
                          {getStanceLabel(topic.stance)}
                        </div>
                      </div>
                      <h4 className="text-gray-900 mb-3">{topic.label}</h4>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {topic.keywords.slice(0, 5).map((keyword, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                          >
                            #{keyword}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>📄 {topic.documentCount}{t.documentsCount}</span>
                        <span>•</span>
                        <span>⏰ {topic.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 justify-start w-40">
                  <FavoriteButton topicId={topic.id} topicLabel={topic.label} />
                  <Button 
                    size="sm" 
                    className="gap-2"
                    onClick={() => onTopicSelect(topic)}
                  >
                    {t.viewDetails}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
