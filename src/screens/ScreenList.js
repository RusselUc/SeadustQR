import { View, Text, FlatList, Modal } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import firestore from '@react-native-firebase/firestore'
import Button from '../components/Button'
import Colors from '../constants/Colors'
import RenderItem from '../components/RenderItem'
import { AuthContext } from '../context/AuthProvider'

export default function ScreenList() {
  const [data, setData] = useState()
  const { user } = useContext(AuthContext)
  const loadData = async () => {
    try {
      const productos = await firestore().collection(user.email).get()
      const arrayData = productos.docs.map(doc => ({id:doc.id, ...doc.data()}))
      setData(arrayData)
    } catch (error) {
      console.log(error)
    }
  }

  const press = () => {
  }

  useEffect(()=>{
    loadData()
  },[])

  return (
    <View style={{padding:10}}>
      <View style={{alignItems:'center', paddingVertical: 10,}}>
        <Text style={{fontSize:30, fontFamily:'myriadpro-bold', color:'black'}}>Solicitudes</Text>
      </View>
      <FlatList
        data={data}
        renderItem = {({item}) => <RenderItem item={item}/>}
        keyExtractor = { item => item.id }
      />
    </View>
  )
}