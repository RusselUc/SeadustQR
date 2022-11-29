import { View, Text, FlatList, Dimensions, SafeAreaView, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import RenderItem from '../components/RenderItem'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../context/AuthProvider'
import Colors from '../constants/Colors'
import EmptyItems from '../components/EmptyItems'

export default function ScreenSuccess() {
  const { height } = Dimensions.get('window')
  const [data, setData] = useState()
  const [empty, setEmpty] = useState(true)
  const { user } = useContext(AuthContext)

  const load = async () => {
    const suscriber = firestore().collection(user.email)
      .where("success", "==", true)
      .onSnapshot(querySnapshot => {
        const products = []
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
    load()
  }, [])
  return empty ? (
    <EmptyItems text="Aún no hay solicitudes completadas" title="Entregadas"/>
  ) : (
    <View style={{ padding: 10, height: height - 60 }}>
      <View style={{ alignItems: 'center', paddingVertical: 10, }}>
        <Text style={{ fontSize: 30, fontFamily: 'myriadpro-bold', color: 'black' }}>Entregados</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <RenderItem sucess={true} item={item} />}
        keyExtractor={item => item.id}
      />
    </View>

  )
}