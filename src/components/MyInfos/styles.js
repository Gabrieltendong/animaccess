import { colors, fonts } from "@themes/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        backgroundColor: colors.WHITE
    },
    btn_password: {
        flexDirection: 'row',
        marginTop: 10
    },
    text_btn_password: {
        color: colors.PRIMARY,
        marginLeft: 10,
        fontFamily: fonts.POPPINS_MEDIUM
    },
    btn_logout: {
        height: 40,
        width: 170,
        borderRadius: 20,
        backgroundColor: colors.PRIMARY,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20
    },
    text_btn_logout: {
        color: colors.WHITE,
        fontFamily: fonts.POPPINS_MEDIUM
    }
})