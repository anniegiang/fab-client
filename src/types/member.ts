import {YesNo, ImageUrl, TimeValueOf, Id} from "Types/coreTypes";
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
  affectionateName: number;
  groupName: number;
  agencyName: number;
  agencyEnName: number;
};

export type Member = User & {
  artist: Artist;
  isFollow: YesNo;
  followedUpdatedAt: TimeValueOf;
};
