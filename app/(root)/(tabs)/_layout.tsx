import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { TextRN } from '~/components/ui/text'

import icons from '@/constants/icons'

const TabIcon = ({ focused, icon, title }: { focused: boolean; icon: any; title: string;}) => (
    <View className="flex-1 mt-3 flex flex-col items-center">
        <Image 
            source={icon} 
            tintColor={focused ? '#000000' : '#888888'} resizeMode="contain" 
            className="size-6" />
        <TextRN
            className={`${focused ? 'text-primary-300 font-inter-medium' : 'text-black-200 font-inter'} text-xs w-full text-center mt-1`}>
            {title}
        </TextRN>
    </View>
)

const TabsLayout = () => {
  return (
    <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: 'white',
                position: 'absolute',
                borderTopWidth: 1,
                minHeight: 70,
            }
        }}
    >
        <Tabs.Screen
            name="index"
            options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon icon={icons.run} focused={focused} title="Home"/>
                )
            }}
        />

        <Tabs.Screen
            name="explore"
            options={{
                title: 'Explore',
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon icon={icons.search} focused={focused} title="Explore"/>
                )
            }}
        />

        <Tabs.Screen
            name="profile"
            options={{
                title: 'Profile',
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon icon={icons.smile} focused={focused} title="Profile"/>
                )
            }}
        />
    </Tabs>
  )
}

export default TabsLayout