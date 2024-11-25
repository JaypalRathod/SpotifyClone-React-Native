import { View, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import CustomeSafeAreaView from '@components/ui/CustomeSafeAreaView'
import CustomHeader from '@components/ui/CustomHeader'
import { fontR, screenHeight } from '@utils/Scaling'
import CustomText from '@components/ui/CustomText'
import Icon from '@components/ui/Icon'

const LibraryScreen: FC = () => {
  return (
    <CustomeSafeAreaView>
      <CustomHeader title="" />
      <View style={styles.container}>
        <Icon
          name='musical-note'
          iconFamily='Ionicons'
          size={fontR(40)}
        />
        <CustomText variant='h5'>
          Comming soon !
        </CustomText>
      </View>
    </CustomeSafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default LibraryScreen