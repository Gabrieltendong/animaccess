import { colors, fonts } from "@themes/index";
import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: colors.WHITE,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 25,
        paddingHorizontal: 20,
        shadowColor: Platform.OS == 'ios'?'#aaa':colors.BLACK,
        shadowOffset: {
            height: 1,
            width: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: Platform.OS == 'ios'?1:4,
        elevation: Platform.OS == 'ios'?1: 2,
        marginHorizontal: 1,
        // marginVertical: 10
    },
    section_title: {
        flex: 1,
        fontFamily: fonts.POPPINS_REGULAR,
        color: colors.BLACK,
        marginLeft: 10
    }
})