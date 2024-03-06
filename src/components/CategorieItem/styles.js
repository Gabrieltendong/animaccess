import { colors, fonts } from "@themes/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        height: 100,
        width: 180,
        marginRight: 10
    },
    border_container: {
        borderRadius: 20
    },
    title_categorie: {
        width: '70%',
        fontFamily: fonts.POPPINS_BOLD,
        color: colors.WHITE
    },
    content: {
        height: 100,
        borderRadius: 20,
        padding: 10,
        // backgroundColor: "rgba(0,0,0,0.5)"
    }
})