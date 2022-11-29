import { View, Text, StatusBar, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Colors from '../constants/Colors'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../context/AuthProvider'
import RenderItem from '../components/RenderItem'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import styles from '../constants/Styles'


export default function Home(props) {

    const { height } = Dimensions.get('window')

    const [requests, setRequests] = useState(0)
    const [delivered, setDelivered] = useState(0)
    const [data, setData] = useState()
    const [empty, setEmpty] = useState(false)

    const { user } = useContext(AuthContext)

    const loadDataRequest = () => {
        firestore().collection(user.email)
            .orderBy("date", "desc")
            .onSnapshot(querySnapshot => {
                const products = []
                querySnapshot.forEach(document => {
                    if (!document.data().success) {
                        if (products.length < 2) {
                            products.push({
                                ...document.data(),
                                id: document.id
                            })
                        }
                    }
                })

                setData(products)
            })
    }

    const loadRequest = async () => {
        const consulta = firestore().collection(user.email)
            .where("success", "==", false)
            .onSnapshot(querySnapshot => {
                setRequests(querySnapshot.size)
                if (querySnapshot.size > 0) {
                    setEmpty(false)
                } else {
                    setEmpty(true)
                }
            })
        return () => consulta()
    }

    const loadDelivered = async () => {
        const suscriber = firestore().collection(user.email)
            .where("success", "==", true)
            .onSnapshot(querySnapshot => {
                setDelivered(querySnapshot.size)
            })
        return () => suscriber()
    }

    useEffect(() => {
        loadRequest()
        loadDelivered()
        loadDataRequest()
    }, [])


    return (
        <View style={{ height: '100%', }}>

            <StatusBar
                backgroundColor={Colors.azulSeadust}
                translucent={false}
            />
            <View style={{ marginVertical: '5%', alignItems: 'center' }}>
                <Image source={require('../assets/image/logoSeadust.png')} style={{ width: responsiveWidth(100), height: responsiveWidth(40), resizeMode: 'center' }} />

                <TouchableOpacity style={{ position: 'absolute', top: 0, right: 10 }} onPress={() => props.navigation.navigate('Profile')}>
                    <Image source={{ uri: user.photo }} style={{ width: 40, height: 40, borderRadius: 20, }} />
                </TouchableOpacity>

                <Text style={{ fontFamily: 'myriadpro-light', color: 'black', fontSize: responsiveFontSize(3) }}>
                    Requisión de materiales
                </Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('ScreenList')}>
                    <View style={[styles.textRequest, { marginLeft: '10%', backgroundColor: Colors.azulSeadust }]}>
                        <Text style={[styles.title, { color: 'white', }]}>Solicitudes</Text>
                        <Text style={[styles.textBody, { color: 'white',}]}>{requests}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.navigation.navigate('ScreenSuccess')}>
                    <View style={[styles.textRequest, { marginRight: '5%', backgroundColor: Colors.doradoSeadust}]}>
                        <Text style={[styles.title,{color: 'black', }]}>Entregados</Text>
                        <Text style={[styles.textBody, {color:'black'}] }>{delivered}</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {
                empty ? (
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={height > 720 ? { marginTop: 20, marginBottom: 40, fontFamily: 'myriadpro-bold', color: 'black', fontSize: 20 } : { marginTop: 5, marginBottom: 10, fontFamily: 'myriadpro-bold', color: 'black', fontSize: 15 }}>Aún no hay solicitudes</Text>
                        <View style={{ backgroundColor: Colors.azulSeadust, borderRadius: 150 }}>
                            <Image
                                source={require('../assets/image/notFound.gif')}
                                style={{ height: 150, width: 150, resizeMode: 'contain' }}
                            />
                        </View>
                    </View>
                ) : (
                    <View style={height > 720 ? { height: 350 } : { height: 210 }}>
                        <Text style={{ fontFamily: 'myriadpro-bold', color: Colors.azulSeadust, fontSize: 20, margin: 15 }}>Ultimas solicitudes</Text>
                        <FlatList
                            data={data}
                            renderItem={({ item }) => <RenderItem sucess={true} item={item} />}
                            keyExtractor={item => item.id}
                        />
                    </View>
                )
            }
        </View>
    )
}