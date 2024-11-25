import React, { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@features/home/HomeScreen';
import SearchScreen from '@features/search/SearchScreen';
import LibraryScreen from '@features/library/LibraryScreen';
import CustomTabBar from './CustomTabBar';

const Tab = createBottomTabNavigator();

const UserBottomTab: FC = () => {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={() => ({
                headerShown: false,
                tabBarHideOnKeyboard: true,
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Library" component={LibraryScreen} />
        </Tab.Navigator>
    )
}

export default UserBottomTab