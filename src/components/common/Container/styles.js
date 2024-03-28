import { colors, fonts } from "@themes/index";
import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        paddingHorizontal: 20
    },
    back_btn: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: colors.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 20,
        top: 40,
        zIndex: 1
    },
    logo_wrapper: {
        height: Platform.OS == 'ios'?90:70,
        alignItems: 'center',
    },
    logo: {
        height: 40,
        marginTop: Platform.OS == 'ios'?40:10
    },
    text_header: {
        color: colors.BLACK,
        textAlign: 'center',
        marginVertical: 20,
        paddingHorizontal: 10,
        fontFamily: fonts.POPPINS_BOLD,
        fontSize: 22
    },
    image_header_border: {
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
    }
})