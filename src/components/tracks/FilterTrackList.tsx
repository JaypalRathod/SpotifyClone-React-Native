import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, { FC } from 'react'
import CustomHeader from '@components/ui/CustomHeader'
import TrackItem from './TrackItem'

const FilterTrackList: FC<{ mood: string, allTracks: any }> = ({
    mood, allTracks
}) => {


    const renderMusicTrack = ({ item }: any) => {
        return (<TrackItem item={item} onNavigate />)
    }

    return (
        <SafeAreaView>
            <CustomHeader title={`Based on your mood - ${mood}`} />
            <FlatList
                data={allTracks}
                renderItem={renderMusicTrack}
                keyExtractor={(item: any) => item.id}
                showsVerticalScrollIndicator={false}
                style={{ paddingTop: 20 }}
            />
        </SafeAreaView>
    )
}

export default FilterTrackList