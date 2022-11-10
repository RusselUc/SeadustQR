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
      setData(productos.docs)
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
      <FlatList
        data={data}
        renderItem = {({item}) => <RenderItem item={item}/>}
        keyExtractor = { item => item.id }
      />
    </View>
  )
}