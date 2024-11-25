import { trackData } from '@utils/dummyData';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { mmkvStorage } from './storage';
import TrackPlayer, { RepeatMode } from 'react-native-track-player';
import { convertTrack } from '@utils/Constants';

interface Track {
    id: any;
    track_uri: string;
    video_uri?: string;
    title: string;
    lyricist: string;
    artist: any;
    artwork_uri: any;
    category: string;
}

interface PlayerStore {
    currentPlayingTrack: Track | null;
    allTracks: Track[];
    isShuffling: boolean;
    isRepeating: boolean;
    clear: () => void;
    setCurrentTrack: (track: Track) => Promise<void>;
    setCurrentPlayingTrack: (track: Track) => Promise<void>;
    play: () => Promise<void>;
    pause: () => Promise<void>;
    next: () => Promise<void>;
    privious: () => Promise<void>;
    toggleRepeat: () => Promise<void>;
    toggleSuffle: () => Promise<void>;
}


export const usePlayerStore = create<PlayerStore>()(
    persist(
        (set, get) => ({
            currentPlayingTrack: null,
            allTracks: trackData,
            isShuffling: false,
            isRepeating: false,
            clear: () => {
                set({ currentPlayingTrack: null })
            },
            setCurrentTrack: async (track: Track) => {
                set({ currentPlayingTrack: track })
            },
            setCurrentPlayingTrack: async (track: Track) => {
                const { allTracks } = get()
                await TrackPlayer.reset();
                set({ currentPlayingTrack: track });
                const currentTrackConverted = convertTrack(track)
                const otherTracks = allTracks.filter(t => t.id !== track?.id).map(t => convertTrack(t))
                await TrackPlayer.add([currentTrackConverted, ...otherTracks])
                await TrackPlayer.play();
            },
            play: async () => {
                const { currentPlayingTrack, allTracks } = get()
                const activeTrack = await TrackPlayer.getActiveTrack()

                if (activeTrack) {
                    await TrackPlayer.play();
                } else {
                    await TrackPlayer.reset();
                    const currentTrackConverted = convertTrack(currentPlayingTrack)
                    const otherTracks = allTracks.filter(t => t.id !== currentPlayingTrack?.id).map(t => convertTrack(t))
                    await TrackPlayer.add([currentTrackConverted, ...otherTracks])
                    await TrackPlayer.play();
                }
            },
            pause: async () => {
                await TrackPlayer.pause();
            },
            next: async () => {
                const { currentPlayingTrack, allTracks, isRepeating } = get()
                await TrackPlayer.reset();
                if (isRepeating) {
                    await TrackPlayer.add([convertTrack(currentPlayingTrack)])
                    await TrackPlayer.play();
                    return
                }
                const currentIndex = allTracks?.findIndex(track => track.id === currentPlayingTrack?.id)
                let nextIndex = (currentIndex + 1) % allTracks?.length
                if (allTracks?.length === 1) {
                    nextIndex = currentIndex
                }
                const nextTrack = allTracks[nextIndex]
                if (nextTrack) {
                    set({ currentPlayingTrack: nextTrack })
                    const otherTracks = allTracks.filter(t => t.id !== nextTrack?.id).map(t => convertTrack(t))
                    await TrackPlayer.add([convertTrack(nextTrack), ...otherTracks])
                    await TrackPlayer.play();
                }
            },
            privious: async () => {
                const { currentPlayingTrack, allTracks, isRepeating } = get()
                await TrackPlayer.reset();
                if (isRepeating) {
                    await TrackPlayer.add([convertTrack(currentPlayingTrack)])
                    await TrackPlayer.play();
                    return
                }
                const currentIndex = allTracks?.findIndex(track => track.id === currentPlayingTrack?.id)
                let prevIndex = (currentIndex - 1 + allTracks?.length) % allTracks?.length
                const prevTrack = allTracks[prevIndex]
                if (prevTrack) {
                    set({ currentPlayingTrack: prevTrack })
                    const otherTracks = allTracks.filter(t => t.id !== prevTrack?.id).map(t => convertTrack(t))
                    await TrackPlayer.add([convertTrack(prevTrack), ...otherTracks])
                    await TrackPlayer.play();
                }
            },
            toggleRepeat: async () => {
                const { currentPlayingTrack } = get()
                await TrackPlayer.reset()
                await TrackPlayer.add([convertTrack(currentPlayingTrack)])
                await TrackPlayer.setRepeatMode(RepeatMode.Track)
                await TrackPlayer.play();
                set({ isRepeating: true })
                set({ isShuffling: false })
            },
            toggleSuffle: async () => {
                const { currentPlayingTrack, allTracks } = get()
                await TrackPlayer.reset()
                const otherTracks = allTracks.filter(t => t.id !== currentPlayingTrack?.id).map(t => convertTrack(t))
                await TrackPlayer.add([convertTrack(currentPlayingTrack), ...otherTracks])
                await TrackPlayer.play();
                await TrackPlayer.setRepeatMode(RepeatMode.Off)
                await TrackPlayer.play();
                set({ isRepeating: false })
                set({ isShuffling: true })
            },
        }),
        {
            name: 'player-storage',
            storage: createJSONStorage(() => mmkvStorage)
        }
    ),
)