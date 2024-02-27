import { fonts } from "@themes/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        height: 110,
        flex: 1,
        margin: 10,
    },
    image_wrapper: {
        height: 110,
        padding: 10,
    },
    border_container: {
        borderRadius: 20
    },
    title_categorie: {
        width: '70%',
        fontFamily: fonts.POPPINS_BOLD,
    }
})