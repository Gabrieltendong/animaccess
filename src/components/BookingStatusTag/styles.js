import { colors, fonts } from "@themes/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10,
        right: 10,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 5,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.WHITE,
    }
})