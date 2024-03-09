import { colors, fonts } from "@themes/index";
import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        minHeight: 140,
        flexDirection: 'row',
        borderRadius: 20,
        backgroundColor: '#eee',
        marginVertical: 5,
        marginRight: 10,
        shadowColor: colors.BLACK,
        shadowOffset: {height: 1},
        shadowOpacity: 0.5,
        shadowRadius: Platform.OS == 'ios'?0.2: 3,
        elevation: Platform.OS == 'ios'?1:3
    },
    content: {
        padding: 10,
        flex: 1
    },
    image_wrapper: {
        minHeight: 140,
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
        // width: 200,
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