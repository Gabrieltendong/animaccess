import { colors, fonts } from "@themes/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 5,
        alignSelf: 'flex-start',
        paddingHorizontal: 10
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.WHITE,
    }
})