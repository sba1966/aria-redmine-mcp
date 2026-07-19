export interface RedmineWikiPage {
  title: string;
  text?: string;
  version: number;
  author?: {
    id: number;
    name: string;
  };
  parent?: {
    title: string;
  };
  created_on: string;
  updated_on: string;
}

export interface RedmineWikiPageIndex {
  title: string;
  version: number;
  parent?: {
    title: string;
  };
  created_on: string;
  updated_on: string;
}

export interface RedmineWikiPageCreate {
  text: string;
  comments?: string;
  version?: number;
  parent_title?: string;
}
