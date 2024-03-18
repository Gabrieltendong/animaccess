import { colors, fonts } from "@themes/index";
import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    title: {
        color: colors.GRAY,
        fontFamily: fonts.POPPINS_REGULAR
    },
    title_bold: {
        fontFamily: fonts.POPPINS_BOLD
    },
    title_wrapper: {
        marginVertical: 20,
        fontSize: 16
    }
})