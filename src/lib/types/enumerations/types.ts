export interface Tracker {
  id: number;
  name: string;
  description?: string;
  default_status?: {
    id: number;
    name: string;
  };
}

export interface IssueStatus {
  id: number;
  name: string;
  is_closed: boolean;
  is_default?: boolean;
}

export interface IssuePriority {
  id: number;
  name: string;
  is_default?: boolean;
  active?: boolean;
}

export interface TimeEntryActivity {
  id: number;
  name: string;
  is_default?: boolean;
  active?: boolean;
}
