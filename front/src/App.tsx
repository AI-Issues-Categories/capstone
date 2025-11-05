import { useState } from 'react';
import { MainDashboard } from './components/MainDashboard';
import { TopicDetail } from './components/TopicDetail';
import { ComparisonView } from './components/ComparisonView';
import { FavoriteTopicsView } from './components/FavoriteTopicsView';
import { IssueAnalysis } from './components/IssueAnalysis';
import { HelpCircle, BarChart3, GitCompare, Sparkles } from 'lucide-react';
import { Button } from './components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './components/ui/dialog';
import { Toaster } from './components/ui/sonner';
import { LanguageProvider, useLanguage } from './components/LanguageContext';
import { LanguageSelector } from './components/LanguageSelector';

export interface Topic {
  id: string;
  label: string;
  keywords: string[];
  documentCount: number;
  lastUpdated: string;
  stance: 'support' | 'oppose' | 'alternative' | 'neutral';
  clusters: ClusterData[];
  summary?: {
    support?: string;
    oppose?: string;
    alternative?: string;
  };
  keywordWeights?: { text: string; weight: number }[];
}

export interface ClusterData {
  id: string;
  position: { x: number; y: number };
  size: number;
  stance: 'support' | 'oppose' | 'alternative' | 'neutral';
  representativeSentences: string[];
  sources: string[];
  documentIds?: string[];
}

export interface Document {
  id: string;
  title: string;
  snippet: string;
  source: string;
  sourceType: 'news' | 'youtube' | 'blog';
  url: string;
  date: string;
  topicId: string;
  stance: 'support' | 'oppose' | 'alternative' | 'neutral';
}

function AppContent() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [activeView, setActiveView] = useState<'main' | 'detail' | 'compare' | 'favorites' | 'analysis'>('main');
  const { t } = useLanguage();

  return (
    <>
      <Toaster position="top-center" duration={2000} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="cursor-pointer"
              onClick={() => {
                setActiveView('main');
                setSelectedTopic(null);
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-blue-600">{t.appName}</h1>
                  <p className="text-xs text-gray-600">이슈의 모든 의견을 한눈에</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={activeView === 'main' ? 'default' : 'ghost'}
                onClick={() => setActiveView('main')}
                className="gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">{t.home}</span>
              </Button>
              
              <Button
                variant={activeView === 'compare' ? 'default' : 'ghost'}
                onClick={() => setActiveView('compare')}
                className="gap-2"
              >
                <GitCompare className="w-4 h-4" />
                <span className="hidden sm:inline">{t.compare}</span>
              </Button>

              <Button
                variant={activeView === 'analysis' ? 'default' : 'ghost'}
                onClick={() => setActiveView('analysis')}
                className="gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">{t.issueAnalysis}</span>
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <HelpCircle className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{t.helpTitle}</DialogTitle>
                    <DialogDescription>
                      {t.helpDesc}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="text-blue-900 mb-2">{t.whatIsOpinionMap}</h3>
                      <p className="text-sm text-gray-700">
                        {t.whatIsOpinionMapDesc}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <span>1</span>
                        </div>
                        <div>
                          <h4 className="text-gray-900 mb-1">{t.howToUse1}</h4>
                          <p className="text-sm text-gray-600">
                            {t.howToUse1Desc}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <span>2</span>
                        </div>
                        <div>
                          <h4 className="text-gray-900 mb-1">{t.howToUse2}</h4>
                          <p className="text-sm text-gray-600">
                            {t.howToUse2Desc}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <span>3</span>
                        </div>
                        <div>
                          <h4 className="text-gray-900 mb-1">{t.howToUse3}</h4>
                          <p className="text-sm text-gray-600">
                            {t.howToUse3Desc}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <span>4</span>
                        </div>
                        <div>
                          <h4 className="text-gray-900 mb-1">{t.howToUse4}</h4>
                          <p className="text-sm text-gray-600">
                            {t.howToUse4Desc}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                      <h4 className="text-gray-900">{t.chartGuide}</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                          <span>{t.blueSupport}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-red-500"></div>
                          <span>{t.redOppose}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-green-500"></div>
                          <span>{t.greenAlternative}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                          <span>{t.grayNeutral}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeView === 'main' && (
          <MainDashboard 
            onTopicSelect={(topic) => {
              setSelectedTopic(topic);
              setActiveView('detail');
            }}
            onStartAnalysis={() => setActiveView('analysis')}
          />
        )}
        
        {activeView === 'detail' && selectedTopic && (
          <TopicDetail 
            topic={selectedTopic}
            onBack={() => setActiveView('main')}
          />
        )}
        
        {activeView === 'compare' && <ComparisonView />}
        
        {activeView === 'favorites' && (
          <FavoriteTopicsView 
            onTopicSelect={(topic) => {
              setSelectedTopic(topic);
              setActiveView('detail');
            }}
            onGoHome={() => setActiveView('main')}
          />
        )}
        
        {activeView === 'analysis' && <IssueAnalysis />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-600">
            <p>© 2025 {t.appName} - 캡스톤 디자인 프로젝트</p>
            <p className="mt-1 text-xs text-gray-500">
              이 플랫폼은 여론 분석을 위한 교육용 목적으로 제작되었습니다.
            </p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
