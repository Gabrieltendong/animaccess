import { colors, fonts } from "@themes/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 25,
        marginVertical: 10
    },
    text_btn: {
        fontFamily: fonts.POPPINS_BOLD,
        color: colors.WHITE
    },
    btn_contain: {
        backgroundColor: colors.PRIMARY,
    },
    btn_outline: {
        borderWidth: 1,
        borderColor: colors.PRIMARY,
        backgroundColor: colors.WHITE
    }
})