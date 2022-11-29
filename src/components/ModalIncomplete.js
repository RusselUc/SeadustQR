import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import ModalLayout from './ModalLayout'
import CustomInput from './CustomInput'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Colors from '../constants/Colors'
import Icon from 'react-native-vector-icons/FontAwesome';

const ModalIncomplete = ({visible, item, handleIncomplete, piece, erro, handleSum, handleRes, setIncomplete, handlePiece}) => {
  return (
    <ModalLayout visible={visible}>
                <Text style={{ textAlign: 'center', color: 'black', fontFamily: 'myriadpro-bold', fontSize: responsiveFontSize(2), marginBottom: responsiveHeight(2) }}>
                    Ingresa las piezas faltantes
                </Text>
                {
                    erro && (
                        <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5) }}>Excede las piezas {item.missingPiece ? 'restantes ' : 'hechas '}en la solicitud</Text>
                    )
                }
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: responsiveHeight(1) }}>
                    <View style={{ justifyContent: 'center' }}>
                        <CustomInput
                            keyboardType='numeric'
                            placeholder="No.Piezas"
                            onChangeText={handlePiece}
                            value={piece === "" ? "" : piece.toString()}
                        />
                    </View>
                    <View>
                        <TouchableOpacity onPress={handleSum}>
                            <Icon name='caret-up' style={{ color: Colors.azulSeadust, fontSize: responsiveFontSize(4.5) }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleRes}>
                            <Icon name='caret-down' style={{ color: Colors.azulSeadust, fontSize: responsiveFontSize(4.5) }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: responsiveHeight(1) }}>
                    <TouchableOpacity
                        style={{ backgroundColor: '#899199', borderRadius: 5, paddingHorizontal: responsiveWidth(5), paddingVertical: responsiveHeight(1) }}
                        onPress={setIncomplete}
                    >
                        <Text style={{ color: 'white', fontFamily: 'myriadpro-bold', fontSize: responsiveFontSize(1.6) }}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ backgroundColor: Colors.azulSeadust, borderRadius: 5, paddingHorizontal: responsiveWidth(5), paddingVertical: responsiveHeight(1) }}
                        onPress={handleIncomplete}
                    >
                        <Text style={{ color: 'white', fontFamily: 'myriadpro-bold', fontSize: responsiveFontSize(1.6) }}>Confirmar</Text>
                    </TouchableOpacity>
                </View>
            </ModalLayout>
  )
}

export default ModalIncomplete