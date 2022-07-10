import {MimeType} from "constants/mimeTypes";

export const exportToCsv = (data: string[][], outputFilename: string) =>
  exportData([toCsvString(data)], MimeType.Csv, outputFilename);

export const exportToTxt = (data: BlobPart[], outputFilename: string) =>
  exportData(data, MimeType.Text, outputFilename);

const checkWindow = () => {
  if (typeof window === "undefined") {
    throw new Error("The window object is not availble");
  }
};

const exportData = (data: BlobPart[], type: string, outputFilename: string) => {
  checkWindow();
  const element = document.createElement("a");
  element.href = URL.createObjectURL(new Blob(data, {type}));
  element.download = outputFilename;
  document.body.appendChild(element);
  element.click();
};

const toCsvString = (data: any[]) =>
  data
    .map((row) =>
      row
        .map(String)
        // eslint-disable-next-line quotes
        .map((v: any) => v.replaceAll('"', '""'))
        .map((v: any) => `"${v}"`)
        .join(",")
    )
    .join("\r\n");
