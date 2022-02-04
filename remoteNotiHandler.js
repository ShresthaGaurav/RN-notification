import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

export async function requestUserPermission() {
  await messaging()
    .hasPermission()
    .then(enabled => {
      if (enabled) {
        messaging()
          .getToken()
          .then(token => {
            console.log('FCM token', token);
            // storeToken(token);
          })
          .catch(error => {
            console.log('error on get token  from firebase', error);
          });
        // Listen to whether the token changes
        return messaging().onTokenRefresh(token => {
          console.log('FCM token', token);
        });
      } else
        try {
          messaging()
            .requestPermission()
            .then(() => {
              console.log('Got Permission for getting token');
            })
            .catch(error => {
              console.log('Error on req permission', error);
            });
        } catch (error) {
          console.log('Messaging permission Rejected');
        }
    })
    .catch(error => {
      console.log(error);
    });
}

export const NotfListener = async () => {
  // When app is running but in background
  messaging().onNotificationOpenedApp(async remoteMessage => {
    PushNotification.localNotification({
      message: remoteMessage.notification.body,
      title: remoteMessage.notification.title,
      bigPictureUrl: remoteMessage.notification.android.imageUrl,
      smallIcon: remoteMessage.notification.android.imageUrl,
    });
  });

  // When application is opened from quit state
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage)
        PushNotification.localNotification({
          message: remoteMessage.notification.body,
          title: remoteMessage.notification.title,
          bigPictureUrl: remoteMessage.notification.android.imageUrl,
          smallIcon: remoteMessage.notification.android.imageUrl,
        });
    });

  // When app in foreground and handle when new msg arrived
  messaging().onMessage(async remoteMessage => {
    // console.log('New fg msg: ', remoteMessage);
    if (remoteMessage) {
      // check title of notf
      // if upgrade to user notf and app on foreground, update user info

      // fetch new notification
      PushNotification.localNotification({
        message: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
        bigPictureUrl: remoteMessage.notification.android.imageUrl,
        smallIcon: remoteMessage.notification.android.imageUrl,
      });
    }
  });
};

// const showNotification = remoteMessage => {
//   PushNotification.localNotification({
//     title: remoteMessage.notification.title,
//     message: remoteMessage.notification.body,
//     largeIcon: '',
//     smallIcon: 'ic_launcher',
//     soundName: 'default',
//   });
//   store.dispatch(increaseNotificationCount());
//   //store.dispatch(fetchNotification());
// };
