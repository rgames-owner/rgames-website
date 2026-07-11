import type { Metadata } from 'next';
import PolicyPage from '@/components/PolicyPage';

export const metadata: Metadata = {
  title: '이용약관 | R GAMES',
};

export default function Terms() {
  return <PolicyPage kind="terms" />;
}
