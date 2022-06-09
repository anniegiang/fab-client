import {YesNo, ImageUrl, TimeValueOf} from "Types/coreTypes";
import {User} from "Types/user";

export type Artist = {
  id: number;
  artistUserId: number;
  groupId: number;
  agencyId: number;
  managerId: number;
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
