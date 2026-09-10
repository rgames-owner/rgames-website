import type { Metadata } from 'next';
import HunterTowerDashboard from '@/components/admin/HunterTowerDashboard';

export const metadata: Metadata = {
  title: 'Hunter Tower 운영 데이터 | R GAMES',
  description: 'Hunter Tower 운영자를 위한 Google Analytics 데이터 대시보드.',
  robots: { index: false, follow: false },
};

export default function HunterTowerAdminPage() {
  return <HunterTowerDashboard />;
}
