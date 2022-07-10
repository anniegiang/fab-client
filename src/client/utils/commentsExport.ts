import moment from "moment-timezone";
import {YES_NO} from "constants/common";
import {TimeValueOf, YesNo} from "types/common";
import {exportToTxt, exportToCsv} from "client/utils/export";
import {Comment} from "types/comment";

const exportTimestampFormat = (createdAt: TimeValueOf): string =>
  moment(createdAt)
    .tz("Asia/Seoul")
    .format("hh:mm:ss A [KST], dddd, YYYY-MM-DD");

const exportAuthorname = (isArtist: YesNo, artistName: string): string =>
  isArtist === YES_NO.yes ? artistName : "Me";

const exportFilename = (messageId: string): string =>
  `message-${messageId}-comments`;

export const recursiveComments = (comments: Comment[]): Comment[] => {
  const hasReplies = comments.some((comment) => comment.subComments.length > 0);

  if (!hasReplies) return comments;

  const allComments: Comment[] = [];

  comments.forEach((comment) => {
    allComments.push(comment);

    if (comment.subComments.length) {
      allComments.push(...recursiveComments(comment.subComments));
    }
  });

  return allComments;
};

export const exportCommentsTxt = (comments: Comment[], messageId: string) => {
  const _allComments = comments.map(
    ({isArtist, comment, createdAt, enName}) =>
      `[${exportAuthorname(isArtist, enName)} ${exportTimestampFormat(
        createdAt
      )}]\n${comment}\n\n`
  );

  return exportToTxt(_allComments, exportFilename(messageId));
};

export const exportCommentsCsv = (comments: Comment[], messageId: string) => {
  const commentRows = comments.map(({isArtist, comment, createdAt, enName}) => [
    exportTimestampFormat(createdAt),
    exportAuthorname(isArtist, enName),
    comment
  ]);

  return exportToCsv(commentRows, exportFilename(messageId));
};
