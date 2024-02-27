import { colors, fonts } from "@themes/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderWidth: 1,
        position: 'relative'
    },
    section_title: {
        color: colors.BLACK,
        fontFamily: fonts.POPPINS_BOLD,
        fontSize: 18
    }
})