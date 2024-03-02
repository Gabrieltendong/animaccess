import { colors, fonts } from "@themes/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    title: {
        color: colors.BLACK,
        fontFamily: fonts.POPPINS_MEDIUM,
        flex: 1,
        marginLeft: 10,
        fontSize: 12
    },
    btn_edit: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text_btn_edit: {
        color: colors.PRIMARY,
        fontFamily: fonts.POPPINS_REGULAR,
        fontSize: 10, 
        marginLeft: 5
    }
})