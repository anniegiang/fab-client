export const shortenTextAddEllipses = (text: string, maxLength: number) =>
  text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`;
