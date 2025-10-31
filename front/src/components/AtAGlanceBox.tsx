import { Sparkles, ThumbsUp, ThumbsDown, Lightbulb } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { useLanguage } from './LanguageContext';

interface AtAGlanceBoxProps {
  supportSummary: string;
  opposeSummary: string;
  alternativeSummary: string;
}

export function AtAGlanceBox({ supportSummary, opposeSummary, alternativeSummary }: AtAGlanceBoxProps) {
  const { t } = useLanguage();
  
  return (
    <Card className="border-2 border-blue-500 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-blue-600" />
          <h3 className="text-blue-900">💡 {t.atAGlance}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          {t.atAGlanceDesc}
        </p>

        <div className="space-y-4">
          {supportSummary && (
            <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <ThumbsUp className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-blue-900">{t.supportSummaryTitle}</span>
              </div>
              <p className="text-gray-700 ml-10">{supportSummary}</p>
            </div>
          )}

          {opposeSummary && (
            <div className="p-4 bg-white rounded-lg border-l-4 border-red-500">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <ThumbsDown className="w-4 h-4 text-red-600" />
                </div>
                <span className="text-red-900">{t.opposeSummaryTitle}</span>
              </div>
              <p className="text-gray-700 ml-10">{opposeSummary}</p>
            </div>
          )}

          {alternativeSummary && (
            <div className="p-4 bg-white rounded-lg border-l-4 border-green-500">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-green-900">{t.alternativeSummaryTitle}</span>
              </div>
              <p className="text-gray-700 ml-10">{alternativeSummary}</p>
            </div>
          )}
        </div>

        <div className="mt-4 p-3 bg-blue-100 rounded-lg">
          <p className="text-xs text-blue-800">
            💬 이 요약은 AI(Gemini)가 {' '}
            <strong>여러 출처의 의견을 분석</strong>하여 자동으로 생성했습니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
