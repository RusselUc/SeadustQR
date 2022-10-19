import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'

export default function Button({ bgColor, btnLabel, textColor, onPress }) {
    const {heigth, width} = Dimensions.get('window')
    return (
        <TouchableOpacity
            onPress={onPress}
            style={
                {
                    backgroundColor: bgColor,
                    borderRadius: 100,
                    alignItems: 'center',
                    width: width - 50,
                    paddingVertical: 5,
                    marginVertical: 10,
                    marginTop:'8%'
                }
            }>
            <Text style={{ color: textColor, fontSize: 25, fontWeight: 'bold' }}>
                {btnLabel}
            </Text>
        </TouchableOpacity>
    )
}