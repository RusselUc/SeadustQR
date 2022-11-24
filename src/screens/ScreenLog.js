import { View, Text, Dimensions, Image, StatusBar, TouchableOpacity } from 'react-native'
import React, {useContext} from 'react'
import Background from '../components/Background'
import Button from '../components/Button'
import Colors from '../constants/Colors'
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../context/AuthProvider'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'



export default function ScreenLog(props) {
  const { height, width } = Dimensions.get('window')
  const {googleSignIn, googleSignOut, getCurrentUser, isSignedIn} = useContext(AuthContext)

  const toHome = async () =>{
    await googleSignIn()
    props.navigation.navigate('LayoutHome')
  }

  return (
    <Background>
      <View style={{ marginHorizontal: responsiveWidth(1), marginVertical:responsiveHeight(35), alignItems:'center'}}>
        <View style={{ borderRadius: 20, alignItems: 'center' }}>
          <Image source={require('../assets/image/logoSeadust.png')} style={{ width: responsiveWidth(100), height: responsiveHeight(40), resizeMode: 'center' }} />
        </View>


        <View style={{alignItems:'center'}}>
          <GoogleSigninButton
            style={{ width: responsiveWidth(50), height: responsiveHeight(8) }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={toHome}
          />
        </View>
      </View>
    </Background>
  )
}