export function csvCell(value: unknown) {
  let text = String(value ?? "");
  // Spreadsheet applications may execute user-controlled cells as formulas.
  if (/^\s*[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}
