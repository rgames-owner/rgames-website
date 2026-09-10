export interface DashboardFilters {
  days: 7 | 28 | 90;
  country: string;
  platform: 'all' | 'Android' | 'iOS';
}

export interface ReportSection {
  id: string;
  title: string;
  description: string;
  status: 'ready' | 'empty' | 'unavailable' | 'error';
  columns: { key: string; label: string; format?: 'number' | 'currency' | 'percent' | 'seconds' }[];
  rows: Record<string, string | number | null>[];
  notes: string[];
  error?: string;
}

export interface DashboardData {
  fetchedAt: string;
  propertyId: string;
  /** ISO 4217 code returned by GA4, or an empty string when unavailable. */
  currency: string;
  sections: ReportSection[];
}
