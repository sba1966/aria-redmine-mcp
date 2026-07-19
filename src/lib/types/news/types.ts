export interface RedmineNews {
  id: number;
  project: {
    id: number;
    name: string;
  };
  author: {
    id: number;
    name: string;
  };
  title: string;
  summary?: string;
  description?: string;
  created_on: string;
}

export interface RedmineNewsCreate {
  title: string;
  summary?: string;
  description?: string;
}

export interface NewsSearchParams {
  offset?: number;
  limit?: number;
}
