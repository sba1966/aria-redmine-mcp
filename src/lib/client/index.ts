import { IssuesClient } from "./issues.js";
import { ProjectsClient } from "./projects.js";
import { TimeEntriesClient } from "./time_entries.js";
import { UsersClient } from "./users.js";
import { LlmInteractionsClient } from "./llm_interactions.js";
import { CatalogClient } from "./catalog.js";
import { WikiClient } from "./wiki.js";
import { NewsClient } from "./news.js";
import { RedmineApiError } from "./base.js";

/**
 * Redmine API クライアント
 */
export class RedmineClient {
  public readonly issues: IssuesClient;
  public readonly projects: ProjectsClient;
  public readonly timeEntries: TimeEntriesClient;
  public readonly users: UsersClient;
  public readonly llmInteractions: LlmInteractionsClient;
  public readonly catalog: CatalogClient;
  public readonly wiki: WikiClient;
  public readonly news: NewsClient;

  constructor() {
    this.issues = new IssuesClient();
    this.projects = new ProjectsClient();
    this.timeEntries = new TimeEntriesClient();
    this.users = new UsersClient();
    this.llmInteractions = new LlmInteractionsClient();
    this.catalog = new CatalogClient();
    this.wiki = new WikiClient();
    this.news = new NewsClient();
  }
}

// クライアントのシングルトンインスタンス
export const redmineClient = new RedmineClient();

export { RedmineApiError };