import {User, UserInfo, UserInfoResponse} from "types/user";
import {yesNo, zeroOrOne} from "constants/common";
import {mockAuthHeaders} from "./authHeadersFactory";

const todayValueOf = new Date().valueOf();
const authHeaders = mockAuthHeaders();

export const mockUser = (customValues?: Partial<User>): User => ({
  id: authHeaders.userid,
  email: "user@gmail.com",
  nickName: "user nickname",
  profileImage: "https://user-profile-image.com",
  birthday: "20000101",
  type: zeroOrOne.zero,
  isAllowMessagePush: yesNo.yes,
  isAllowCommentPush: yesNo.no,
  status: zeroOrOne.one,
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
