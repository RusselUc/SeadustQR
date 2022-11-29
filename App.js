import React from 'react'
import ScreenLog from './src/screens/ScreenLog'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'react-native'
import LayoutHome from './src/screens/LayoutHome'
import ModalPoup from './src/components/ModalPoup'
import AuthProvider from './src/context/AuthProvider'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
        />
        <Stack.Navigator>
          <Stack.Screen name='ScreenLog' component={ScreenLog} options={{ headerShown: false }}/>
          <Stack.Screen name='LayoutHome' component={LayoutHome} options={{ headerShown: false }} />
          <Stack.Screen name='Modal' component={ModalPoup} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  )
}