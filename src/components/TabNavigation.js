import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';


import * as Animatable from 'react-native-animatable';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../screens/Home";
import Colors from "../constants/Colors";
import ScreenSuccess from "../screens/ScreenSuccess";
import ScreenList from "../screens/ScreenList";
import Profile from "../screens/Profile";

const Stak = createNativeStackNavigator();

function Books(){
    return (
      <Stak.Navigator>
          <Stak.Screen
            name='Home'
            component={Home}
            options={{
                title: 'Lista',
                headerShown: false
          }}
            />
          {/* <Stak.Screen name='Library' component={Library} /> */}
      </Stak.Navigator>
    )
  }

const TabArr = [
    {route:'Home', label: 'Inicio', component:Home, icon:'home', color: Colors.primary, alphaClr: Colors.primaryAlpha},
    {route:'ScreenList', label: 'Lista', component:ScreenList, icon:'th-list', color: Colors.turquesa, alphaClr: Colors.turquesaAlpha},
    {route:'ScreenSuccess', label: 'Entregados', component:ScreenSuccess, icon:'check', color: Colors.green, alphaClr: Colors.greenAlpha},
    {route:'Profile', label: 'Perfil', component:Profile, icon:'user', color: Colors.blue, alphaClr: Colors.blueAlpha},
]

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center'
    },

    icon:{
        fontSize:25,
    },

    btn: {
        flexDirection:'row',
        alignItems:'center',
        padding: 8,
        borderRadius: 16
    }
})

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
    const {item, onPress, accessibilityState} = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);
    const textViewRef = useRef(null)

    useEffect(() => {
        if(focused){
            viewRef.current.animate(
                {
                    // { 0: { scale: 0 }, 0.3: { scale: .7 }, 0.5: { scale: .3 }, 0.8: { scale: .7 }, 1: { scale: 1 } }
                    0:{scale:0},
                    1:{scale:1}
                }
            );
            textViewRef.current.animate(
                {
                    0:{scale:0},
                    1:{scale:1}
                }
            );
        } else {
            viewRef.current.animate(
                {
                    0:{scale:1},
                    1:{scale:0}
                }
            );
            textViewRef.current.animate(
                {
                    0:{scale:1},
                    1:{scale:0}
                }
            );
        }
    },[focused])
    return(
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={[styles.container, {flex: focused ? 1 : 0.7}]}>

            <View>
                <Animatable.View
                    ref={viewRef}
                    duration={500}
                    style={[StyleSheet.absoluteFillObject, {backgroundColor:item.color, borderRadius:16}]}
                />
                <View style={[styles.btn, {backgroundColor: focused ? null : item.alphaClr}]}>
                    <Icon name={item.icon} style={styles.icon} color={focused ? Colors.white: Colors.primaryLite}/>
                    <Animatable.View
                    ref={textViewRef}
                >
                        {
                            focused && (
                                <Text style={
                                    {
                                        color:Colors.white, paddingHorizontal:8
                                    }
                                }>{item.label}</Text>
                            )
                        }
                    </Animatable.View>
                </View>
            </View>

        </TouchableOpacity>
    )
}

const TabNavigation = () => {
    return(
        <Tab.Navigator
            screenOptions={
                {
                    headerShown:false,
                    tabBarStyle: {
                        height:60,
                        position:'absolute',
                        bottom:16,
                        right:16,
                        left:16,
                        borderRadius:16
                    }
                }
            }>
            {
                TabArr.map((item, index) => {
                    return(
                        <Tab.Screen key={index} name={item.route} component={item.component}
                        options={
                            {
                                tabBarShowLabel:false,
                                // tabBarLabel:item.label,
                                tabBarIcon:({color, size}) => (
                                    <Icon name={item.icon} size={size} color={color}/>
                                ),
                                tabBarButton: (props) => <TabButton {...props} item={item}/>
                            }
                        }/>
                    )
                })
            }
        </Tab.Navigator>
    )
}

export default TabNavigation;