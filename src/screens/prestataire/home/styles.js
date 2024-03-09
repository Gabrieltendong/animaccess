import { colors, fonts } from "@themes/index";
import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
       backgroundColor: colors.WHITE,
       padding: 20,
       borderRadius: 20,
       
    },
    container_empty_booking: {
        minHeight: 300
    },
    content: {
        maxHeight: 200,
        gap: 20
    },
    footer: {
        width: Dimensions.get('window').width - 40,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 120
    },
    booking_item: {
        width: Dimensions.get('window').width - 120
    },
    header_title: {
        fontFamily: fonts.POPPINS_MEDIUM,
        marginBottom: 20
    }
})