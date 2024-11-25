import { usePlayerStore } from '@states/usePlayerStore';
import TrackPlayer, { Capability, Event } from 'react-native-track-player';

export const PlaybackService = async () => {

    TrackPlayer.addEventListener(Event.RemotePlay, () => {
        TrackPlayer.play()
    });

    TrackPlayer.addEventListener(Event.RemotePause, () => {
        TrackPlayer.pause()
    });

    TrackPlayer.addEventListener(Event.RemoteStop, () => {
        TrackPlayer.stop()
        usePlayerStore.getState().clear();
    });

    TrackPlayer.addEventListener(Event.RemoteNext, async () => {
        await usePlayerStore.getState().next();
    });

    TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
        await usePlayerStore.getState().privious();
    });

    TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, async (e) => {
        const currentTrack = usePlayerStore.getState().currentPlayingTrack;
        if (e?.track?.id === undefined || e?.track?.id === currentTrack?.id) {
            return
        }
        const allTracks = usePlayerStore.getState().allTracks;
        const track = allTracks.find((item) => item.id == e?.track?.id) as any;
        usePlayerStore?.getState().setCurrentTrack(track)
    });

    await TrackPlayer.setupPlayer()

    TrackPlayer.updateOptions({
        capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            Capability.Stop,
        ],

        compactCapabilities: [Capability.Play, Capability.Pause],

        // playIcon: require('./play-icon.png'),
        // pauseIcon: require('./pause-icon.png'),
        // stopIcon: require('./stop-icon.png'),
        // previousIcon: require('./previous-icon.png'),
        // nextIcon: require('./next-icon.png'),
        // icon: require('./notification-icon.png')
    });

}