import { POPPINS_BOLD, POPPINS_REGULAR } from "@themes/fonts";
import { colors } from "@themes/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        // height: 250,
        flex: 1,
        marginBottom: 20,
        backgroundColor: colors.WHITE,
        borderRadius: 20
    },
    card_image: {
        height: 150,
        // width: 200
    },
    btn_favorite: {
        position: 'absolute',
        right: 10,
        top: 10
    },
    card_image_border: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    card_title: {
        color: colors.BLACK,
        fontFamily: POPPINS_BOLD
    },
    card_subTitle: {
        color: colors.GRAY,
        fontFamily: POPPINS_REGULAR,
        fontSize: 12
    },
    price_service: {
        color: colors.PRIMARY,
        textAlign: 'right',
        marginTop: 10,
        fontFamily: POPPINS_BOLD
    },
    card_content: {
        paddingHorizontal: 10,
        paddingTop: 10
    },
    text_small: {
        fontSize: 10,
        fontFamily: POPPINS_REGULAR
    },
    btn: {
        width: 100,
        alignSelf: 'center',
        height: 40
    },
    btn_delete: {
        height: 30,
        width: 30,
        backgroundColor: colors.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        position: 'absolute',
        zIndex: 2,
        elevation: 20,
        right: -5,
        top: -10
    }
})