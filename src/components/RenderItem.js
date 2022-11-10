import { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import styles from '../constants/Styles'
const RenderItem = ({ item }) => {

    const [showContent, setShowContent] = useState(false)
    return (
        <View style={{backgroundColor:'white', borderRadius:15, marginTop:5}}>
            <TouchableOpacity onPress={ () => setShowContent(!showContent)}>
                <View style={styles.container}>
                    <Text>Folio: </Text>
                    <Text style={{ marginRight: 10 }}>
                        {
                            item.data().name
                        }
                    </Text>
                </View>
                <Text>Fecha: </Text>
                <Text>
                    {
                        item.data().date
                    }
                </Text>
                {showContent && (
                    <View>
                        <Text>Codigo</Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    )
}

export default RenderItem