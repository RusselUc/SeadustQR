import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const ButtonModal = ({press, color, text}) => {
    return (
        <TouchableOpacity
            onPress={press}
            style={
                {
                    backgroundColor: color,
                    borderRadius: 10,
                    alignItems: 'center',
                    width: responsiveWidth(30),
                    paddingVertical: responsiveHeight(0.5),
                    marginVertical: responsiveHeight(1),
                }
            }>
            <Text style={{ color: 'white', fontSize: responsiveFontSize(2), fontFamily: 'myriadpro-bold' }}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export default ButtonModal