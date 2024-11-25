import { View, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { screenHeight, screenWidth } from '@utils/Scaling'
import Video from 'react-native-video'
import LinearGradient from 'react-native-linear-gradient'

const VideoPlayer: FC<{ video_uri: any }> = ({ video_uri }) => {
    return (
        <View>
            <Video
                source={video_uri}
                ignoreSilentSwitch='ignore'
                playWhenInactive={false}
                playInBackground={false}
                controls={false}
                disableFocus={true}
                muted
                style={styles.videoContainer}
                repeat
                hideShutterView
                resizeMode='cover'
                shutterColor='transparent'
            />

            <LinearGradient
                colors={[
                    'rgba(0,0,0,0)',
                    'rgba(0,0,0,0.1)',
                    'rgba(0,0,0,0.2)',
                    'rgba(0,0,0,0.3)',
                    'rgba(0,0,0,0.4)',
                    'rgba(0,0,0,0.5)',
                    'rgba(0,0,0,0.6)',
                    'rgba(0,0,0,0.7)',
                    'rgba(0,0,0,0.8)',
                    'rgba(0,0,0,0.9)',
                    'rgba(0,0,0,1)',
                ]}
                style={styles.gradiant}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    videoContainer: {
        height: screenHeight,
        width: screenWidth,
        aspectRatio: 9 / 16,
        position: 'absolute',
        zIndex: -2
    },
    gradiant: {
        height: screenHeight,
        width: screenWidth,
        zIndex: -1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }
})

export default VideoPlayer