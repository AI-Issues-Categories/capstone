import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { motion } from 'motion/react';
import { useLanguage } from './LanguageContext';

interface KeywordBubbleCloudProps {
  keywords: { text: string; weight: number }[];
}

export function KeywordBubbleCloud({ keywords }: KeywordBubbleCloudProps) {
  const { t } = useLanguage();
  const [hoveredKeyword, setHoveredKeyword] = useState<string | null>(null);

  // Sort keywords by weight
  const sortedKeywords = [...keywords].sort((a, b) => b.weight - a.weight);

  // Calculate sizes based on weight
  const maxWeight = Math.max(...keywords.map(k => k.weight));
  const minWeight = Math.min(...keywords.map(k => k.weight));

  const getSizeClass = (weight: number) => {
    const normalized = (weight - minWeight) / (maxWeight - minWeight);
    if (normalized > 0.7) return 'text-4xl';
    if (normalized > 0.5) return 'text-3xl';
    if (normalized > 0.3) return 'text-2xl';
    if (normalized > 0.15) return 'text-xl';
    return 'text-base';
  };

  const getOpacity = (weight: number) => {
    const normalized = (weight - minWeight) / (maxWeight - minWeight);
    return 0.4 + (normalized * 0.6);
  };

  return (
    <Card className="border-2 border-gray-200 shadow-lg">
      <CardContent className="pt-6">
        <div className="mb-4">
          <h3 className="text-gray-900 mb-2">🔑 {t.keywordCloud}</h3>
          <p className="text-sm text-gray-600">
            {t.keywordCloudDesc}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl min-h-[200px]">
          {sortedKeywords.map((keyword, idx) => (
            <motion.div
              key={keyword.text}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
              onHoverStart={() => setHoveredKeyword(keyword.text)}
              onHoverEnd={() => setHoveredKeyword(null)}
              className="cursor-pointer"
            >
              <span
                className={`${getSizeClass(keyword.weight)} transition-all duration-200`}
                style={{
                  opacity: hoveredKeyword && hoveredKeyword !== keyword.text ? 0.3 : getOpacity(keyword.weight),
                  color: `hsl(${220 - idx * 10}, 70%, ${40 + idx * 3}%)`,
                  fontWeight: keyword.weight > maxWeight * 0.7 ? 700 : 500
                }}
              >
                {keyword.text}
              </span>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
