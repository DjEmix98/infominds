import { BodyTable, Header } from "../types/tableList.types";

export function exportXml<T>(headers: Header<T>[], body: BodyTable<T>[], fileName: string): void {
  const xml = generateXMlFromTable(headers, body);
  const blob = new Blob([xml], { type: "application/xml" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.xml`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function generateXMlFromTable<T>(headers: Header<T>[], body: BodyTable<T>[]): string {
  const xmlContent = body.reduce((acc, item) => {
    const recordContent = headers.reduce((recordAcc, header) => {
      const tag = header.key as string;
      const value = item[header.key];
      return recordAcc + `    <${tag}>${value}</${tag}>\n`;
    }, "");
    return acc + `  <Record>\n${recordContent}  </Record>\n`;
  }, "");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<Records>\n${xmlContent}</Records>`;
}
