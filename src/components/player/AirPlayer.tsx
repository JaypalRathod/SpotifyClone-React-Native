import { View, Text, StyleSheet, Platform, TouchableOpacity, Image } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { useSharedState } from '@features/tabs/SharedContext'
import { usePlaybackState, useProgress } from 'react-native-track-player';
import { usePlayerStore } from '@states/usePlayerStore';
import ImageColors from 'react-native-image-colors'
import { darkenColor, Fonts } from '@utils/Constants';
import LinerGradiant from 'react-native-linear-gradient';
import SlidingText from '@components/ui/SlidingText';
import { fontR } from '@utils/Scaling';
import CustomText from '@components/ui/CustomText';
import Icon from '@components/ui/Icon';

const AirPlayer: FC = () => {

    const [colors, setColors] = useState(['#666', '#666']);
    const progress = useProgress();
    const { expandPlayer } = useSharedState();
    const state = usePlaybackState();
    const isPlaying = state.state === 'playing';
    const { play, pause, currentPlayingTrack } = usePlayerStore();


    useEffect(() => {
        const url = currentPlayingTrack?.artwork_uri;
        ImageColors.getColors(url, {
            fallback: '#666',
            cache: true,
            key: url
        }).then((c: any) => {
            const color = Platform.OS === 'ios' ? c.secondary : c.vibrant;
            const darkenedSecondary = darkenColor(color);
            setColors([darkenedSecondary, darkenedSecondary])
        })
    }, [currentPlayingTrack])


    const calculateProgressWidth: any = () => {
        if (progress?.duration > 0) {
            const percentage = (progress?.position / progress?.duration) * 100;
            return `${percentage}%`;
        }
        return '0%'
    }

    const togglePlayback = () => {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    }

    return (
        <LinerGradiant colors={colors} style={styles.container}>
            <View style={styles.flexRowBetween}>
                <TouchableOpacity onPress={expandPlayer} activeOpacity={1}>
                    <View style={styles.flexRow}>
                        <Image
                            source={currentPlayingTrack?.artwork_uri}
                            style={styles.img}
                        />
                        <View style={{ width: '68%' }}>
                            <SlidingText
                                fontFamily={Fonts.Bold}
                                fontSize={fontR(8)}
                                text={currentPlayingTrack?.title}
                            />
                            <CustomText
                                fontFamily={Fonts.Medium}
                                numberOfLines={1}
                                fontSize={fontR(9)}
                                style={{ opacity: 0.8 }}
                            >
                                {currentPlayingTrack?.artist?.name}
                            </CustomText>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={styles.flexRow}>
                    <Icon
                        name='broadcast-on-home'
                        iconFamily='MaterialIcons'
                        color='#ccc'
                        size={fontR(20)}
                    />
                    <TouchableOpacity onPress={togglePlayback}>
                        <Icon
                            name={isPlaying ? 'pause' : 'play-arrow'}
                            iconFamily='MaterialIcons'
                            size={fontR(22)}
                        />
                    </TouchableOpacity>
                </View>

            </View>

            <View style={styles.progressContainer}>
                <View style={styles.progressBackground}>
                    <View style={[styles.progressBar, { width: calculateProgressWidth() }]} />
                </View>
            </View>

        </LinerGradiant>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 4,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
        overflow: 'hidden',
        width: '100%',
    },
    img: {
        height: 45,
        width: 45,
        borderRadius: 5,
        resizeMode: 'cover',
    },
    flexRowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    progressContainer: {
        height: 2,
        width: '100%',
        marginTop: 5
    },
    progressBackground: {
        height: 3,
        backgroundColor: 'rgba(255,255,255,0.3)'
    },
    progressBar: {
        height: 3,
        backgroundColor: '#fff',
    }

})

export default AirPlayer