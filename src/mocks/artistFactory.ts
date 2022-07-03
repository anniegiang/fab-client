import {Artist, ArtistResponse, ArtistUser} from "types/artist";
import {yesNo} from "constants/common";
import {mockUser} from "./userFactory";
import {mockGroup} from "./groupFactory";

const todayValueOf = new Date().valueOf();
const group = mockGroup();
const user = mockUser();

export const mockArtist = (customValues?: Partial<Artist>): Artist => ({
  id: 2,
  artistUserId: user.id,
  groupId: group.id,
  agencyId: group.agencyId,
  managerId: group.managerId,
  name: "artist name",
  enName: "artist english name",
  bannerImage: "https://artist-banner-image.com",
  launchImage: "https://artist-launch-image.com",
  statusMessage: "artist status message",
  messageUpdatedAt: todayValueOf,
  isPublishable: yesNo.yes,
  affectionateName: "artist affectionate name",
  groupName: group.name,
  agencyName: group.agencyName,
  agencyEnName: group.agencyEnName,
  ...customValues
});

export const mockArtistUser = (
  customValues?: Partial<ArtistUser>
): ArtistUser => ({
  ...user,
  artist: mockArtist(),
  isFollow: yesNo.yes,
  followedUpdatedAt: todayValueOf,
  ...customValues
});

export const mockArtistResponse = (
  customValues?: Partial<ArtistResponse>
): ArtistResponse => ({
  artistUsers: [mockArtistUser()],
  ...customValues
});
