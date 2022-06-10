import {YesNo, ImageUrl, ZeroOrOne, TimeValueOf, Id} from "Types/coreTypes";
import {Member} from "Types/member";

export type User = {
  id: Id;
  email: string;
  nickName: string;
  profileImage: ImageUrl;
  birthday: string;
  type: ZeroOrOne;
  isAllowMessagePush: YesNo;
  isAllowCommentPush: YesNo;
  status: ZeroOrOne;
  birthdayUpdatedAt: TimeValueOf;
  createdAt: TimeValueOf;
  updatedAt: TimeValueOf;
};

export type UserInfo = User & {
  fanletterCount: number;
  follows: Member[];
  followCount: number;
  savedMessageCount: number;
  points: number;
};

export type UserInfoResponse = {
  user: User;
};
