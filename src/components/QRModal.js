import { View, Text, TouchableOpacity, } from 'react-native'
import React from 'react'
import QRCode from 'react-native-qrcode-svg'
import Colors from '../constants/Colors'
import ModalLayout from './ModalLayout'

const QRModal = ({isVisible, qrString, press}) => {
  return (
    <ModalLayout visible={isVisible}>
          <View style={{ alignItems: 'center' }}>
            <QRCode value={qrString} size={180} logo={require('../assets/image/logoNew.png')} />
            <TouchableOpacity
              style={
                {
                  backgroundColor: Colors.azulSeadust,
                  borderRadius: 100,
                  alignItems: 'center',
                  width: 120,
                  paddingVertical: 5,
                  marginVertical: 10,
                }
              }
              onPress={press}
            >
              <Text style={{ color: 'white', fontFamily: 'myriadpro-bold' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </ModalLayout>
  )
}


export default QRModal