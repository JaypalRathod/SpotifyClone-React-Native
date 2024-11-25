/**
 * @format
 */

import App from './App';
import {name as appName} from './app.json';
import { PlaybackService } from '@service/PlaybackService';
import { AppRegistry } from 'react-native';
import TrackPlayer from 'react-native-track-player';

TrackPlayer.registerPlaybackService(() => PlaybackService);
AppRegistry.registerComponent(appName, () => App);
