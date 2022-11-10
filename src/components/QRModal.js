import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import QRCode from 'react-native-qrcode-svg'
import Button from './Button'
import Colors from '../constants/Colors'

const WIDTH = Dimensions.get('window').width
const HEIGHT = 150

export default function QRModal({qrString, press}) {
  return (
    <TouchableOpacity
        disabled={true}
        style={styles.container}
    >

        <View style={styles.modal}>
            <QRCode value={qrString}/>
            <Button btnLabel="OK" bgColor={Colors.primaryAlpha} onPress={press} />
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    modal:{
        height:HEIGHT,
        width:WIDTH-80,
        paddingTop:10,
        backgroundColor:'white',
        borderRadius:10
    }
})