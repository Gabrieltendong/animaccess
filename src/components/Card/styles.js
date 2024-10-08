import { POPPINS_BOLD, POPPINS_REGULAR } from "@themes/fonts";
import { colors } from "@themes/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        // height: 250,
        flex: 1,
        marginTop: 10,
        backgroundColor: colors.WHITE,
        borderRadius: 20,
        paddingBottom: 10
    },
    card_image: {
        height: 100,
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
    }
})