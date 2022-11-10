import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'
import QRCode from 'react-native-qrcode-svg'

export default function Home() {
    return (
        <SafeAreaView style={{ backgroundColor: '#F5F5F5', height: '100%' }}>

            <StatusBar
                backgroundColor={Colors.doradoSeadust}
                translucent={false}
            />
            <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
                <QRCode value='Hola mundo' />
            </View>

        </SafeAreaView>
    )
}