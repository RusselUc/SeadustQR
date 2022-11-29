import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveScreenFontSize, responsiveWidth } from "react-native-responsive-dimensions";
import Colors from "./Colors";
const styles = StyleSheet.create({
    containerHeader: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingLeft: 15,
        justifyContent:'space-between'
    },

    container: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingLeft: 15,
    },

    image: {
        width: 50,
        height: 50,
        marginRight: 10
    },

    icon: {
        marginLeft:'auto',
        fontSize: 20,
        marginRight: 20
    },

    textRequest: {
        height: responsiveHeight(18),
        width: responsiveWidth(38),
        borderRadius: 20, alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
        fontSize: responsiveScreenFontSize(2.5),
        fontFamily: 'myriadpro-bold',
    },

    textBody:{
        fontSize: responsiveScreenFontSize(6),
        fontFamily: 'myriadpro-light',
        textAlign: 'center'
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: responsiveHeight(2)
      },
})

export default styles