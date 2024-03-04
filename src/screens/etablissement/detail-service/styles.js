import { colors, fonts } from "@themes/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    header: {
        flexDirection: 'row'
    },
    avatar_wrapper: {
        height: 130,
        width: 130,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 70,
        backgroundColor: '#eee'
    },
    title: {
        fontFamily: fonts.POPPINS_SEMI_BOLD,

    },
    subtitle: {
        fontFamily: fonts.POPPINS_MEDIUM,
        color: colors.GRAY
    },
    avatar: {
        height: 130,
        width: 130,
        borderRadius: 70
    },
    infos_service_wrapper: {
        marginLeft: 10
    },
    btn_header: {
        height: 40
    },
    small_text: {
        color: colors.PRIMARY,
        fontFamily: fonts.POPPINS_REGULAR,
        fontSize: 12
    },
    description: {
        textAlign: 'center',
        marginVertical: 20
    },
    row_center: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    text_primary: {
        color: colors.PRIMARY,
        marginLeft: 5
    },
    text_price: {
        fontFamily: fonts.POPPINS_SEMI_BOLD,
        fontSize: 16
    },
    map_wrapper: {
        height: 200,
        width: '100%',
        borderRadius: 20,
        borderWidth: 1,
        overflow: 'hidden',
        marginTop: 20
    },
    map: {
        height: 200,
        width: '100%',
        borderRadius: 20
    },
    btn_booking: {
        width: 200,
        alignSelf: 'center',
        marginTop: 30
    }
})