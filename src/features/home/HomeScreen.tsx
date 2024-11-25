import { FlatList, Text } from 'react-native'
import React, { FC } from 'react'
import CustomeSafeAreaView from '@components/ui/CustomeSafeAreaView'
import withPlayer from '@components/player/Player'
import { usePlayerStore } from '@states/usePlayerStore'
import CustomHeader from '@components/ui/CustomHeader'
import TrackItem from '@components/tracks/TrackItem'

const HomeScreen: FC = () => {

  const { allTracks } = usePlayerStore()

  const renderMusicTrack = ({ item }: any) => {
    return <TrackItem item={item} />
  }

  return (
    <CustomeSafeAreaView>
      <CustomHeader title="Your Tracks" />

      <FlatList
        data={allTracks}
        renderItem={renderMusicTrack}
        keyExtractor={(item: any) => item.id}
        showsVerticalScrollIndicator={false}
        style={{ paddingTop: 20 }}
      />

    </CustomeSafeAreaView>
  )
}

export default withPlayer(HomeScreen)