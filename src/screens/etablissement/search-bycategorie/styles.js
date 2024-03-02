import { colors, fonts } from "@themes/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    section_title: {
        color: colors.BLACK,
        fontFamily: fonts.POPPINS_BOLD,
        fontSize: 18
    },
    content: {
        gap: 3
    },
    header: {
        flexDirection: 'row',
        marginTop: -10
    },
    btn_back: {
        height: 50,
        width: 50,
        borderRadius: 20,
        backgroundColor: colors.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    image_wrapper: {
        flex: 1
    },
    header_title_wrapper: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 20,
        padding: 10,
        justifyContent: 'center',
        height: 50,
    },
    header_image: {
        height: 50,
    },
    header_image_border: {
        borderRadius: 15
    },
    header_title: {
        fontFamily: fonts.POPPINS_BOLD
    },
    result_number: {
        textAlign: 'center',
        color: colors.BLACK,
        fontFamily: fonts.POPPINS_BOLD,
        marginVertical: 10,
        fontSize: 12
    }
})