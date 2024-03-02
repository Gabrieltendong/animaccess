import { fonts } from "@themes/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    title: {
        fontFamily: fonts.POPPINS_BOLD,
        fontSize: 18,
        flex: 1
    },
    btn: {
        paddingHorizontal: 10,
        height: 40
    }
})