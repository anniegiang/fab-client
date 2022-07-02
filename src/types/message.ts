import {YesNo, ImageUrl, TimeValueOf, Id, ZeroOrOne} from "types/common";
import {ArtistUser} from "types/artist";

export type LetterImage = {
  id: Id;
  letterId: Id;
  image: ImageUrl;
};

type Letter = {
  id: Id;
  messageId: Id;
  userId: Id;
  text: string;
  thumbnail: ImageUrl;
  isEncrypted: YesNo;
  status: ZeroOrOne;
  createdAt: TimeValueOf;
  updatedAt: TimeValueOf;
  images: LetterImage[];
};

type PostCard = {
  id: Id;
  messageId: Id;
  userId: Id;
  postcardImage: ImageUrl;
  postcardVideo: ImageUrl;
  thumbnail: ImageUrl;
  type: ZeroOrOne;
  isEncrypted: YesNo;
  status: ZeroOrOne;
  createdAt: TimeValueOf;
  updatedAt: TimeValueOf;
};

export type Message = {
  id: Id;
  userId: Id;
  groupId: Id;
  type: ZeroOrOne;
  isGroup: YesNo;
  status: ZeroOrOne;
  publishedAt: TimeValueOf;
  createdAt: TimeValueOf;
  updatedAt: TimeValueOf;
  user: ArtistUser;
  isLike: YesNo;
  isSave: YesNo;
  isRead: YesNo;
  likeCount: number;
  commentCount: number;
  isNewArtistUserComment: YesNo;
  letter?: Letter;
  postcard?: PostCard;
};

export type ArtistMessageResponse = {
  messages: Message[];
};

export type GroupMessageResponse = {
  messages: Message[];
};

export type LetterMessageResponse = {
  message: Message;
};

export type NewestMessagesResponse = {
  messages: Message[];
};
