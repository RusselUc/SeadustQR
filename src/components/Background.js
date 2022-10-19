import { View, Text, ImageBackground } from 'react-native'
import React from 'react'

export default function Background({children}) {
  return (
    <View>
      <ImageBackground source={require('../assets/image/bgPiscina.jpg')}
        style={{height:'100%'}}/>
      <View style={{position:'absolute', marginTop:'15%'}}>
        {children}
      </View>
    </View>
  )
}