import { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';

interface ChartGuideProps {
  title: string;
  descriptions: {
    label: string;
    text: string;
    position?: { x: string; y: string };
  }[];
}

export function ChartGuide({ title, descriptions }: ChartGuideProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant={isOpen ? 'default' : 'outline'}
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2"
      >
        <HelpCircle className="w-4 h-4" />
        {isOpen ? '설명 닫기' : '이 차트 설명 보기'}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-12 left-0 right-0 z-10 p-4 bg-white border-2 border-blue-300 rounded-xl shadow-xl"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <h4 className="text-blue-900">{title}</h4>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {descriptions.map((desc, idx) => (
                <div key={idx} className="flex gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="text-sm text-blue-900 mb-1">{desc.label}</div>
                    <p className="text-xs text-gray-600">{desc.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
              💡 <strong>팁:</strong> 차트의 각 부분을 클릭하면 더 자세한 정보를 볼 수 있습니다!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
