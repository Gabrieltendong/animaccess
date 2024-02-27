import { fonts } from "@themes/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        height: 100,
        width: 180,
        padding: 10,
        marginRight: 10
    },
    border_container: {
        borderRadius: 20
    },
    title_categorie: {
        width: '50%',
        fontFamily: fonts.POPPINS_BOLD,
    }
})