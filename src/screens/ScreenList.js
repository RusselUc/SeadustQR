import { View, Text, FlatList, Dimensions, Image, SafeAreaView } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import firestore from '@react-native-firebase/firestore'
import RenderItem from '../components/RenderItem'
import { AuthContext } from '../context/AuthProvider'
import Colors from '../constants/Colors'

export default function ScreenList() {

  const { height } = Dimensions.get('window')
  const [data, setData] = useState()
  const [empty, setEmpty] = useState(true)
  const { user } = useContext(AuthContext)

  const load = async () => {
    const suscriber = firestore().collection(user.email)
      .where("success", "==", false)
      .onSnapshot(querySnapshot => {
        if (querySnapshot.docs.length === 0) {
          setEmpty(true)
        } else {
          setEmpty(false)
          const products = []
          querySnapshot.forEach(document => {
            products.push(
              {
                id: document.id,
                ...document.data()
              }
            )
            setData(products)
          })
        }
      })
    return () => suscriber()
  }

  useEffect(() => {
    // loadData()
    load()
  }, [])

  return empty ? (
    <SafeAreaView style={{ backgroundColor: '#F5F5F5', height: '100%' }}>
      <View style={{ padding: 10 }}>
        <View style={{ alignItems: 'center', paddingVertical: 10, }}>
          <Text style={{ fontSize: 30, fontFamily: 'myriadpro-bold', color: 'black' }}>Solicitudes</Text>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{marginBottom:40, fontFamily:'myriadpro-bold', color:'black', fontSize:20}}>Aún no hay solicitudes</Text>
        <View style={{backgroundColor:Colors.azulSeadust, borderRadius:150}}>
          <Image
            source={require('../assets/image/notFound.gif')}
            style={{ height: 300, width: 300 }}
          />
        </View>
      </View>
    </SafeAreaView>
  ) : (
    <View style={{ padding: 10, height: height - 60 }}>
      <View style={{ alignItems: 'center', paddingVertical: 10, }}>
        <Text style={{ fontSize: 30, fontFamily: 'myriadpro-bold', color: 'black' }}>Solicitudes</Text>
      </View>


      <FlatList
        data={data}
        renderItem={({ item }) => <RenderItem sucess={false} item={item} />}
        keyExtractor={item => item.id}
      />


    </View>

  )
}