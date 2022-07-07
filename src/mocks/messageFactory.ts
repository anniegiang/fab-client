import {mockGroup} from "./groupFactory";
import {mockArtistUser} from "./artistFactory";
import {yesNo, zeroOrOne} from "constants/common";
import {
  LetterImage,
  Letter,
  PostCard,
  Message,
  ArtistMessageResponse,
  GroupMessagseResponse,
  LetterMessageResponse,
  NewestMessagesResponse
} from "types/message";

const todayValueOf = new Date().valueOf();
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
  userId: artistUser.id,
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
  userId: artistUser.id,
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
  userId: artistUser.id,
  groupId: group.id,
  type: zeroOrOne.one,
  isGroup: yesNo.no,
  status: zeroOrOne.one,
  publishedAt: todayValueOf,
  createdAt: todayValueOf,
  updatedAt: todayValueOf,
  isLike: yesNo.no,
  isSave: yesNo.no,
  isRead: yesNo.yes,
  likeCount: 0,
  commentCount: 10,
  isNewArtistUserComment: yesNo.no,
  ...customValues
});

export const mockArtistMessage = (
  customValues?: Partial<Message>
): Message => ({
  ...mockMessage(),
  user: artistUser,
  ...customValues
});

export const mockGroupMessage = (customValues?: Partial<Message>): Message => ({
  ...mockMessage(),
  group,
  ...customValues
});

const message = mockArtistMessage();

export const mockArtistMessageResponse = (
  customValues?: Partial<ArtistMessageResponse>
): ArtistMessageResponse => ({
  messages: [message],
  ...customValues
});

export const mockGroupMessagseResponse = (
  customValues?: Partial<GroupMessagseResponse>
): GroupMessagseResponse => ({
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
