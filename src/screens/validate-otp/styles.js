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
    label: {
        fontFamily: fonts.POPPINS_MEDIUM,
        fontSize: 18
    },
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {marginTop: 20},
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#00000030',
        textAlign: 'center',
    },
    focusCell: {
        borderColor: colors.PRIMARY,
    },
    btn: {
        marginTop: 30
    },
    error: {
        color: colors.PRIMARY,
        marginTop: 10
    }
})