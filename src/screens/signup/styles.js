import { colors, fonts } from "@themes/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        paddingHorizontal: 40,
        position: 'relative',
        flex: 1,
        alignItems: 'center'
    },
    logo: {
        height: 100,
        width: 200,
        marginTop: 30
    },
    text_header: {
        fontFamily: fonts.POPPINS_BOLD,
        fontSize: 25,
        color: colors.WHITE,
        textTransform: 'uppercase',
        // marginTop: 40
    },
    image_header: {
        height: 200,
        alignItems: 'center'
    },
    text_select_profil: {
        color: colors.GRAY,
        textAlign: 'center',
        fontFamily: fonts.POPPINS_REGULAR,
        marginTop: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
    type_profile_wrapper: {
        marginHorizontal: 20,
        alignItems: 'center'
    },
    btn_selected: {
        height: 80,
        width: 80,
        borderRadius: 20,
        backgroundColor: colors.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text_type_profil: {
        textAlign: 'center',
        color: colors.PRIMARY,
        fontFamily: fonts.POPPINS_REGULAR,
        fontSize: 10,
        marginTop: 5
    },
    btn_not_selected: {
        height: 80,
        width: 80,
        borderRadius: 20,
        backgroundColor: colors.WHITE,
        borderWidth: 1,
        borderColor: colors.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn_next: {
        // marginTop: 50
    },
    footer: {
        width: '100%',
        position: 'absolute',
        bottom: 20
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
})