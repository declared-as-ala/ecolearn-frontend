'use client';

import React from 'react';
import { MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import WiseGuide from '@/components/cartoons/WiseGuide';

interface FeedbackMessageProps {
  message: string;
  from?: string;
  onClose?: () => void;
}

export default function FeedbackMessage({ 
  message, 
  from = 'معلمك',
  onClose 
}: FeedbackMessageProps) {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-2 border-blue-300 shadow-lg rounded-xl" dir="rtl">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <WiseGuide size="medium" emotion="explaining" animation="speak" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <h4 className="font-bold text-lg text-gray-800">
                  رسالة من {from}
                </h4>
              </div>
              {onClose && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-6 w-6"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            <p className="text-base text-gray-700 leading-relaxed bg-white/50 rounded-lg p-4">
              {message}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}






