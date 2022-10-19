import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Background from '../components/Background'
import Colors from '../constants/Colors'
import Input from '../components/Input'
import Button from '../components/Button'

export default function Login(props) {
    const { heigth, width } = Dimensions.get('window')
    return (
        <Background>
            <View style={{ alignItems: 'center', width: width, height:'100%'}}>
                <Text style={{ color: 'white', fontSize: 64, fontWeight: 'bold', marginVertical: 20 }}>
                    Login
                </Text>
                <View style={
                    {
                        marginLeft:'6%',
                        backgroundColor: 'white',
                        // height: '100%',
                        width: width,
                        borderTopLeftRadius: 50,
                        borderBottomLeftRadius:50,
                        alignItems: 'center',
                        padding: 50
                    }
                }>
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
                                color:'black',
                                fontSize:19,
                                fontWeight:'bold'
                            }
                        }
                    >
                        Ingresa tu cuenta
                    </Text>

                    <Input placeholder="Email / User" keyboardType={"email-address"}/>
                    <Input placeholder="Contraseña" secureTextEntry={true}/>

                    <View>
                        <Button bgColor={Colors.primary} textColor={Colors.white} btnLabel="Inciar sesión"
                            onPress={() => props.navigation.navigate('LayoutHome')}/>
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <Text style={{marginRight:20, fontWeight:'bold', fontSize:16}}>
                            ¿No tienes cuenta?
                        </Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
                            <Text style={{color:Colors.primary, fontWeight:'bold', fontSize:16}}>
                                Registrate
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Background>
    )
}