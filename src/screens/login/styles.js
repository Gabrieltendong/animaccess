import { colors, fonts } from "@themes/index";
import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    wrapper: {
        flex: 1,
        height: Dimensions.get('screen').height - 50
    },
    content: {
        alignItems: 'center',
        marginTop: 30,
        paddingHorizontal: 20,
        flex: 1,
    },
    image_header: {
        height: 300,
        alignItems: 'center'
    },
    btn: {
        width: 200
    },
    text_forgot_password: {
        fontFamily: fonts.MONTSERRAT_REGULAR,
        color: colors.GRAY,
        borderBottomColor: colors.GRAY,
        borderBottomWidth: 1,
        fontSize: 11
    },
    footer: {
        flexDirection: 'row',
        alignItems:'center',
        paddingHorizontal: 20
    },
    footer_text: {
        fontFamily: fonts.MONTSERRAT_REGULAR,
        color: colors.GRAY,
        fontSize: 12,
    },
    text_btn_footer: {
        fontFamily: fonts.MONTSERRAT_MEDIUM,
        color: colors.PRIMARY,
        fontSize: 12,
         marginLeft: 5
    },
    logo: {
        height: 100,
        width: 300,
        marginTop: 50
    },
    text_header: {
        fontFamily: fonts.POPPINS_BOLD,
        fontSize: 35,
        color: colors.WHITE,
        textTransform: 'uppercase',
        marginTop: 40
    }
})