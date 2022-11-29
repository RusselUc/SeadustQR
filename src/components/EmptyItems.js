import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../constants/Colors'

const EmptyItems = ({title, text}) => {
  return (
    <SafeAreaView style={{ backgroundColor: '#F5F5F5', height: '100%' }}>
      <View style={{ padding: 10 }}>
        <View style={{ alignItems: 'center', paddingVertical: 10, }}>
          <Text style={{ fontSize: 30, fontFamily: 'myriadpro-bold', color: 'black' }}>{title}</Text>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{marginBottom:40, fontFamily:'myriadpro-bold', color:'black', fontSize:20}}>{text}</Text>
        <View style={{backgroundColor:Colors.azulSeadust, borderRadius:150}}>
          <Image
            source={require('../assets/image/notFound.gif')}
            style={{ height: 300, width: 300 }}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default EmptyItems