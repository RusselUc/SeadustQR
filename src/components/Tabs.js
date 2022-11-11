import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StyleSheet, TouchableOpacity, View, Text, Image, Button } from "react-native"
import Home from "../screens/Home"
import Profile from "../screens/Profile"
import ScreenList from "../screens/ScreenList"
import ScreenPost from "../screens/ScreenPost"
import ScreenSuccess from "../screens/ScreenSuccess"
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useRef, useState } from "react"
import * as Animatable from 'react-native-animatable';
import Colors from "../constants/Colors";
import ModalPoup from "./ModalPoup"
import { event } from "react-native-reanimated"



const Tab = createBottomTabNavigator()

const TabButton = (props) => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);


  useEffect(() => {
      if(focused){
          viewRef.current.animate(
              {
                  0:{scale:1, rotate:'0deg'},
                  1:{scale:1.5, rotate:'0deg'}
              }
              );
      } else {
          viewRef.current.animate({0:{scale:1.5}, 1:{scale:1}});
      }
  },[focused])
  return(
      <TouchableOpacity
          onPress={onPress}
          activeOpacity={1}
          style={styles.container}>

          <Animatable.View
              style={styles.container}
              ref={viewRef}
              duration={500}
          >
              <Icon name={item.icon} style={styles.icon} color={focused ? item.color: Colors.doradoSeadust}/>
          </Animatable.View>
      </TouchableOpacity>
  )
}

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -30,
      ...styles.shadow
    }}

    onPress={onPress}
  >
    <View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: Colors.azulSeadust }}>{children}</View>
  </TouchableOpacity>
)

const TabArr = [
  { route: 'Home', label: 'Inicio', component: Home, icon: 'home', color: Colors.azulSeadust, alphaClr: Colors.primaryAlpha },
  { route: 'ScreenList', label: 'Lista', component: ScreenList, icon: 'th-list', color: Colors.azulSeadust, alphaClr: Colors.turquesaAlpha },
  { route: 'ScreenPost', label: 'Agregar', component: ScreenPost, icon: 'plus', color: Colors.azulSeadust, alphaClr: Colors.turquesaAlpha },
  { route: 'ScreenSuccess', label: 'Entregados', component: ScreenSuccess, icon: 'check', color: Colors.azulSeadust, alphaClr: Colors.greenAlpha },
  { route: 'Profile', label: 'Perfil', component: Profile, icon: 'user', color: Colors.azulSeadust, alphaClr: Colors.blueAlpha },
]

export default function Tabs() {
  const [visible, setVisible] = useState(false);
  return (
    <Tab.Navigator
      screenOptions={
        {
          headerShown: false,
          tabBarStyle: {
            height: 60,
            position: 'absolute',
            bottom: 16,
            right: 16,
            left: 16,
            borderRadius: 16
          }
        }
      }>
      <Tab.Screen name="Home" component={Home}
        options={{
          tabBarShowLabel: false,
          tabBarButton: (props) => <TabButton {...props} item={TabArr[0]} />
        }}
      />
      <Tab.Screen name="ScreenList" component={ScreenList}
        options={{
          tabBarShowLabel: false,
          tabBarButton: (props) => <TabButton {...props} item={TabArr[1]} />
        }}
      />
      <Tab.Screen name="ScreenPost"
        // component={ScreenPost}
        children={()=><ScreenPost visible={visible} setVisible={setVisible}/>}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name='plus' size={size} color={Colors.white} />
          ),
          tabBarButton: (props) => (<CustomTabBarButton {...props} />)
        }}

        listeners={({navigation}) => ({
          tabPress: event => {
            // event.preventDefault()
            // navigation.navigate('Home')
            setVisible(true)
            // console.log("clic");
            // navigation.navigate('LayoutHome')
          }
        })}
      />
      <Tab.Screen name="ScreenSuccess" component={ScreenSuccess}
        options={{
          tabBarShowLabel: false,
          tabBarButton: (props) => <TabButton {...props} item={TabArr[3]} />
        }}
      />
      <Tab.Screen name="Profile" component={Profile}
        options={{
          tabBarShowLabel: false,
          tabBarButton: (props) => <TabButton {...props} item={TabArr[4]} />
        }}
      />

    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  },

  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
},

  icon: {
    fontSize: 25,
  },

  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 16
  }
})