import { colors, fonts } from "@themes/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
       flex: 1,
       justifyContent: 'flex-end',
       margin: 0
    },
    content: {
        backgroundColor: colors.WHITE,
        height: 400,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center'
    },
    icon_wrapper: {
        height: 100,
        width: 100,
        borderRadius: 50,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    title: {
        fontFamily: fonts.POPPINS_BOLD,
        fontSize: 20,
        marginTop: 20
    },
    subtitle:{
        fontFamily: fonts.POPPINS_REGULAR,
        color: colors.GRAY,
        textAlign: 'center',
        paddingHorizontal: 20
    },
    btn: {
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        marginTop: 30
    },
    text_btn: {
        fontFamily: fonts.POPPINS_BOLD,
        color: colors.WHITE,
        textAlign: 'center'
    }
})