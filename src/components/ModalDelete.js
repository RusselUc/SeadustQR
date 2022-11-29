import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import ModalLayout from './ModalLayout'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Colors from '../constants/Colors'

const ModalDelete = ({isDelete, productname, setIsDelete, handleDelete}) => {
    return (
        <ModalLayout visible={isDelete}>
            <Text style={{ textAlign: 'center', color: 'black', fontFamily: 'myriadpro-bold', fontSize: responsiveFontSize(2), marginBottom: responsiveHeight(2) }}>
                ¿Eliminar {productname}?
            </Text>
            <Text style={{ textAlign: 'center', color: 'black', fontFamily: 'myriadpro-light', fontSize: responsiveFontSize(2), marginBottom: responsiveHeight(2) }}>
                Una vez realizada la acción no se podrá deshacer
            </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: responsiveHeight(1) }}>
                <TouchableOpacity
                    style={{ backgroundColor: '#899199', borderRadius: 5, paddingHorizontal: responsiveWidth(5), paddingVertical: responsiveHeight(1) }}
                    onPress={setIsDelete}
                >
                    <Text style={{ color: 'white', fontFamily: 'myriadpro-bold', fontSize: responsiveFontSize(1.6) }}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ backgroundColor: Colors.azulSeadust, borderRadius: 5, paddingHorizontal: responsiveWidth(5), paddingVertical: responsiveHeight(1) }}
                    onPress={handleDelete}
                >
                    <Text style={{ color: 'white', fontFamily: 'myriadpro-bold', fontSize: responsiveFontSize(1.6) }}>Confirmar</Text>
                </TouchableOpacity>
            </View>
        </ModalLayout>
    )
}

export default ModalDelete