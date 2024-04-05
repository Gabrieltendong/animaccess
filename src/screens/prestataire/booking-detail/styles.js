import { colors, fonts } from "@themes/index";
import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image_header: {
        height: 250
    },
    btn_back: {
        height: 40,
        width: 40,
        backgroundColor: colors.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginLeft: 20,
        marginTop: Platform.OS == 'ios'?40:0
    },
    content: {
        padding: 10,
        marginTop: -50,
        marginHorizontal: 20,
        backgroundColor: colors.WHITE,
        borderRadius: 20,
        height: 350
    },
    title: {
        fontSize: 16,
        fontFamily: fonts.POPPINS_BOLD
    },
    subtitle: {
        fontFamily: fonts.POPPINS_REGULAR,
        color: colors.GRAY
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    row_hours: {
        flexDirection: 'row',
        marginTop: 10,
    },
    text_right: {
        marginLeft: 5
    },
    text_hour: {
        marginLeft: 5,
        borderWidth: 1,
        padding: 5,
        borderRadius: 7,
        marginBottom: 5,
        alignSelf: 'flex-start'
    },
    btn_wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'space-between'
    },
    btn: {
        width: 120,
        height: 40
    },
    image_header_border: {
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30
    },
    btn_close_booking: {
        height: 40,
        alignSelf: 'center',
        width: 200,
        marginTop: 20
    },
    booking_close: {
        fontFamily: fonts.POPPINS_MEDIUM,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: "#55efc4",
        borderRadius: 15,
        textAlign: 'center',
        marginTop: 20,
        color: "#55efc4"
    },
    booking_decline: {
        fontFamily: fonts.POPPINS_MEDIUM,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: "#e17055",
        borderRadius: 15,
        textAlign: 'center',
        marginTop: 20,
        color: "#e17055"
    },
    btn_download: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        height: 40,
        borderRadius: 15,
        backgroundColor: colors.PRIMARY
    },
    text_btn: {
        color: colors.WHITE,
        fontFamily: fonts.POPPINS_MEDIUM,
        marginLeft: 5
    }
})