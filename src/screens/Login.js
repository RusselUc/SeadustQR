import { View, Text, Dimensions, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Background from '../components/Background'
import Colors from '../constants/Colors'
import Input from '../components/Input'
import Button from '../components/Button'

import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import ButtonJs from './ButtonJs'

import { AuthContext } from '../context/AuthProvider'
import { useContext } from 'react/cjs/react.production.min'

GoogleSignin.configure({
    webClientId: '103574021059-3f51oscnlqimqp6d2misuo3q81ms9kh8.apps.googleusercontent.com',
});

export default function Login(props) {
    const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState();

    const { heigth, width } = Dimensions.get('window')

    const googleSignIn = async () => {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        const res  = await auth().signInWithCredential(googleCredential);
        console.log(res.user.email);
    }

    const googleSignOut = async () => {
        try {
          await GoogleSignin.signOut();
          //await GoogleSignin.revokeAccess();
          console.log("User sign-out successfully!")
        } catch (e) {
            console.log(e)
        }
      };
    return (
        <Background>
            <View style={{ alignItems: 'center', width: width, height: '100%' }}>
                <View style={
                    {
                        marginLeft: '6%',
                        backgroundColor: 'white',
                        // height: '100%',
                        width: width,
                        borderTopLeftRadius: 50,
                        borderBottomLeftRadius: 50,
                        alignItems: 'center',
                        padding: 50, marginVertical: 60
                    }
                }>

                    <Image source={require('../assets/image/logoSeadust.png')} style={{ width: 200, height: 100, resizeMode: 'center' }} />

                    <Text style={
                        {
                            fontSize: 40,
                            color: Colors.primary,
                            fontWeight: 'bold'
                        }
                    }>
                        Bienvenido
                    </Text>

                    <Text
                        style={
                            {
                                color: 'black',
                                fontSize: 19,
                                fontWeight: 'bold'
                            }
                        }
                    >
                        Ingresa tu cuenta
                    </Text>

                    <Input placeholder="Email / User" keyboardType={"email-address"} />
                    <Input placeholder="Contraseña" secureTextEntry={true} />

                    <View>
                        <Button bgColor={Colors.primary} textColor={Colors.white} btnLabel="Inciar sesión"
                            onPress={() => props.navigation.navigate('LayoutHome')} />
                        <Button bgColor={Colors.primary} textColor={Colors.white} btnLabel="Inciar sesión"
                            onPress={() => googleSignIn()} />
                        <Button bgColor={Colors.primary} textColor={Colors.white} btnLabel="Salir"
                            onPress={() => signOut()} />
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ marginRight: 20, fontWeight: 'bold', fontSize: 16 }}>
                            ¿No tienes cuenta?
                        </Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
                            <Text style={{ color: Colors.primary, fontWeight: 'bold', fontSize: 16 }}>
                                Registrate
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Background>
    )

    // return (
    //     <View style={styles.separator}>
    //       <ButtonJs
    //         loading={loading}
    //         title={'Google Sign-In'}
    //         onPress={googleSignIn} />
    //       <GoogleSigninButton
    //         style={{ width: 192, height: 48 }}
    //         size={GoogleSigninButton.Size.Wide}
    //         color={GoogleSigninButton.Color.Dark}
    //         onPress={googleSignIn}
    //         disabled={loading}
    //       />
    //       <ButtonJs
    //         loading={loading}
    //         title={'Google Sign-Out'}
    //         onPress={googleSignOut} />
    //     </View>
    //   )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    separator: {
      alignItems: 'center',
      paddingVertical: 20,
      borderBottomWidth: 2,
      borderColor: 'gray'
    },
  })