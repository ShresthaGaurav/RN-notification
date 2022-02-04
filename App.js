import {Button, StyleSheet, AppState, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NotfListener, requestUserPermission} from './remoteNotiHandler';

const App = () => {
  //   const noti = new NotifService();

  useEffect(() => {
    // remotoNotiHandler();
    // noti.createOrUpdateChannel();

    requestUserPermission();
    NotfListener();
  }, []);
  return (
    <View>
      {/* {RemoteNoti()} */}
      <Text>hello</Text>
      <Button
        title="noti"
        onPress={() => {
          //   noti.localNotif();
        }}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
