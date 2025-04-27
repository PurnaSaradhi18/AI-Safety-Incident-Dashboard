export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  reported_at: string;
  resolved?: boolean;
}

export interface IncidentStats {
  total: number;
  open: number;
  resolved: number;
  critical: number;
}

export type SortOption = "reported_at" | "severity" | "title";
export type SortDirection = "asc" | "desc";

export interface FilterState {
  severity: string[];
  search: string;
}