import {yesNo, zeroOrOne} from "constants/common";
import {Comment, CommentsResponse} from "types/comment";
import {mockMessage} from "mocks/messageFactory";

const todayValueOf = new Date().valueOf();
const todayUTC = new Date().toUTCString();
const message = mockMessage();

export const mockComment = (customValues?: Partial<Comment>): Comment => ({
  id: 32,
  messageId: message.id,
  parentId: 31,
  userId: message.user.id,
  groupId: message.groupId,
  isGroup: message.isGroup,
  comment: "message comment",
  status: zeroOrOne.one,
  createdAt: todayValueOf,
  updatedAt: todayUTC,
  isArtist: yesNo.yes,
  name: message.user.artist.name,
  enName: message.user.artist.enName,
  profileImage: message.user.profileImage,
  userNickname: message.user.nickName,
  isLike: yesNo.no,
  subComments: [],
  ...customValues
});

export const mockCommentsReponse = (
  customValues?: Partial<CommentsResponse>
): CommentsResponse => ({
  comments: [mockComment()],
  ...customValues
});
