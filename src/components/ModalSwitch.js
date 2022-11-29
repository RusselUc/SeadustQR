import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import ModalLayout from './ModalLayout'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Colors from '../constants/Colors'

const ModalSwitch = ({visible, item, handleCancel, setIncomplete, handleUpdate}) => {
    return (
        <ModalLayout visible={visible}>
            <View>
                <Text style={{ textAlign: 'center', color: 'black', fontFamily: 'myriadpro-bold', fontSize: responsiveFontSize(3) }}>
                    Solicitud {item.productname}
                </Text>
                <Text style={{ textAlign: 'center', color: 'black', fontFamily: 'myriadpro-light', fontSize: responsiveFontSize(2) }}>
                    ¿Se completó la solicitud?
                </Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: responsiveHeight(1) }}>
                    <TouchableOpacity
                        style={{ backgroundColor: '#899199', borderRadius: 5, padding: responsiveWidth(2) }}
                        onPress={handleCancel}>
                        <Text style={{ color: 'white', fontFamily: 'myriadpro-bold', fontSize: responsiveFontSize(1.6) }}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ backgroundColor: Colors.doradoSeadust, borderRadius: 5, padding: responsiveWidth(2) }}
                        onPress={setIncomplete}
                    >
                        <Text style={{ color: 'white', fontFamily: 'myriadpro-bold', fontSize: responsiveFontSize(1.6) }}>Incompleta</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ backgroundColor: Colors.azulSeadust, borderRadius: 5, padding: responsiveWidth(2) }}
                        onPress={handleUpdate}
                    >
                        <Text style={{ color: 'white', fontFamily: 'myriadpro-bold', fontSize: responsiveFontSize(1.6) }}>Completa</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ModalLayout>
    )
}

export default ModalSwitch