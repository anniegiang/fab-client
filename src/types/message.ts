import {YesNo, ImageUrl, TimeValueOf, Id, ZeroOrOne} from "types/common";
import {ArtistUser} from "types/artist";
import {Group} from "types/group";

export type LetterImage = {
  id: Id;
  letterId: Id;
  image: ImageUrl;
};

export type Letter = {
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

export enum MessageContentType {
  Image = "image",
  Text = "text",
  LineBreak = "br"
}

export type MessageContent = {
  color: string;
  size: number;
  type: MessageContentType;
  urls: string[];
  text: string;
};

export type ParsedMessageContent = {
  align: string;
  version: string;
  contents: MessageContent[];
};

export type PostCard = {
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
  user?: ArtistUser;
  group?: Group;
  id: Id;
  userId: Id;
  groupId: Id;
  type: ZeroOrOne;
  isGroup: YesNo;
  status: ZeroOrOne;
  publishedAt: TimeValueOf;
  createdAt: TimeValueOf;
  updatedAt: TimeValueOf;
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

export type GroupMessagseResponse = {
  messages: Message[];
};

export type LetterMessageResponse = {
  message: Message;
};

export type NewestMessagesResponse = {
  messages: Message[];
};
