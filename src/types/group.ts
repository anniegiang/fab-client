import {YesNo, ImageUrl, TimeValueOf, Id} from "Types/common";
import {ArtistUser} from "Types/artist";

export type Group = {
  id: Id;
  agencyId: Id;
  managerId: Id;
  name: string;
  enName: string;
  profileImage: ImageUrl;
  bannerImage: ImageUrl;
  launchImage: ImageUrl;
  statusMessage: string;
  messageUpdatedAt: TimeValueOf;
  youtube: string;
  twitter: string;
  instagram: string;
  vlive: string;
  cafe: string;
  isSolo: YesNo;
  artistUsers: ArtistUser[];
  agencyName: string;
  agencyEnName: string;
  isFollow: YesNo;
};

export type GroupResponse = {
  group: Group;
};

export type SubscribedGroupsResponse = {
  groups: Group[];
};
