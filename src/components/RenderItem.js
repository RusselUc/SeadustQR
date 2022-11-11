import { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Switch } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import Colors from '../constants/Colors'
import styles from '../constants/Styles'
import ModalLayout from './ModalLayout'
const RenderItem = ({ item }) => {

    const [showContent, setShowContent] = useState(false)
    const [isVisible, setisVisible] = useState(false)
    return (
        <View style={{ backgroundColor: 'white', borderRadius: 15, marginTop: 5 }}>
            <TouchableOpacity onPress={() => setShowContent(!showContent)}>
                <View style={styles.container}>
                    <Text style={{ color: 'black', fontFamily: 'myriadpro-bold' }}>Folio: </Text>
                    <Text style={{ marginRight: 10, color: 'black', fontFamily: 'myriadpro-light' }}>
                        {item.id}
                    </Text>
                    <Switch/>
                </View>

                <View style={styles.container}>
                    <Text style={{ color: 'black', fontFamily: 'myriadpro-bold' }}>Solicitante: </Text>
                    <Text style={{ marginRight: 10, color: 'black', fontFamily: 'myriadpro-light' }}>
                        {item.name}
                    </Text>
                </View>

                <View style={styles.container}>
                    <Text style={{ color: 'black', fontFamily: 'myriadpro-bold' }}>Fecha: </Text>
                    <Text style={{ marginRight: 10, color: 'black', fontFamily: 'myriadpro-light' }}>
                        {item.date}
                    </Text>
                </View>

                {showContent && (
                    <View style={{ alignItems: 'flex-end', marginRight: 15, marginBottom: 15 }}>
                        <TouchableOpacity
                            onPress={() => setisVisible(true)}
                            style={{ backgroundColor: Colors.doradoSeadust, borderRadius: 20, padding: 7 }}>
                            <Text style={{ color: 'black' }}>Ver QR</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </TouchableOpacity>
            <ModalLayout visible={isVisible}>
                <View style={{ alignItems: 'center' }}>
                    <QRCode value={item.id} size={180} logo={require('../assets/image/logoAzul.png')}/>
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
                        onPress={() => setisVisible(false)}
                    >
                        <Text style={{ color: 'white' }}>OK</Text>
                    </TouchableOpacity>
                </View>
            </ModalLayout>
        </View>
    )
}

export default RenderItem