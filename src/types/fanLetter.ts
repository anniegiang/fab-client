import {YesNo, Id, ImageUrl, ZeroOrOne, TimeValueOf} from "types/common";
import {ArtistUser} from "types/artist";

type FanLetter = {
  id: Id;
  userId: Id;
  profileImage: ImageUrl;
  title: string;
  text: string;
  artistUserId: Id;
  createdAt: TimeValueOf;
  updatedAt: TimeValueOf;
  name?: string; // user's name
  artistUser?: ArtistUser;
};

export type SendFanLetter = {
  id: Id;
  userId: Id;
  title: string;
  text: string;
  artistUserId: Id;
  status: ZeroOrOne;
  isStar: YesNo;
  isRead: YesNo;
  createdAt: TimeValueOf;
  updatedAt: TimeValueOf;
};

export type SendFanLetterPayload = {
  title: string;
  text: string;
};

export type SendFanLetterResponse = {
  fanletter: SendFanLetter;
};

export type FanLetterResponse = {
  fanletter: FanLetter;
};

export type FanLettersReponse = {
  count: number;
  fanletters: FanLetter[];
};

export type DeleteFanLetterResponse = {
  result: string;
};
