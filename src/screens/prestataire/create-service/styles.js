import { colors, fonts } from "@themes/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input_select: {
        width: '100%',
        // height: 50,
        backgroundColor: colors.PRIMARY,
        color: colors.WHITE,
        borderRadius: 50
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
    text_area: {
        height: 150,
        borderColor: colors.PRIMARY,
        borderWidth: 1,
        marginVertical: 20,
        borderRadius: 20,
        color: colors.BLACK,
        fontFamily: fonts.POPPINS_REGULAR,
        textAlignVertical: 'top',
        paddingHorizontal: 10,
        
    }
})