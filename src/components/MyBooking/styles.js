import { colors, fonts } from "@themes/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        // height: 400,
        paddingHorizontal: 10
    },
    btn: {
        alignItems: 'center',
        marginTop: 30
    },
    text_btn: {
        color: colors.PRIMARY,
        fontFamily: fonts.POPPINS_MEDIUM,
        fontSize: 12,
    }
})