import { View, Text, Dimensions, Image, StatusBar, TouchableOpacity } from 'react-native'
import React, {useContext} from 'react'
import Background from '../components/Background'
import Button from '../components/Button'
import Colors from '../constants/Colors'
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../context/AuthProvider'



export default function ScreenLog(props) {
  const { heigth, width } = Dimensions.get('window')
  const {googleSignIn, googleSignOut, getCurrentUser, isSignedIn} = useContext(AuthContext)

  const toHome = async () =>{
    await googleSignIn()
    props.navigation.navigate('LayoutHome')
  }
  return (
    <Background>
      <View style={{ marginHorizontal: width/8, marginTop: '100%', alignItems:'center'}}>
        <View style={{ borderRadius: 20, alignItems: 'center' }}>
          <Image source={require('../assets/image/logoSeadust.png')} style={{ width: 300, height: 200, resizeMode: 'center' }} />
        </View>

        <Text style={{fontFamily:'Fuente'}}>
          <Text style={{color:'white', fontSize:30}}></Text>
        </Text>

        <View style={{alignItems:'center'}}>
          <GoogleSigninButton
            style={{ width: 192, height: 60 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={toHome}
          />

          {/* <TouchableOpacity onPress={googleSignOut}>
            <Text>Cerrar Sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={getCurrentUser}>
            <Text>currentUser</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={isSignedIn}>
            <Text>isSignedIn</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </Background>
  )
}