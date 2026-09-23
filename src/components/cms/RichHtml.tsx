/**
 * Renders rich text saved from the Admin. The HTML is sanitised on the server
 * before it is stored; `display: contents` keeps the brand typography rules
 * that target `section > p`, `ul`, `li`… working as before.
 */
export default function RichHtml({ html, className }: { html: string; className?: string }) {
  if (!html) return null;
  return (
    <div
      className={className}
      style={className ? undefined : { display: "contents" }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
