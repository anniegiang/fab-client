import {
  Id,
  YesNo,
  ZeroOrOne,
  TimeValueOf,
  TimestampWithTimezone,
  ImageUrl
} from "Types/common";

export type Comment = {
  id: Id;
  messageId: Id;
  parentId: Id;
  userId: Id;
  groupId: Id;
  isGroup: YesNo;
  comment: string;
  status: ZeroOrOne;
  createdAt: TimeValueOf;
  updatedAt: TimestampWithTimezone;
  isArtist: YesNo;
  name: string;
  enName: string;
  profileImage: ImageUrl;
  userNickname: string;
  isLike: YesNo;
  subComments: Comment[];
};

export type CommentsResponse = {
  comments: Comment[];
};
