import { colors, fonts } from "@themes/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image_header: {
        height: 200,
        paddingTop: 50,
        paddingLeft: 20
    },
    image_header_border: {
        borderBottomLeftRadius: 30
    },
    header_title: {
        fontFamily: fonts.POPPINS_BOLD,
        fontSize: 25,
        color: colors.WHITE,
        marginTop: 20,
        width: '80%'
    },
    content: {
        padding: 20
    },
    btn: {
        marginTop: 30
    },
    error: {
        color: colors.PRIMARY,
        fontFamily: fonts.POPPINS_REGULAR
    }
})