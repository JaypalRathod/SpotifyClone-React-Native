import { View, Text, StyleSheet, Animated, Alert, TouchableOpacity } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import CustomeSafeAreaView from '@components/ui/CustomeSafeAreaView'
import { Colors, Fonts } from '@utils/Constants'
import { Camera, CameraDevice, useCameraDevice, useCameraPermission } from 'react-native-vision-camera'
import { usePlayerStore } from '@states/usePlayerStore'
import { resetAndNavigate } from '@utils/NavigationUtils'
import { uploadImage } from '@service/PyService'
import CustomText from '@components/ui/CustomText'
import FilterTrackList from '@components/tracks/FilterTrackList'

const MoodScanner: FC = () => {

  const camaraRef = useRef<Camera>(null)
  const { allTracks } = usePlayerStore()
  const [countdown, setCountdown] = useState(3)
  const [isProccesing, setIsProccesing] = useState(false)
  const [showMessage, setShowMessage] = useState<boolean>(true)
  const [matchingTracks, setMatchingTracks] = useState<any[]>([])
  const [mood, setMood] = useState<any>('')

  const fadeAnim = useRef(new Animated.Value(1)).current
  const device = useCameraDevice('front') as CameraDevice
  const { hasPermission } = useCameraPermission()

  const fetchSong = async (res: any) => {
    const matchingTracks = allTracks.filter(track => track.category === res.emotion);
    setIsProccesing(false)
    setMood(res.emotion)
    if (matchingTracks?.length == 0) {
      Alert.alert("No Songs found ! we are improving it")
      resetAndNavigate('UserBottomTab')
      return
    }
    setMatchingTracks(matchingTracks)
  }

  const tackPicture = async () => {
    camaraRef.current?.takePhoto().then(async (res) => {
      try {
        setIsProccesing(true)
        const mood = await uploadImage(res?.path)
        fetchSong(mood)
      } catch (error) {
        Alert.alert('Server error')
        resetAndNavigate('UserBottomTab')
      }
    })
  }

  const startCountdown = () => {
    let counter = 3;
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1)
      counter -= 1;
      if (counter == 0) {
        clearInterval(interval)
        tackPicture()
      }
    }, 1000);
  }


  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true
    }).start(() => {
      setShowMessage(true)
    })
  }, [])

  useEffect(() => {

    if (!hasPermission) {
      Alert.alert("Camera permission denied. Redirecting...");
      resetAndNavigate('UserBottomTab')
      return;
    }

    const timeout = setTimeout(() => {
      setShowMessage(false)
      startCountdown()
    }, 2000);

    return () => clearTimeout(timeout)
  }, [hasPermission])

  console.log("shown message: " + showMessage)

  return (
    <CustomeSafeAreaView>
      {hasPermission && device && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          photo
          ref={camaraRef}
          isActive={true}
        />
      )}

      {!hasPermission && (
        <View style={styles.centeredView}>
          <View style={[styles.blurContainer, { backgroundColor: 'grey' }]} />
          <CustomText style={{ textAlign: 'center' }} variant='h3' fontFamily={Fonts.Bold} >User has Camara permission not approve..</CustomText>
        </View>
      )}

      {showMessage === true && (
        <Animated.View style={[styles.centeredView, { opacity: fadeAnim }]}>
          <View style={styles.blurContainer} />
          <CustomText style={{ textAlign: 'center' }} variant='h3' fontFamily={Fonts.Bold}>Prepare for your mood scan...</CustomText>
        </Animated.View>
      )}

      {!showMessage && countdown > 0 && (
        <View style={styles.centeredView}>
          <Text style={styles.countDownText}>{countdown}</Text>
        </View>
      )}

      {isProccesing && (
        <View style={styles.centeredView}>
          <View style={styles.blurContainer} />
          <CustomText style={{ textAlign: 'center' }} variant='h3' fontFamily={Fonts.Bold} >Tailoring songs based on your mood...</CustomText>
        </View>
      )}

      {matchingTracks?.length != 0 &&
        <View style={styles.centeredView}>
          <View style={styles.blurContainer} />
          <FilterTrackList mood={mood} allTracks={matchingTracks} />
        </View>
      }

      <TouchableOpacity style={styles.btn} onPress={() => resetAndNavigate('UserBottomTab')} >
        <CustomText variant='h5' fontFamily={Fonts.Bold} style={{ color: '#000' }}>Skip</CustomText>
      </TouchableOpacity>

    </CustomeSafeAreaView>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2
  },
  btn: {
    borderRadius: 10,
    borderWidth: 1,
    position: 'absolute',
    bottom: 50,
    zIndex: 44,
    borderColor: Colors.text,
    alignSelf: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
  },
  countDownText: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
  },
  blurContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)'
  }
})

export default MoodScanner