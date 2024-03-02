import { colors, fonts } from "@themes/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    input_select: {
        width: '100%',
        // height: 50,
        backgroundColor: colors.PRIMARY,
        color: colors.WHITE,
        borderRadius: 50
    },
    input_select_ios: {
        width: '100%',
        height: 50,
        backgroundColor: colors.PRIMARY,
        color: colors.WHITE,
        borderRadius: 25,
        paddingHorizontal: 10,
    },
    icon_input_select: {
        height: 50,
        justifyContent: 'center',
        marginRight: 10
    },
    input_select_wrapper: {
        backgroundColor: colors.BLACK,
        borderRadius: 25,
        marginBottom: 10,
        overflow: 'hidden'
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
        marginTop: 20
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
    }
})