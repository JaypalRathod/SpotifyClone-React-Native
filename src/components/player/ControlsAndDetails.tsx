import { Image, Platform, StyleSheet, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import TrackPlayer, { usePlaybackState, useProgress } from 'react-native-track-player';
import { usePlayerStore } from '@states/usePlayerStore';
import { Colors, Fonts } from '@utils/Constants';
import { fontR, screenWidth } from '@utils/Scaling';
import SlidingText from '@components/ui/SlidingText';
import CustomText from '@components/ui/CustomText';
import ScalePress from '@components/ui/ScalePress';
import Icon from '@components/ui/Icon';
import Slider from '@react-native-community/slider';
import PackageIcon from 'react-native-vector-icons/MaterialIcons';

const ControlsAndDetails: FC = () => {

    const [colors, setColors] = useState(['#666', '#666']);
    const [icon, setIcon] = useState()
    const progress = useProgress();
    const state = usePlaybackState();
    const isPlaying = state.state === 'playing';
    const { play, pause, privious, next, currentPlayingTrack, toggleRepeat, toggleSuffle, isRepeating } = usePlayerStore();

    const formatTime = (seconds: any) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`
    }

    const togglePlayback = () => {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    }

    const handleSeek = async (value: any) => {
        await TrackPlayer.seekTo(value * progress?.duration)
    }

    useEffect(() => {
        PackageIcon.getImageSource('circle', 15, 'white').then(setIcon)
    }, [])


    const handleLooping = async () => {
        if (isRepeating) {
            toggleSuffle()
        } else {
            toggleRepeat()
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.flexRowBetwwen}>
                <View style={{ width: '85%' }}>
                    <SlidingText
                        fontFamily={Fonts.Bold}
                        fontSize={fontR(14)}
                        text={currentPlayingTrack?.title}
                    />
                    <CustomText
                        fontSize={fontR(9)}
                        fontFamily={Fonts.Medium}
                        style={styles.artist}
                    >
                        {currentPlayingTrack?.artist?.name}
                    </CustomText>
                </View>

                <ScalePress>
                    <Icon name='add-circle-outline' iconFamily='MaterialIcons' size={fontR(28)} />
                </ScalePress>

            </View>

            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                value={progress?.position / progress?.duration || 0}
                tapToSeek
                onSlidingComplete={handleSeek}
                thumbImage={icon}
                minimumTrackTintColor='#fff'
                maximumTrackTintColor='rgba(255, 255, 255,0.2)'
            />

            <View style={styles.timeZone}>
                <CustomText fontSize={fontR(7)}>{formatTime(progress?.position)}</CustomText>
                <CustomText fontSize={fontR(7)}>{formatTime(progress?.duration - progress?.position)}</CustomText>
            </View>

            <View style={styles.flexRowBetwwen}>
                <ScalePress onPress={handleLooping}>
                    <Icon
                        name={isRepeating ? 'repeat' : 'shuffle'}
                        iconFamily='Ionicons'
                        color={Colors.primary}
                        size={fontR(22)}
                    />
                </ScalePress>
                <ScalePress onPress={privious}>
                    <Icon
                        name='play-skip-back-sharp'
                        iconFamily='Ionicons'
                        size={fontR(26)}
                    />
                </ScalePress>
                <ScalePress onPress={togglePlayback}>
                    <Icon
                        name={isPlaying ? 'pause-circle-sharp' : 'play-circle-sharp'}
                        iconFamily='Ionicons'
                        size={fontR(50)}
                    />
                </ScalePress>
                <ScalePress onPress={next}>
                    <Icon
                        name='play-skip-forward-sharp'
                        iconFamily='Ionicons'
                        size={fontR(26)}
                    />
                </ScalePress>
                <ScalePress>
                    <Icon
                        name='alarm'
                        iconFamily='MaterialCommunityIcons'
                        size={fontR(22)}
                    />
                </ScalePress>
            </View>

            <View style={styles.artistContainer}>
                <Image source={currentPlayingTrack?.artist?.cover_uri} style={styles.artistCover} />
                <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
                    <CustomText fontFamily={Fonts.Bold} fontSize={fontR(11)} >{currentPlayingTrack?.artist?.name}</CustomText>
                    <CustomText fontFamily={Fonts.Medium} fontSize={fontR(8)} style={{ opacity: 0.7 }} >1.7m monthly listeners</CustomText>
                    <CustomText fontFamily={Fonts.Medium} fontSize={fontR(8)} numberOfLines={3} style={{ marginTop: 10, opacity: 0.8 }} >{currentPlayingTrack?.artist?.bio}</CustomText>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <CustomText fontFamily={Fonts.Bold} fontSize={fontR(11)} >
                    Credits
                </CustomText>
                <CustomText style={styles.tittleText} fontFamily={Fonts.Medium} fontSize={fontR(9)} >
                    {currentPlayingTrack?.artist?.name}
                </CustomText>
                <CustomText style={styles.subText} fontSize={fontR(8)}>
                    Main Artist, Composer, Producer
                </CustomText>

                <CustomText style={styles.tittleText} fontFamily={Fonts.Medium} fontSize={fontR(9)} >
                    {currentPlayingTrack?.lyricist}
                </CustomText>
                <CustomText style={styles.subText} fontSize={fontR(8)}>
                    Lyricist
                </CustomText>
            </View>

            <View style={styles.modelContainer}>
                <CustomText fontFamily={Fonts.Bold} fontSize={fontR(16)}>
                    Spotify x Jaypal Rathod
                </CustomText>
                <CustomText fontFamily={Fonts.Bold} fontSize={fontR(12)}>
                    made with 🤍
                </CustomText>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        zIndex: 88
    },
    subText: {
        marginTop: 2,
        opacity: 0.8
    },
    tittleText: {
        marginTop: 10
    },
    modelContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        marginBottom: 40,
        opacity: 0.6
    },
    artistContainer: {
        backgroundColor: Colors.backgroundLight,
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: 40
    },
    infoContainer: {
        backgroundColor: Colors.backgroundLight,
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: 20,
        padding: 10
    },
    artistCover: {
        height: 200,
        width: '100%',
        resizeMode: 'cover'
    },
    slider: {
        width: Platform.OS === 'android' ? screenWidth : screenWidth - 30,
        height: 40,
        alignSelf: 'center',
        marginTop: 10
    },
    timeZone: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        bottom: 10
    },
    flexRowBetwwen: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    artist: {
        opacity: 0.8,
        marginTop: 5
    }
})

export default ControlsAndDetails