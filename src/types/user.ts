import {YesNo, ImageUrl, ZeroOrOne, TimeValueOf, Id} from "types/common";
import {ArtistUser} from "types/artist";

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
  follows: ArtistUser[];
  followCount: number;
  savedMessageCount: number;
  points: number;
};

export type UserInfoResponse = {
  user: UserInfo;
};

export type FollowArtistResponse = {
  result: string;
};

export type UnfollowArtistResponse = {
  result: string;
};

export type FollowGroupResponse = {
  result: string;
};

export type UnfollowGroupResponse = {
  result: string;
};
