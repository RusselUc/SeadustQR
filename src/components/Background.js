import { View, ImageBackground, Dimensions } from 'react-native'
import React from 'react'

export default function Background({ children }) {
  const { heigth } = Dimensions.get('window')
  return (
    <View style={{ heigth: heigth }}>
      <ImageBackground source={require('../assets/image/fondo.jpg')}
        style={{ height: '100%', opacity: 0.7 }}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,112,180,0.3)' }} />
      </ImageBackground>
      <View style={{ position: 'absolute', marginTop: '15%', alignItems: 'center' }}>
        {children}
      </View>
    </View>
  )
}