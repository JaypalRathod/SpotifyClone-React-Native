import React, { useEffect } from 'react'
import Navigation from '@navigation/Navigation'
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { LogBox, Platform } from 'react-native';
import TrackPlayer from 'react-native-track-player';

const App = () => {

  LogBox.ignoreAllLogs();

  useEffect(() => {
    if (Platform.OS === 'android') {
      TrackPlayer.setupPlayer();
    }
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation />
    </GestureHandlerRootView>
  )
}

export default App