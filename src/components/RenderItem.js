import { useContext, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, Switch, Animated, } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import Colors from '../constants/Colors'
import styles from '../constants/Styles'
import ModalLayout from './ModalLayout'
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../context/AuthProvider'
import moment from 'moment'
import 'moment/locale/es'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import CustomInput from './CustomInput'
import QRModal from './QRModal'
import ModalDelete from './ModalDelete'
const RenderItem = ({ item, sucess }) => {

    const [showContent, setShowContent] = useState(false)
    const [isVisible, setisVisible] = useState(false)
    const [success, setSuccess] = useState(false)
    const [enabled, setEnabled] = useState(false)
    const [incomplete, setIncomplete] = useState(false)
    const [piece, setPiece] = useState(0)
    const [isDelete, setIsDelete] = useState(false)

    const [error, setError] = useState(false)

    const { user } = useContext(AuthContext)

    const animationController = useRef(new Animated.Value(0)).current;

    const toogleListItem = () => {
        const config = {
            duration: 300,
            toValue: showContent ? 0 : 1,
            useNativeDriver: true
        }

        Animated.timing(animationController, config).start()
        setShowContent(!showContent)
    }

    const arrowTransform = animationController.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    })

    const handleChange = (e) => {
        setSuccess(!enabled)
        setEnabled(!enabled)
    }

    const handlePiece = (text) => {
        if (!text.trim() || text === "." || text === "-" || text === ",") {
            setPiece("")
        } else if (item.missingPiece) {
            if (parseInt(text) > item.missingPiece) {
                setPiece(item.missingPiece)
                setError(true)
            } else {
                setPiece(parseInt(text))
                setError(false)
            }
        } else if (parseInt(text) > parseInt(item.numPiece)) {
            setPiece(parseInt(item.numPiece))
            setError(true)
        } else {
            setPiece(parseInt(text))
            setError(false)
        }
    }

    const handleSum = () => {
        if (piece === "") {
            setPiece(0 + 1)
            setError(false)
        } else if (item.missingPiece) {
            if (piece >= item.missingPiece) {
                setPiece(item.missingPiece)
            } else {
                setPiece(piece + 1)
                setError(false)

            }
        } else if (piece >= parseInt(item.numPiece)) {
            setPiece(item.numPiece)
        } else {
            setPiece(piece + 1)
            setError(false)
        }
    }
    const handleRes = () => {
        if (piece === "" || piece === 0) {
            setPiece(0)
            setError(false)
        } else {
            setPiece(piece - 1)
            setError(false)
        }
    }

    const handleIncomplete = (item, piece) => {
        if (piece === 0) {
            update(item, "complete", 0)
            setIncomplete(false)
        } else {
            update(item, "incomplete", piece)
            setIncomplete(false)
        }
    }

    const handleCancel = () => {
        setSuccess(false)
        setEnabled(false)
    }

    const handleDelete = (item) => {
        firestore().collection(user.email).doc(item.id).delete()
    }

    const update = (item, completed, missingPiece) => {
        try {
            firestore().collection(user.email).doc(item.id).update(
                {
                    ...item,
                    success: true,
                    completed,
                    missingPiece
                }
            )
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View
            style={{ backgroundColor: "white", borderRadius: 15, marginBottom: 10, elevation: 5, marginLeft: 8, marginRight: 8 }}
        >
            <View>
                <View style={styles.containerHeader}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'black', fontFamily: 'myriadpro-bold' }}>Folio: </Text>
                        <Text style={{ color: 'black', fontFamily: 'myriadpro-light' }}>
                            {item.folio}
                        </Text>
                        {
                            item.success && (
                                <Text style={{
                                    color: `${item.completed === 'complete' ? '#1d8586' : '#f2a18b'}`,
                                    fontSize: responsiveFontSize(2.5),
                                    fontFamily: 'myriadpro-bold',
                                    marginLeft: responsiveWidth(10)
                                }}>
                                    {item.completed === 'complete' ? 'Completado' : 'Incompleto'}
                                </Text>
                            )
                        }
                    </View>

                    <Animated.View style={{ transform: [{ rotateZ: arrowTransform }], marginRight: sucess ? 30 : 0 }}>
                        <TouchableOpacity onPress={() => toogleListItem()}>
                            <Icon name='chevron-up' style={{ color: Colors.azulSeadust, fontSize: responsiveFontSize(2.5) }} />
                        </TouchableOpacity>
                    </Animated.View>


                    {!sucess && (
                        <View style={{ marginRight: 10 }}>
                            <Switch
                                thumbColor={enabled ? Colors.azulSeadust : Colors.doradoSeadust}
                                onValueChange={() => handleChange(item)}
                                value={enabled}
                            />
                        </View>
                    )}

                </View>


                <View style={styles.container}>
                    <Text style={{ color: 'black', fontFamily: 'myriadpro-bold' }}>Material: </Text>
                    <Text style={{ marginRight: 10, color: 'black', fontFamily: 'myriadpro-light' }}>
                        {item.productname}
                    </Text>
                </View>

                <View style={styles.container}>
                    <Text style={{ color: 'black', fontFamily: 'myriadpro-bold' }}>Piezas: </Text>
                    <Text style={{ marginRight: 10, color: 'black', fontFamily: 'myriadpro-light' }}>
                        {item.numPiece}
                    </Text>
                    {
                        item.success && (
                            <>
                                <Text style={{ color: 'black', fontFamily: 'myriadpro-bold' }}>Restantes: </Text>
                                <Text style={{ marginRight: 10, color: 'black', fontFamily: 'myriadpro-light' }}>
                                    {item.missingPiece}
                                </Text>
                            </>
                        )
                    }
                </View>




                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={styles.container}>
                        <Text style={{ color: 'black', fontFamily: 'myriadpro-bold' }}>Solicitante: </Text>
                        <Text style={{ marginRight: 10, color: 'black', fontFamily: 'myriadpro-light' }}>
                            {item.name}
                        </Text>
                    </View>

                    <View style={styles.container}>
                        <Text style={{ color: 'black', fontFamily: 'myriadpro-bold' }}>Fecha: </Text>
                        <Text style={{ marginRight: 10, color: 'black', fontFamily: 'myriadpro-light' }}>
                            {moment(item.date).calendar()}
                        </Text>
                    </View>
                </View>


                {showContent && (
                    <View>
                        <View style={styles.container}>
                            <Text style={{ color: 'black', fontFamily: 'myriadpro-bold' }}>Descripción: </Text>
                            <Text style={{ marginRight: 10, color: 'black', fontFamily: 'myriadpro-light' }}>
                                {item.description}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: '4%', marginLeft:'4%' ,marginBottom: 15 }}>
                            {
                                item.completed === 'incomplete' && (
                                    <TouchableOpacity
                                        onPress={() => setIncomplete(true)}
                                        style={{ backgroundColor: Colors.azulSeadust, borderRadius: 5, padding: 5, justifyContent: 'center' }}>
                                        <Text style={{ color: 'white' }}>Completar</Text>
                                    </TouchableOpacity>
                                )
                            }
                            <TouchableOpacity
                                onPress={() => setisVisible(true)}
                                style={{ backgroundColor: Colors.doradoSeadust, borderRadius: 5, padding: 5, justifyContent: 'center' }}>
                                <Text style={{ color: 'black' }}>Ver QR</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setIsDelete(true)}
                                style={{ backgroundColor: Colors.red, borderRadius: 5, padding: 5, justifyContent: 'center' }}>
                                <Icon name='trash-o' style={{color:'white', fontSize:responsiveFontSize(2.5)}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
            <QRModal isVisible={isVisible} qrString={item.folio.toString()} press={() => setisVisible(false)}/>

            <ModalLayout visible={success}>
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
                            onPress={() => handleCancel()}>
                            <Text style={{ color: 'white', fontFamily: 'myriadpro-bold', fontSize: responsiveFontSize(1.6) }}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ backgroundColor: Colors.doradoSeadust, borderRadius: 5, padding: responsiveWidth(2) }}
                            onPress={() => setIncomplete(true)}
                        >
                            <Text style={{ color: 'white', fontFamily: 'myriadpro-bold', fontSize: responsiveFontSize(1.6) }}>Incompleta</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ backgroundColor: Colors.azulSeadust, borderRadius: 5, padding: responsiveWidth(2) }}
                            onPress={() => update(item, "complete", 0)}
                        >
                            <Text style={{ color: 'white', fontFamily: 'myriadpro-bold', fontSize: responsiveFontSize(1.6) }}>Completa</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ModalLayout>

            <ModalLayout visible={incomplete}>
                <Text style={{ textAlign: 'center', color: 'black', fontFamily: 'myriadpro-bold', fontSize: responsiveFontSize(2), marginBottom: responsiveHeight(2) }}>
                    Ingresa las piezas faltantes
                </Text>
                {
                    error && (
                        <Text style={{ color: 'red', fontSize: responsiveFontSize(1.5) }}>Excede las piezas {item.missingPiece ? 'restantes ' : 'hechas '}en la solicitud</Text>
                    )
                }
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: responsiveHeight(1) }}>
                    <View style={{ justifyContent: 'center' }}>
                        <CustomInput
                            keyboardType='numeric'
                            placeholder="No.Piezas"
                            onChangeText={(text) => handlePiece(text)}
                            value={piece === "" ? "" : piece.toString()}
                        />
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => handleSum()}>
                            <Icon name='caret-up' style={{ color: Colors.azulSeadust, fontSize: responsiveFontSize(4.5) }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleRes()}>
                            <Icon name='caret-down' style={{ color: Colors.azulSeadust, fontSize: responsiveFontSize(4.5) }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: responsiveHeight(1) }}>
                    <TouchableOpacity
                        style={{ backgroundColor: '#899199', borderRadius: 5, paddingHorizontal: responsiveWidth(5), paddingVertical: responsiveHeight(1) }}
                        onPress={() => setIncomplete(false)}
                    >
                        <Text style={{ color: 'white', fontFamily: 'myriadpro-bold', fontSize: responsiveFontSize(1.6) }}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ backgroundColor: Colors.azulSeadust, borderRadius: 5, paddingHorizontal: responsiveWidth(5), paddingVertical: responsiveHeight(1) }}
                        onPress={() => handleIncomplete(item, piece)}
                    >
                        <Text style={{ color: 'white', fontFamily: 'myriadpro-bold', fontSize: responsiveFontSize(1.6) }}>Confirmar</Text>
                    </TouchableOpacity>
                </View>
            </ModalLayout>

            <ModalDelete isDelete={isDelete} productname={item.productname} setIsDelete={()=> setIsDelete(false)} handleDelete={()=>handleDelete(item)}/>
        </View>
    )
}

export default RenderItem