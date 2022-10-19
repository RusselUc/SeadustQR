import { View, Text, Dimensions, Image, StatusBar } from 'react-native'
import React from 'react'
import Background from '../components/Background'
import Button from '../components/Button'
import Colors from '../constants/Colors'

export default function ScreenLog(props) {
  const { heigth, width } = Dimensions.get('window')
  return (
    <Background>
      <View style={{marginHorizontal:30, marginTop: '100%'}}>
        <View style={{backgroundColor:Colors.lightOverlayColor, borderRadius:20, alignItems:'center'}}>
          <Image source={require('../assets/image/logoSeadust.png')} style={{width:300, height:200, resizeMode:'center'}}/>
        </View>
        {/* <View style={{backgroundColor:Colors.blackAlpha, borderRadius:20, alignItems:'center'}}>
          <Text style={{color:'white', fontSize:64, fontWeight:'bold'}}>Seadust</Text>
          <Text style={{color:'white', fontSize:30, marginBottom:40, fontWeight:'bold'}}>Cancun Family Resort</Text>
        </View> */}

        <Button bgColor={Colors.primary} textColor={Colors.white} btnLabel="Login" onPress={() => props.navigation.navigate('Login')}/>
        <Button bgColor={Colors.white} textColor={Colors.primary} btnLabel="Sign up" onPress={() => props.navigation.navigate('SignUp')}/>
      </View>
    </Background>
  )
}