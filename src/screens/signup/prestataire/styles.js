import { colors, fonts } from "@themes/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    input_select: {
        width: '100%',
        height: 50,
        backgroundColor: colors.PRIMARY,
        color: colors.WHITE,
        borderRadius: 25
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
        paddingLeft: 20,
    },
    image_header_border: {
        borderBottomLeftRadius: 30
    },
    header_title: {
        fontFamily: fonts.POPPINS_BOLD,
        fontSize: 25,
        color: colors.WHITE,
        marginTop: 20
    },
    content: {
        padding: 20
    },
    btn: {
        marginTop: 20
    },
    card_wrapper: {
        borderStyle: 'dotted',
        borderColor: colors.PRIMARY,
        borderWidth: 1,
        height: 150,
        borderRadius: 20,
        marginVertical: 10,
        justifyContent: 'center',
    },
    card_center: {
        alignItems: 'center',
    },
    image_cni: {
        height: 150,
        borderRadius: 20
    },
    text_card: {
        color: colors.BLACK,
        fontFamily: fonts.POPPINS_REGULAR,
        marginTop: 10
    },
    error: {
        color: colors.PRIMARY,
        fontFamily: fonts.POPPINS_REGULAR,
        fontSize: 12
    }
})