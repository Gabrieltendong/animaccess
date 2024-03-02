import { colors, fonts } from "@themes/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 25,
        height: 50,
        borderWidth: 1,
        borderColor: colors.PRIMARY,
        paddingHorizontal: 10,
        marginVertical: 10
    },
    input: {
        flex: 1,
        fontFamily: fonts.MONTSERRAT_MEDIUM,
        marginLeft: 5,
        color: colors.BLACK,
        // borderWidth: 1
    }
})