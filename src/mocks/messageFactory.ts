import {mockUser} from "./userFactory";
import {mockGroup} from "./groupFactory";
import {mockArtistUser} from "./artistFactory";
import {yesNo, zeroOrOne} from "constants/common";
import {
  LetterImage,
  Letter,
  PostCard,
  Message,
  ArtistMessageResponse,
  GroupMessageResponse,
  LetterMessageResponse,
  NewestMessagesResponse
} from "types/message";

const todayValueOf = new Date().valueOf();
const user = mockUser();
const group = mockGroup();
const artistUser = mockArtistUser();

const LETTER_ID = 13;
const POST_CARD_ID = 14;
const MESSAGE_ID = 5;

export const mockLetterImage = (
  customValues?: Partial<LetterImage>
): LetterImage => ({
  id: 13,
  letterId: LETTER_ID,
  image: "https//letter-image.com",
  ...customValues
});

export const mockLetter = (customValues?: Partial<Letter>): Letter => ({
  id: LETTER_ID,
  messageId: MESSAGE_ID,
  userId: user.id,
  text: "letter text",
  thumbnail: "https//thumbnail.com",
  isEncrypted: yesNo.no,
  status: zeroOrOne.one,
  createdAt: todayValueOf,
  updatedAt: todayValueOf,
  images: [mockLetterImage()],
  ...customValues
});

export const mockPostCard = (customValues?: Partial<PostCard>): PostCard => ({
  id: POST_CARD_ID,
  messageId: MESSAGE_ID,
  userId: user.id,
  postcardImage: "https//post-card-image.com",
  postcardVideo: "https//post-card-video.com",
  thumbnail: "https//thumbnail.com",
  isEncrypted: yesNo.no,
  type: zeroOrOne.zero,
  status: zeroOrOne.one,
  createdAt: todayValueOf,
  updatedAt: todayValueOf,
  ...customValues
});

export const mockMessage = (customValues?: Partial<Message>): Message => ({
  id: MESSAGE_ID,
  userId: user.id,
  groupId: group.id,
  type: zeroOrOne.one,
  isGroup: yesNo.no,
  status: zeroOrOne.one,
  publishedAt: todayValueOf,
  createdAt: todayValueOf,
  updatedAt: todayValueOf,
  user: artistUser,
  isLike: yesNo.no,
  isSave: yesNo.no,
  isRead: yesNo.yes,
  likeCount: 0,
  commentCount: 10,
  isNewArtistUserComment: yesNo.no,
  ...customValues
});

const message = mockMessage();

export const mockArtistMessageResponse = (
  customValues?: Partial<ArtistMessageResponse>
): ArtistMessageResponse => ({
  messages: [message],
  ...customValues
});

export const mockGroupMessageResponse = (
  customValues?: Partial<GroupMessageResponse>
): GroupMessageResponse => ({
  messages: [message],
  ...customValues
});

export const mockLetterMessageResponse = (
  customValues?: Partial<LetterMessageResponse>
): LetterMessageResponse => ({
  message,
  ...customValues
});

export const mockNewestMessagesResponse = (
  customValues?: Partial<NewestMessagesResponse>
): NewestMessagesResponse => ({
  messages: [message],
  ...customValues
});
