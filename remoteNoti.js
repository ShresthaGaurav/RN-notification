import React, {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';
import {AppState} from 'react-native';

import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

export default function remoteNoti() {
  useEffect(() => {
    let unsubscribe;
    firebase
      .messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          unsubscribe = messaging().onMessage(remoteMessage => {
            PushNotification.localNotification({
              message: remoteMessage.notification.body,
              title: remoteMessage.notification.title,
              bigPictureUrl: remoteMessage.notification.android.imageUrl,
              smallIcon: remoteMessage.notification.android.imageUrl,
            });
          });
        } else {
          console.log('notification', enabled);
        }
      });
    return unsubscribe;
  }, []);

  // firebase.messaging().onMessage(response => {
  //   // console.log(JSON.stringify(response));
  //   showNotification(response.notification);

  // noti.createOrUpdateChannel();

  // const showNotification = notification => {
  //   console.log('hello', notification);

  //   // localNoti.localNotif({
  //   //   title: notification.title,
  //   //   message: notification.body,
  //   // });
  //   PushNotification.localNotification({
  //     channelId: notification.android.channelId,
  //     title: notification.title || 'asd',
  //     message: notification.body || 'test',
  //   });
  // };
  return <></>;
}

// PushNotification.configure({
//   // (optional) Called when Token is generated (iOS and Android)
//   onRegister: function (token) {
//     console.log('TOKEN:', token);
//   },

//   // (required) Called when a remote or local notification is opened or received
//   onNotification: function (notification) {
//     console.log('REMOTE NOTIFICATION ==>', notification);

//     // process the notification here
//   },
//   // Android only: GCM or FCM Sender ID
//   senderID: '989061140289',
//   popInitialNotification: true,
//   requestPermissions: true,
// });
