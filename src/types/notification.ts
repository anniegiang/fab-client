import {Id, ImageUrl, ZeroOrOne, YesNo, TimeValueOf} from "Types/common";
import {ArtistUser} from "Types/artist";

export type Notification = {
  id: Id;
  messageThumbnailImage: ImageUrl;
  messageId: Id;
  commentId: Id;
  notificationUserId: Id;
  artistUser: ArtistUser;
  batchServerId: Id;
  notificationGroupId: Id;
  isGroup: YesNo;
  type: ZeroOrOne;
  userId: Id;
  isRead: ZeroOrOne;
  createdAt: TimeValueOf;
  parentId: ZeroOrOne;
};

export type NotificationsReponse = {
  notifications: Notification[];
};
