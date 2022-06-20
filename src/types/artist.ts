import {YesNo, ImageUrl, TimeValueOf, Id} from "Types/common";
import {User} from "Types/user";

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
  groupName: number;
  agencyName: number;
  agencyEnName: number;
};

export type Member = User & {
  artist: Artist;
  isFollow: YesNo;
  followedUpdatedAt: TimeValueOf;
};

export type ArtistResponse = {
  artistUsers: Member[];
};
