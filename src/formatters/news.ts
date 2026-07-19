import type { RedmineNews } from "../lib/types/index.js";

export function formatNewsEntry(news: RedmineNews): string {
  return `<news>
  <id>${news.id}</id>
  <title>${news.title}</title>
  <project>${news.project.name}</project>
  <author>${news.author.name}</author>
  ${news.summary ? `<summary>${news.summary}</summary>` : ""}
  ${news.description ? `<description><![CDATA[${news.description}]]></description>` : ""}
  <created_on>${news.created_on}</created_on>
</news>`;
}

export function formatNewsList(response: { news: RedmineNews[]; total_count: number; offset: number; limit: number }): string {
  if (!response.news || response.news.length === 0) {
    return `<?xml version="1.0" encoding="UTF-8"?>\n<news_list />`;
  }

  const entries = response.news.map(formatNewsEntry).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<news_list total_count="${response.total_count}" offset="${response.offset}" limit="${response.limit}">
${entries}
</news_list>`;
}

export function formatNewsResult(news: RedmineNews, action: "created" | "updated"): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<response>
  <message>News entry "${news.title}" was successfully ${action}.</message>
  ${formatNewsEntry(news)}
</response>`;
}

export function formatNewsDeleted(id: number): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<response>
  <message>News entry ${id} was successfully deleted.</message>
</response>`;
}

export function formatNewsUpdated(id: number): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<response>
  <message>News entry ${id} was successfully updated.</message>
</response>`;
}
