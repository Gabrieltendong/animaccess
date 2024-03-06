import { colors, fonts } from "@themes/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        height: 110,
        flex: 1,
        marginVertical: 10,
    },
    image_wrapper: {
        height: 110,
    },
    content: {
        padding: 10,
        // backgroundColor: 'rgba(0,0,0,0.6)',
        height: 110,
        borderRadius: 20
    },
    border_container: {
        borderRadius: 20
    },
    title_categorie: {
        width: '70%',
        fontFamily: fonts.POPPINS_BOLD,
        color: colors.WHITE
    }
})