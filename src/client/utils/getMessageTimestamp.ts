import moment from "moment-timezone";

export const getMessageTimestamp = (timestamp: number) => {
  const format = "MM DD YYYY";
  const timeFormat = "h:mma";
  const today = moment().format(format);
  const yesterday = moment().subtract(1, "day").format(format);
  const ts = moment(timestamp).format(format);

  if (ts === today) {
    return `Today, ${moment(timestamp).format(timeFormat)}`;
  }

  if (ts === yesterday) {
    return `Yesterday, ${moment(timestamp).format(timeFormat)}`;
  }
  return moment(timestamp).format(`M/DD ${timeFormat}`);
};
