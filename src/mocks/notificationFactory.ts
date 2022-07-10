import {Notification, NotificationsReponse} from "types/notification";
import {mockArtistUser} from "./artistFactory";
import {mockUser} from "./userFactory";
import {YES_NO, ZERO_ONE} from "constants/common";

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
  isGroup: YES_NO.yes,
  type: ZERO_ONE.zero,
  userId: user.id,
  isRead: ZERO_ONE.one,
  createdAt: todayValueOf,
  parentId: ZERO_ONE.zero,
  ...customValues
});

export const mockNotificationsReponse = (
  customValues?: NotificationsReponse
): NotificationsReponse => ({
  notifications: [mockNotification()],
  ...customValues
});
