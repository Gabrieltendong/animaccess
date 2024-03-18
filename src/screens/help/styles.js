import { colors, fonts } from "@themes/index";
import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    text_area: {
        height: 120,
        borderColor: colors.PRIMARY,
        borderWidth: 1,
        marginVertical: 10,
        borderRadius: 20,
        color: colors.BLACK,
        fontFamily: fonts.POPPINS_REGULAR,
        textAlignVertical: 'top',
        paddingHorizontal: 10, 
    },
    error: {
        color: colors.PRIMARY,
        fontFamily: fonts.POPPINS_REGULAR
    }
})