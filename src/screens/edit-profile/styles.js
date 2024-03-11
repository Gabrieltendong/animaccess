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
    buttonTextStyle: {
        color: colors.WHITE,
        fontFamily: fonts.POPPINS_REGULAR,
        fontSize: 14
    },
    error: {
        color: colors.PRIMARY,
        fontFamily: fonts.POPPINS_REGULAR,
        fontSize: 12
    },
    input_select: {
        width: '100%',
        // height: 50,
        backgroundColor: colors.PRIMARY,
        color: colors.WHITE,
        borderRadius: 50
    },
})