import { colors, fonts } from "@themes/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    input_wrapper: {
        flex: 1,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.WHITE,
        borderRadius: 25,
        marginRight: 10,
        paddingHorizontal: 10,
    },
    btn_filter: {
        height: 45,
        width: 45,
        borderRadius: 25,
        backgroundColor: colors.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        fontFamily: fonts.POPPINS_REGULAR,
        color: colors.BLACK,
        flex: 1,
        marginLeft: 5,
    }
})