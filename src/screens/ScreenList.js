import { View, Text, FlatList, Dimensions, } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import firestore from '@react-native-firebase/firestore'
import RenderItem from '../components/RenderItem'
import { AuthContext } from '../context/AuthProvider'
import EmptyItems from '../components/EmptyItems'

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
    load()
  }, [])

  return empty ? (
    <EmptyItems text="Aún no hay solicitudes" title="Solicitudes"/>
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