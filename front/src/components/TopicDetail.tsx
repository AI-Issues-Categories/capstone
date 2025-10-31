import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Calendar, MessageSquare, ThumbsUp, ThumbsDown, Lightbulb, Download, Share2, Minus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Topic } from '../App';
import { mockDocuments } from './mockData';
import { AtAGlanceBox } from './AtAGlanceBox';
import { KeywordBubbleCloud } from './KeywordBubbleCloud';
import { ClusterComparisonView } from './ClusterComparisonView';
import { FavoriteButton } from './FavoriteButton';
import { toast } from 'sonner@2.0.3';
import { useLanguage } from './LanguageContext';

interface TopicDetailProps {
  topic: Topic;
  onBack: () => void;
}

type VoteType = 'support' | 'oppose' | 'neutral';

interface VoteData {
  [topicId: string]: {
    userVote: VoteType;
    votes: {
      support: number;
      oppose: number;
      neutral: number;
    };
  };
}

export function TopicDetail({ topic, onBack }: TopicDetailProps) {
  const { t } = useLanguage();
  const [selectedClusterId, setSelectedClusterId] = useState<string | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareSelection, setCompareSelection] = useState<string[]>([]);
  const [userVote, setUserVote] = useState<VoteType | null>(null);
  const [votes, setVotes] = useState({ support: 0, oppose: 0, neutral: 0 });

  // Load voting data from localStorage on mount
  useEffect(() => {
    const voteData: VoteData = JSON.parse(localStorage.getItem('topicVotes') || '{}');
    if (voteData[topic.id]) {
      setUserVote(voteData[topic.id].userVote);
      setVotes(voteData[topic.id].votes);
    }
  }, [topic.id]);

  const handleVote = (voteType: VoteType) => {
    let newVotes = { ...votes };
    let newUserVote: VoteType | null = null;
    
    // If clicking the same vote, cancel it
    if (userVote === voteType) {
      newVotes[voteType] = Math.max(0, votes[voteType] - 1);
      newUserVote = null;
      
      toast.info(t.voteCancelled || '투표가 취소되었습니다', {
        description: t.voteCancelledDesc || '다시 투표할 수 있습니다'
      });
    } 
    // If changing vote, decrease old and increase new
    else if (userVote !== null) {
      newVotes[userVote] = Math.max(0, votes[userVote] - 1);
      newVotes[voteType] = votes[voteType] + 1;
      newUserVote = voteType;
      
      const voteLabel = voteType === 'support' ? t.support : voteType === 'oppose' ? t.oppose : t.neutral;
      toast.success(t.voteChanged || '투표가 변경되었습니다!', {
        description: `${voteLabel} ${t.votedFor}`
      });
    }
    // New vote
    else {
      newVotes[voteType] = votes[voteType] + 1;
      newUserVote = voteType;
      
      const voteLabel = voteType === 'support' ? t.support : voteType === 'oppose' ? t.oppose : t.neutral;
      toast.success(t.voteComplete, {
        description: `${voteLabel} ${t.votedFor}`
      });
    }

    setUserVote(newUserVote);
    setVotes(newVotes);

    // Save to localStorage
    const voteData: VoteData = JSON.parse(localStorage.getItem('topicVotes') || '{}');
    
    if (newUserVote === null) {
      // Remove vote data if cancelled
      delete voteData[topic.id];
    } else {
      voteData[topic.id] = {
        userVote: newUserVote,
        votes: newVotes
      };
    }
    
    localStorage.setItem('topicVotes', JSON.stringify(voteData));
  };
  
  const topicDocuments = mockDocuments.filter(doc => doc.topicId === topic.id);

  // Filter documents based on selected cluster
  const filteredDocuments = selectedClusterId
    ? topicDocuments.filter(doc => {
        const cluster = topic.clusters.find(c => c.id === selectedClusterId);
        return cluster?.documentIds?.includes(doc.id);
      })
    : topicDocuments;

  // Calculate opinion distribution
  const supportDocs = topicDocuments.filter(d => d.stance === 'support').length;
  const opposeDocs = topicDocuments.filter(d => d.stance === 'oppose').length;
  const alternativeDocs = topicDocuments.filter(d => d.stance === 'alternative').length;
  const neutralDocs = topicDocuments.filter(d => d.stance === 'neutral').length;
  const total = topicDocuments.length;

  const getSourceIcon = (sourceType: string) => {
    switch (sourceType) {
      case 'news': return '📰';
      case 'youtube': return '📹';
      case 'blog': return '✍️';
      default: return '📄';
    }
  };

  const handleShareUrl = async () => {
    const url = `${window.location.origin}${window.location.pathname}?topic=${topic.id}${
      selectedClusterId ? `&cluster=${selectedClusterId}` : ''
    }`;
    
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        toast.success(t.linkCopied, {
          description: t.linkCopiedDesc
        });
      } else {
        // Fallback method for older browsers or when clipboard API is blocked
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          textArea.remove();
          toast.success(t.linkCopied, {
            description: t.linkCopiedDesc
          });
        } catch (err) {
          textArea.remove();
          // If all else fails, show the URL so user can copy manually
          toast.info(t.copyLink, {
            description: url,
            duration: 10000
          });
        }
      }
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      // Show the URL so user can copy manually
      toast.info(t.copyLink, {
        description: url,
        duration: 10000
      });
    }
  };

  const selectedCluster = selectedClusterId ? topic.clusters.find(c => c.id === selectedClusterId) : null;
  const compareClusters = compareSelection.map(id => topic.clusters.find(c => c.id === id)).filter(Boolean);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={onBack} size="lg" className="gap-2">
        <ArrowLeft className="w-5 h-5" />
        <span>{t.backToHome}</span>
      </Button>

      {/* Header */}
      <Card className="border-2 border-gray-200 shadow-lg bg-gradient-to-br from-white to-blue-50">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full mb-3">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-700">{topic.lastUpdated} {t.updated}</span>
                </div>
                <h1 className="text-gray-900 mb-3">{topic.label}</h1>
                <p className="text-gray-600">
                  {t.analyzedDocs2} <strong>{topic.documentCount}{t.documentsCount}</strong>을 분석했습니다
                </p>
              </div>
              
              <div className="flex gap-2">
                <FavoriteButton topicId={topic.id} topicLabel={topic.label} />
                <Button variant="outline" onClick={handleShareUrl} className="gap-2">
                  <Share2 className="w-4 h-4" />
                  {t.share}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Voting Section */}
      <Card className="border-2 border-gray-200 shadow-lg bg-gradient-to-br from-white to-purple-50">
        <CardContent className="pt-6 space-y-6">
          <div>
            <h3 className="text-gray-900 mb-2">{t.yourOpinion}</h3>
            <p className="text-sm text-gray-600">
              {userVote ? `${t.thanksForVoting} ${t.clickAgainToCancel}` : t.oneVotePerTopic}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              size="lg"
              variant={userVote === 'support' ? 'default' : 'outline'}
              className={`h-auto py-4 flex flex-col gap-2 ${
                userVote === 'support' 
                  ? 'bg-blue-600 hover:bg-blue-700 border-blue-600' 
                  : 'border-2 hover:border-blue-300 hover:bg-blue-50'
              } ${userVote && userVote !== 'support' ? 'opacity-50' : ''}`}
              onClick={() => handleVote('support')}
            >
              <ThumbsUp className={`w-6 h-6 ${userVote === 'support' ? 'text-white' : 'text-blue-600'}`} />
              <span className={userVote === 'support' ? 'text-white' : 'text-blue-900'}>{t.support}</span>
              <span className={`text-sm ${userVote === 'support' ? 'text-blue-100' : 'text-blue-600'}`}>
                {votes.support}{t.votes} ({votes.support + votes.oppose + votes.neutral > 0 
                  ? ((votes.support / (votes.support + votes.oppose + votes.neutral)) * 100).toFixed(0) 
                  : 0}%)
              </span>
            </Button>

            <Button
              size="lg"
              variant={userVote === 'oppose' ? 'default' : 'outline'}
              className={`h-auto py-4 flex flex-col gap-2 ${
                userVote === 'oppose' 
                  ? 'bg-red-600 hover:bg-red-700 border-red-600' 
                  : 'border-2 hover:border-red-300 hover:bg-red-50'
              } ${userVote && userVote !== 'oppose' ? 'opacity-50' : ''}`}
              onClick={() => handleVote('oppose')}
            >
              <ThumbsDown className={`w-6 h-6 ${userVote === 'oppose' ? 'text-white' : 'text-red-600'}`} />
              <span className={userVote === 'oppose' ? 'text-white' : 'text-red-900'}>{t.oppose}</span>
              <span className={`text-sm ${userVote === 'oppose' ? 'text-red-100' : 'text-red-600'}`}>
                {votes.oppose}{t.votes} ({votes.support + votes.oppose + votes.neutral > 0 
                  ? ((votes.oppose / (votes.support + votes.oppose + votes.neutral)) * 100).toFixed(0) 
                  : 0}%)
              </span>
            </Button>

            <Button
              size="lg"
              variant={userVote === 'neutral' ? 'default' : 'outline'}
              className={`h-auto py-4 flex flex-col gap-2 ${
                userVote === 'neutral' 
                  ? 'bg-gray-600 hover:bg-gray-700 border-gray-600' 
                  : 'border-2 hover:border-gray-300 hover:bg-gray-50'
              } ${userVote && userVote !== 'neutral' ? 'opacity-50' : ''}`}
              onClick={() => handleVote('neutral')}
            >
              <Minus className={`w-6 h-6 ${userVote === 'neutral' ? 'text-white' : 'text-gray-600'}`} />
              <span className={userVote === 'neutral' ? 'text-white' : 'text-gray-900'}>{t.neutral}</span>
              <span className={`text-sm ${userVote === 'neutral' ? 'text-gray-100' : 'text-gray-600'}`}>
                {votes.neutral}{t.votes} ({votes.support + votes.oppose + votes.neutral > 0 
                  ? ((votes.neutral / (votes.support + votes.oppose + votes.neutral)) * 100).toFixed(0) 
                  : 0}%)
              </span>
            </Button>
          </div>

          {userVote && (
            <div className="text-center text-sm text-gray-600 bg-purple-50 p-3 rounded-lg border border-purple-200">
              {votes.support + votes.oppose + votes.neutral} {t.totalVoters}
            </div>
          )}
        </CardContent>
      </Card>

      {/* At-a-Glance Summary */}
      {topic.summary && (
        <AtAGlanceBox
          supportSummary={topic.summary.support || ''}
          opposeSummary={topic.summary.oppose || ''}
          alternativeSummary={topic.summary.alternative || ''}
        />
      )}

      {/* Keyword Bubble Cloud */}
      {topic.keywordWeights && topic.keywordWeights.length > 0 && (
        <KeywordBubbleCloud keywords={topic.keywordWeights} />
      )}

      {/* Opinion Distribution */}
      <Card className="border-2 border-gray-200 shadow-lg">
        <CardContent className="pt-6 space-y-6">
          <div>
            <h3 className="text-gray-900 mb-2">{t.opinionDistribution}</h3>
            <p className="text-sm text-gray-600">
              {t.opinionDistributionDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {supportDocs > 0 && (
              <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <ThumbsUp className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-900">{t.support}</span>
                </div>
                <div className="text-2xl text-blue-600 mb-1">{supportDocs}개</div>
                <div className="text-sm text-blue-600">{((supportDocs / total) * 100).toFixed(0)}%</div>
              </div>
            )}

            {opposeDocs > 0 && (
              <div className="p-4 bg-red-50 rounded-xl border-2 border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <ThumbsDown className="w-5 h-5 text-red-600" />
                  <span className="text-red-900">{t.oppose}</span>
                </div>
                <div className="text-2xl text-red-600 mb-1">{opposeDocs}개</div>
                <div className="text-sm text-red-600">{((opposeDocs / total) * 100).toFixed(0)}%</div>
              </div>
            )}

            {alternativeDocs > 0 && (
              <div className="p-4 bg-green-50 rounded-xl border-2 border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-green-600" />
                  <span className="text-green-900">{t.alternative}</span>
                </div>
                <div className="text-2xl text-green-600 mb-1">{alternativeDocs}개</div>
                <div className="text-sm text-green-600">{((alternativeDocs / total) * 100).toFixed(0)}%</div>
              </div>
            )}

            {neutralDocs > 0 && (
              <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">{t.neutral}</span>
                </div>
                <div className="text-2xl text-gray-600 mb-1">{neutralDocs}개</div>
                <div className="text-sm text-gray-600">{((neutralDocs / total) * 100).toFixed(0)}%</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          variant={compareMode ? 'default' : 'outline'}
          onClick={() => {
            setCompareMode(!compareMode);
            setCompareSelection([]);
            setSelectedClusterId(null);
          }}
        >
          {compareMode ? t.exitCompareMode : t.compareOpinions}
        </Button>
      </div>

      {/* Cluster Comparison View */}
      {compareMode && compareClusters.length === 2 && (
        <ClusterComparisonView
          cluster1={compareClusters[0]!}
          cluster2={compareClusters[1]!}
        />
      )}

      {/* Main Opinions by Stance */}
      {selectedCluster && !compareMode && (
        <Card className="border-2 border-purple-300 shadow-xl">
          <CardContent className="pt-6">
            <div className="mb-6">
              <h3 className="text-gray-900 mb-2">{t.selectedOpinionDetail}</h3>
              <p className="text-sm text-gray-600">
                {t.selectedOpinionDesc}
              </p>
            </div>

            <div
              className={`p-5 rounded-xl border-2 ${
                selectedCluster.stance === 'support'
                  ? 'bg-blue-50 border-blue-200'
                  : selectedCluster.stance === 'oppose'
                  ? 'bg-red-50 border-red-200'
                  : selectedCluster.stance === 'alternative'
                  ? 'bg-green-50 border-green-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {selectedCluster.stance === 'support' && (
                    <>
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <ThumbsUp className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-blue-900">{t.supportOpinion}</div>
                        <div className="text-sm text-blue-600">{selectedCluster.size}개의 글</div>
                      </div>
                    </>
                  )}
                  {selectedCluster.stance === 'oppose' && (
                    <>
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <ThumbsDown className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <div className="text-red-900">{t.opposeOpinion}</div>
                        <div className="text-sm text-red-600">{selectedCluster.size}개의 글</div>
                      </div>
                    </>
                  )}
                  {selectedCluster.stance === 'alternative' && (
                    <>
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Lightbulb className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-green-900">{t.alternativeOpinion}</div>
                        <div className="text-sm text-green-600">{selectedCluster.size}개의 글</div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {selectedCluster.representativeSentences.map((sentence, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-gray-400 flex-shrink-0">•</span>
                    <p className="text-gray-700">{sentence}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-xs text-gray-500">
                  {t.mainSources}: {selectedCluster.sources.join(', ')}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!compareMode && !selectedCluster && (
        <Card className="border-2 border-gray-200 shadow-lg">
          <CardContent className="pt-6">
            <div className="mb-6">
              <h3 className="text-gray-900 mb-2">{t.mainOpinions}</h3>
              <p className="text-sm text-gray-600">
                {t.mainOpinionsDesc}
              </p>
            </div>

            <div className="space-y-4">
              {topic.clusters.map((cluster) => (
                <div
                  key={cluster.id}
                  className={`p-5 rounded-xl border-2 cursor-pointer hover:shadow-lg transition-all ${
                    cluster.stance === 'support'
                      ? 'bg-blue-50 border-blue-200 hover:border-blue-400'
                      : cluster.stance === 'oppose'
                      ? 'bg-red-50 border-red-200 hover:border-red-400'
                      : cluster.stance === 'alternative'
                      ? 'bg-green-50 border-green-200 hover:border-green-400'
                      : 'bg-gray-50 border-gray-200 hover:border-gray-400'
                  }`}
                  onClick={() => setSelectedClusterId(cluster.id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {cluster.stance === 'support' && (
                        <>
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <ThumbsUp className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-blue-900">찬성 의견</div>
                            <div className="text-sm text-blue-600">{cluster.size}개의 글</div>
                          </div>
                        </>
                      )}
                      {cluster.stance === 'oppose' && (
                        <>
                          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <ThumbsDown className="w-5 h-5 text-red-600" />
                          </div>
                          <div>
                            <div className="text-red-900">반대 의견</div>
                            <div className="text-sm text-red-600">{cluster.size}개의 글</div>
                          </div>
                        </>
                      )}
                      {cluster.stance === 'alternative' && (
                        <>
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Lightbulb className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <div className="text-green-900">대안 의견</div>
                            <div className="text-sm text-green-600">{cluster.size}개의 글</div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {cluster.representativeSentences.map((sentence, idx) => (
                      <div key={idx} className="flex gap-2">
                        <span className="text-gray-400 flex-shrink-0">•</span>
                        <p className="text-gray-700">{sentence}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500">
                      주요 출처: {cluster.sources.join(', ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Documents */}
      <Card className="border-2 border-gray-200 shadow-lg">
        <CardContent className="pt-6">
          <div className="mb-6">
            <h3 className="text-gray-900 mb-2">
              원문 보기 {selectedClusterId && '(선택한 의견만)'}
            </h3>
            <p className="text-sm text-gray-600">
              {filteredDocuments.length}개의 뉴스, 영상, 블로그 글
              {selectedClusterId && ' · 의견 지도에서 다른 점을 클릭하거나 선택을 해제하세요'}
            </p>
          </div>

          <div className="space-y-3">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all bg-white"
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl">{getSourceIcon(doc.sourceType)}</div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge
                        variant={
                          doc.stance === 'support'
                            ? 'default'
                            : doc.stance === 'oppose'
                            ? 'destructive'
                            : doc.stance === 'alternative'
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {doc.stance === 'support'
                          ? '찬성'
                          : doc.stance === 'oppose'
                          ? '반대'
                          : doc.stance === 'alternative'
                          ? '대안'
                          : '중립'}
                      </Badge>
                      <span className="text-xs text-gray-500">{doc.date}</span>
                    </div>

                    <h4 className="text-gray-900 mb-2 line-clamp-2">{doc.title}</h4>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {doc.snippet}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{doc.source}</span>
                      <Button size="sm" variant="outline" asChild>
                        <a href={doc.url} target="_blank" rel="noopener noreferrer" className="gap-2">
                          <span>원문 보기</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
