import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import Colors from '../constants/Colors'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const CustomInput = (props) => {
    const [focus, setFocus] = useState(Colors.azulSeadust)
    return (
        <TextInput
            style={{ borderColor: focus, borderWidth: 1, borderRadius: 10, paddingHorizontal: responsiveWidth(5), marginBottom: responsiveHeight(1.2) }}
            onFocus={() => setFocus(Colors.doradoSeadust)}
            onBlur={() => setFocus(Colors.azulSeadust)}
            {...props}
        >
        </TextInput>
    )
}

export default CustomInput