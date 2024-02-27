import { colors, fonts } from "@themes/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        color: colors.WHITE,
        fontFamily: fonts.POPPINS_BOLD,
        fontSize: 18
    },
    sub_title: {
        color: colors.WHITE,
        fontFamily: fonts.POPPINS_REGULAR,
        fontSize: 10
    },
    image_wrapper: {
        // height: 150
        padding: 10,
        marginTop: 20
    },
    image_border: {
        borderRadius: 20
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.WHITE,
        borderRadius: 25,
        height: 40,
        marginTop: 20,
        width: 200,
        alignSelf: 'center'
    },
    text_btn: {
        color: colors.BLACK
    }
})