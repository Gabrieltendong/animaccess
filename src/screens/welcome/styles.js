import { colors, fonts } from "@themes/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 3
    },
    header_img: {
        height: '100%',
        alignItems: 'center',
    },
    header_text: {
        fontFamily: fonts.POPPINS_BOLD,
        fontSize: 35,
        textTransform: 'uppercase',
        textAlign: 'center',
        color: colors.WHITE,
        marginTop: 60
    },
    content: {
        flex: 2,
        justifyContent: 'center',
        paddingHorizontal: 40
    },
    logo: {
        height: 100,
        width: 300,
        marginTop: 50
    }
})