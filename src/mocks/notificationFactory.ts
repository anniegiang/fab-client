import {Notification, NotificationsReponse} from "types/notification";
import {mockArtistUser} from "./artistFactory";
import {mockUser} from "./userFactory";
import {yesNo, zeroOrOne} from "constants/common";

const todayValueOf = new Date().valueOf();
const artist = mockArtistUser();
const user = mockUser();

export const mockNotification = (
  customValues?: Notification
): Notification => ({
  id: 321,
  messageThumbnailImage: "https://message-thumbnail-image.com",
  messageId: 432,
  commentId: 415,
  notificationUserId: user.id,
  artistUser: artist,
  batchServerId: 2,
  notificationGroupId: 3,
  isGroup: yesNo.yes,
  type: zeroOrOne.zero,
  userId: user.id,
  isRead: zeroOrOne.one,
  createdAt: todayValueOf,
  parentId: zeroOrOne.zero,
  ...customValues
});

export const mockNotificationsReponse = (
  customValues?: NotificationsReponse
): NotificationsReponse => ({
  notifications: [mockNotification()],
  ...customValues
});
