import { colors } from "@themes/index";
import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
       backgroundColor: colors.WHITE,
       padding: 20,
       borderRadius: 20
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
    }
})