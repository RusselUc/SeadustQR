import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext } from 'react'
import Button from '../components/Button'
import Colors from '../constants/Colors'

import { AuthContext } from '../context/AuthProvider'

export default function Profile(props) {

  const { user, googleSignOut, getCurrentUser } = useContext(AuthContext)

  const toLogin = () => {
    googleSignOut()
    props.navigation.navigate('ScreenLog')
  }
  return (
    <View>

      <View style={{alignItems:'center', marginVertical:20}}>
        <Text style={{fontSize:30, color:'black'}}>{user.name}</Text>
      </View>

      <View style={{alignItems:'center', marginVertical:20}}>
        <Image source={{uri: user.photo}} style={{width: 140,height: 140, borderRadius:100}}/>
      </View>


      <View style={{alignItems:'center',}}>
        <Text style={{fontSize:20, color:'black'}}>{user.email}</Text>
      </View>

      <View style={{alignItems:'center', marginVertical:20}}>
        <Button btnLabel='Cerrar sesión' bgColor={Colors.red} textColor='white' onPress={toLogin}/>
      </View>

      <TouchableOpacity onPress={getCurrentUser}>
            <Text>currentUser</Text>
      </TouchableOpacity>
    </View>
  )
}