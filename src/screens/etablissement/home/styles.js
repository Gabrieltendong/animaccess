import { colors, fonts } from "@themes/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text_header: {
        color: colors.BLACK,
        textAlign: 'center',
        marginTop: 10,
        fontFamily: fonts.POPPINS_BOLD,
        fontSize: 22
    },
    section_title_wrapper: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section_title: {
        color: colors.BLACK,
        fontFamily: fonts.POPPINS_BOLD,
        fontSize: 18
    },
    btn_all_categorie: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.PRIMARY,
        borderRadius: 20,
        width: 200,
        paddingHorizontal: 20
    },
    text_btn: {
        textAlign: 'center',
        fontFamily: fonts.POPPINS_MEDIUM,
        color: colors.PRIMARY
    }
})