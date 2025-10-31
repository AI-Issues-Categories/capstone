import { Sparkles, TrendingUp, ArrowRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Topic } from '../App';
import { useLanguage } from './LanguageContext';

interface MainDashboardProps {
  onTopicSelect: (topic: Topic) => void;
  onStartAnalysis?: () => void;
}

export function MainDashboard({ onTopicSelect, onStartAnalysis }: MainDashboardProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-blue-700">{t.welcomeMessage}</span>
        </div>
        <h2 className="text-gray-900">{t.latestTopics}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t.welcomeDesc}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="pt-6">
            <div className="text-2xl mb-1">0</div>
            <div className="text-sm text-blue-100">{t.totalTopics}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardContent className="pt-6">
            <div className="text-2xl mb-1">0</div>
            <div className="text-sm text-green-100">{t.analyzedDocs}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-1 mb-1">
              <TrendingUp className="w-5 h-5" />
              <div className="text-2xl">0</div>
            </div>
            <div className="text-sm text-purple-100">{t.hotTopics}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-1 mb-1">
              <Sparkles className="w-5 h-5" />
              <div className="text-2xl">0</div>
            </div>
            <div className="text-sm text-yellow-100">{t.analyzedDocs}</div>
          </CardContent>
        </Card>
      </div>

      {/* Empty State */}
      <Card className="border-2 border-dashed border-gray-300">
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">{t.noTopicsYet}</h3>
            <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
              {t.noTopicsYetDesc}
            </p>
            <p className="text-sm text-gray-500 mb-6">
              {t.startByAnalyzing}
            </p>
            {onStartAnalysis && (
              <Button 
                onClick={onStartAnalysis}
                size="lg"
                className="gap-2"
              >
                <Sparkles className="w-5 h-5" />
                이슈 분석 시작하기
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
