import { Suspense } from 'react';
import LevelTestContent from './LevelTestContent';
import EcoLoading from '@/components/ui/EcoLoading';

export const metadata = {
  title: 'الاختبار التشخيصي | EcoLearn',
  description: 'الاختبار التشخيصي لتقييم مستواك البيئي',
};

export default function LevelTestPage() {
  return (
    <Suspense fallback={<EcoLoading message="تحميل الاختبار التشخيصي..." />}>
      <LevelTestContent />
    </Suspense>
  );
}
