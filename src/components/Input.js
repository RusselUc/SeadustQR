import { View, Text, TextInput, Dimensions } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'

export default function Input(props) {
    const {heigth, width} = Dimensions.get('window')
  return (
    <TextInput
        {...props}
        style={{
            borderRadius:100,
            color:Colors.primary,
            paddingHorizontal: 10,
            width:width - 50,
            backgroundColor:'rgb(220,220,220)',
            marginTop:'8%'
        }}
        placeholderTextColor={Colors.primaryLite}
    >

    </TextInput>
  )
}