import {YES_NO, ZERO_ONE} from "constants/common";
import {Comment, CommentsResponse} from "types/comment";
import {mockArtistMessage} from "mocks/messageFactory";

const todayValueOf = new Date().valueOf();
const todayUTC = new Date().toUTCString();
const message = mockArtistMessage();
const author = message.user!;

export const mockComment = (customValues?: Partial<Comment>): Comment => ({
  id: 32,
  messageId: message.id,
  parentId: 31,
  userId: author.id,
  groupId: message.groupId,
  isGroup: message.isGroup,
  comment: "message comment",
  status: ZERO_ONE.one,
  createdAt: todayValueOf,
  updatedAt: todayUTC,
  isArtist: YES_NO.yes,
  name: author.artist.name,
  enName: author.artist.enName,
  profileImage: author.profileImage,
  userNickname: author.nickName,
  isLike: YES_NO.no,
  subComments: [],
  ...customValues
});

export const mockCommentsReponse = (
  customValues?: Partial<CommentsResponse>
): CommentsResponse => ({
  comments: [mockComment()],
  ...customValues
});
