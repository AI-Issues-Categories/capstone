import { useState, useEffect } from 'react';
import { ExternalLink, Youtube, Newspaper, FileText, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Document } from '../App';
import { toast } from 'sonner@2.0.3';

interface DocumentListProps {
  documents: Document[];
}

interface DocumentVote {
  documentId: string;
  vote: 'support' | 'oppose' | 'neutral';
}

export function DocumentList({ documents }: DocumentListProps) {
  const [votes, setVotes] = useState<DocumentVote[]>([]);

  useEffect(() => {
    // Load votes from localStorage
    const savedVotes = localStorage.getItem('documentVotes');
    if (savedVotes) {
      setVotes(JSON.parse(savedVotes));
    }
  }, []);

  const handleVote = (documentId: string, voteType: 'support' | 'oppose' | 'neutral') => {
    const existingVote = votes.find(v => v.documentId === documentId);
    
    if (existingVote) {
      if (existingVote.vote === voteType) {
        // 같은 버튼 다시 클릭 시 취소
        const updatedVotes = votes.filter(v => v.documentId !== documentId);
        setVotes(updatedVotes);
        localStorage.setItem('documentVotes', JSON.stringify(updatedVotes));
        toast.info('투표를 취소했습니다');
      } else {
        // 다른 투표로 변경
        const updatedVotes = votes.map(v => 
          v.documentId === documentId ? { ...v, vote: voteType } : v
        );
        setVotes(updatedVotes);
        localStorage.setItem('documentVotes', JSON.stringify(updatedVotes));
        toast.success('투표를 변경했습니다');
      }
    } else {
      // 새로운 투표
      const newVote: DocumentVote = { documentId, vote: voteType };
      const updatedVotes = [...votes, newVote];
      setVotes(updatedVotes);
      localStorage.setItem('documentVotes', JSON.stringify(updatedVotes));
      const voteLabel = voteType === 'support' ? '찬성' : voteType === 'oppose' ? '반대' : '중립';
      toast.success(`${voteLabel} 의견을 등록했습니다`);
    }
  };

  const getUserVote = (documentId: string) => {
    return votes.find(v => v.documentId === documentId)?.vote;
  };
  const getSourceIcon = (sourceType: string) => {
    switch (sourceType) {
      case 'news': return <Newspaper className="w-4 h-4" />;
      case 'youtube': return <Youtube className="w-4 h-4" />;
      case 'blog': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getSourceTypeLabel = (sourceType: string) => {
    switch (sourceType) {
      case 'news': return '뉴스';
      case 'youtube': return '유튜브';
      case 'blog': return '블로그';
      default: return '기타';
    }
  };

  return (
    <div className="space-y-3 max-h-[600px] overflow-y-auto">
      {documents.map((doc) => {
        const userVote = getUserVote(doc.id);
        
        return (
          <div
            key={doc.id}
            className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getSourceIcon(doc.sourceType)}
                    <span className="text-xs text-gray-500">{getSourceTypeLabel(doc.sourceType)}</span>
                    <Badge
                      variant={
                        doc.stance === 'support' ? 'default' :
                        doc.stance === 'oppose' ? 'destructive' :
                        doc.stance === 'alternative' ? 'secondary' : 'outline'
                      }
                      className="text-xs"
                    >
                      {doc.stance === 'support' ? '찬성' :
                       doc.stance === 'oppose' ? '반대' :
                       doc.stance === 'alternative' ? '대안' : '중립'}
                    </Badge>
                  </div>
                  
                  <h4 className="text-gray-900 mb-2">{doc.title}</h4>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {doc.snippet}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{doc.source}</span>
                    <span>•</span>
                    <span>{doc.date}</span>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <a href={doc.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>

              {/* 투표 버튼 */}
              <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-500 mr-2">이 글에 대한 내 의견:</span>
                <Button
                  variant={userVote === 'support' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleVote(doc.id, 'support')}
                  className="gap-1"
                >
                  <ThumbsUp className="w-3 h-3" />
                  찬성
                </Button>
                <Button
                  variant={userVote === 'neutral' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleVote(doc.id, 'neutral')}
                  className="gap-1"
                >
                  <Minus className="w-3 h-3" />
                  중립
                </Button>
                <Button
                  variant={userVote === 'oppose' ? 'destructive' : 'outline'}
                  size="sm"
                  onClick={() => handleVote(doc.id, 'oppose')}
                  className="gap-1"
                >
                  <ThumbsDown className="w-3 h-3" />
                  반대
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
