import { colors, fonts } from "@themes/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    day_row: {
        flexDirection: 'row',
        height: 50,
        // borderWidth: 1,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20
    },
    label_day: {
       fontFamily: fonts.POPPINS_REGULAR
    },
    btn_select_day: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 15,
        marginLeft: 5
    },
    btn: {
        marginTop: 30,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.GRAY,
        borderRadius: 20
    },
    btn_create: {
        // position: 'absolute',
        // bottom: 0
    },
    text_btn: {
        color: colors.GRAY,
        fontFamily: fonts.POPPINS_MEDIUM,
        marginLeft: 10
    }
})