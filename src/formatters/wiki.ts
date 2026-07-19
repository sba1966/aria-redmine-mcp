import type { RedmineWikiPage, RedmineWikiPageIndex } from "../lib/types/index.js";

export function formatWikiPage(page: RedmineWikiPage): string {
  return `<wiki_page>
  <title>${page.title}</title>
  <version>${page.version}</version>
  ${page.author ? `<author>${page.author.name}</author>` : ""}
  ${page.parent ? `<parent>${page.parent.title}</parent>` : ""}
  <created_on>${page.created_on}</created_on>
  <updated_on>${page.updated_on}</updated_on>
  ${page.text !== undefined ? `<text><![CDATA[${page.text}]]></text>` : ""}
</wiki_page>`;
}

export function formatWikiPages(pages: RedmineWikiPageIndex[]): string {
  if (!pages || pages.length === 0) {
    return `<?xml version="1.0" encoding="UTF-8"?>\n<wiki_pages />`;
  }

  const formatted = pages
    .map(
      (page) => `  <wiki_page>
    <title>${page.title}</title>
    <version>${page.version}</version>
    ${page.parent ? `<parent>${page.parent.title}</parent>` : ""}
    <created_on>${page.created_on}</created_on>
    <updated_on>${page.updated_on}</updated_on>
  </wiki_page>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<wiki_pages total_count="${pages.length}">
${formatted}
</wiki_pages>`;
}

export function formatWikiPageResult(page: RedmineWikiPage, action: "created" | "updated"): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<response>
  <message>Wiki page "${page.title}" was successfully ${action}.</message>
  ${formatWikiPage(page)}
</response>`;
}

export function formatWikiPageDeleted(projectId: string | number, title: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<response>
  <message>Wiki page "${title}" in project "${projectId}" was successfully deleted.</message>
</response>`;
}
