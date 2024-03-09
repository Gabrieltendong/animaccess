import { colors, fonts } from "@themes/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        height: 140,
        flexDirection: 'row',
        borderRadius: 20,
        backgroundColor: colors.WHITE,
        marginVertical: 5,
        marginRight: 10,
        shadowColor: colors.BLACK,
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 0.5,
        shadowRadius: Platform.OS == 'ios'?1:3,
        elevation: Platform.OS == 'ios'?1:3
    },
    content: {
        padding: 10
    },
    image_wrapper: {
        height: 140,
        width: 80,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    title: {
        color: colors.BLACK,
        fontFamily: fonts.POPPINS_BOLD
    },
    sub_title: {
        color: colors.GRAY
    },
    text_time: {
        color: colors.BLACK,
        marginLeft: 5,
        fontFamily: fonts.POPPINS_REGULAR,
        fontSize: 10
    },
    btn: {
        marginTop: 10
    },
    text_btn: {
        color: colors.PRIMARY
    }
})