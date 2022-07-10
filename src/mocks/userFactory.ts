import {YES_NO, ZERO_ONE} from "constants/common";
import {mockAuthHeaders} from "./authHeadersFactory";
import {
  User,
  UserInfo,
  UserInfoResponse,
  FollowArtistResponse,
  UnfollowArtistResponse
} from "types/user";

const todayValueOf = new Date().valueOf();
const authHeaders = mockAuthHeaders();

export const mockUser = (customValues?: Partial<User>): User => ({
  id: authHeaders.userid,
  email: "user@gmail.com",
  nickName: "user nickname",
  profileImage: "https://user-profile-image.com",
  birthday: "20000101",
  type: ZERO_ONE.zero,
  isAllowMessagePush: YES_NO.yes,
  isAllowCommentPush: YES_NO.no,
  status: ZERO_ONE.one,
  birthdayUpdatedAt: todayValueOf,
  createdAt: todayValueOf,
  updatedAt: todayValueOf,
  ...customValues
});

export const mockUserInfo = (customValues?: Partial<UserInfo>): UserInfo => ({
  ...mockUser(),
  fanletterCount: 2,
  follows: [],
  followCount: 0,
  savedMessageCount: 3,
  points: 123,
  ...customValues
});

export const mockUserInfoResponse = (
  customValues?: Partial<UserInfoResponse>
): UserInfoResponse => ({
  user: mockUserInfo(),
  ...customValues
});

export const mockFollowArtistResponse = (
  customValues?: Partial<FollowArtistResponse>
): FollowArtistResponse => ({
  result: "OK",
  ...customValues
});

export const mockUnfollowArtistResponse = (
  customValues?: Partial<UnfollowArtistResponse>
): UnfollowArtistResponse => ({
  result: "OK",
  ...customValues
});
