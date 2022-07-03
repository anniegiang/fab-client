import {YesNo, ImageUrl, TimeValueOf, Id} from "types/common";
import {User} from "types/user";

export type Artist = {
  id: Id;
  artistUserId: Id;
  groupId: Id;
  agencyId: Id;
  managerId: Id;
  name: string;
  enName: string;
  bannerImage: ImageUrl; // link
  launchImage: ImageUrl; // link
  statusMessage: string;
  messageUpdatedAt: TimeValueOf;
  isPublishable: YesNo;
  affectionateName: string;
  groupName: string;
  agencyName: string;
  agencyEnName: string;
};

export type ArtistUser = User & {
  artist: Artist;
  isFollow: YesNo;
  followedUpdatedAt: TimeValueOf;
};

export type ArtistResponse = {
  artistUsers: ArtistUser[];
};
