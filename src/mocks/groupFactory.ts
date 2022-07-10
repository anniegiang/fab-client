import {Group, GroupResponse, SubscribedGroupsResponse} from "types/group";
import {YES_NO} from "constants/common";

const todayValueOf = new Date().valueOf();

export const mockGroup = (customValues?: Partial<Group>): Group => ({
  id: 4,
  agencyId: 2,
  managerId: 3,
  name: "group name",
  enName: "group english name",
  profileImage: "https://group-profile-image.com",
  bannerImage: "https://group-banner-image.com",
  launchImage: "https://group-launch-image.com",
  statusMessage: "group status message",
  messageUpdatedAt: todayValueOf,
  youtube: "https://youtube.com",
  twitter: "https://twitter.com",
  instagram: "https://instagram.com",
  vlive: "https://vlive.com",
  cafe: "https://daumcafe.com",
  isSolo: YES_NO.no,
  artistUsers: [],
  agencyName: "group agency name",
  agencyEnName: "group agency english name",
  isFollow: YES_NO.yes,
  ...customValues
});

export const mockGroupResponse = (
  customValues?: Partial<GroupResponse>
): GroupResponse => ({
  group: mockGroup(),
  ...customValues
});

export const mockSubscribedGroupsResponse = (
  customValues?: Partial<SubscribedGroupsResponse>
): SubscribedGroupsResponse => ({
  groups: [mockGroup()],
  ...customValues
});
