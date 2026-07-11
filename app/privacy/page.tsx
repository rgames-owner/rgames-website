import type { Metadata } from 'next';
import PolicyPage from '@/components/PolicyPage';

export const metadata: Metadata = {
  title: '개인정보처리방침 | R GAMES',
};

export default function Privacy() {
  return <PolicyPage kind="privacy" />;
}
