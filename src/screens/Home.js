import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'

export default function Home() {
    return (
        <SafeAreaView style={{ backgroundColor: Colors.bgSuave, height: '100%' }}>

            <StatusBar
                backgroundColor="#c2b5ea"
                // translucent={true}
                />

            <Text>Home</Text>

        </SafeAreaView>
    )
}