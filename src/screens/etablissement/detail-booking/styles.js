import { colors, fonts } from "@themes/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        // flex: 1,
        padding: 20
    },
    title: {
        fontFamily: fonts.POPPINS_BOLD,
        fontSize: 20
    },
    header: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 20
    },
    header_title: {
        marginLeft: 10,
        fontFamily: fonts.POPPINS_BOLD,
        
    },
    header_subtitle: {
        color: colors.GRAY,
        marginLeft: 5,
        fontSize: 10
    },
    btn_detail_profil: {
        height: 30,
        borderRadius: 10,
        paddingHorizontal: 7
    },
    text_bold: {
        fontFamily: fonts.POPPINS_BOLD,
        fontSize: 16
    },
    time_wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    time_wrapper_title: {
        color: colors.GRAY,
        fontFamily: fonts.POPPINS_REGULAR,
        fontSize: 10
    },
    status_wrapper: {
        height: 300,
        backgroundColor: colors.WHITE,
        borderRadius: 30,
        marginTop: 20,
        padding: 20
    },
    status_title: {
        color: colors.GRAY,
        fontFamily: fonts.POPPINS_MEDIUM
    },
    status_progress_bar: {
        marginTop: 20,
        borderLeftWidth: 2,
        borderLeftColor: colors.GRAY,
        height: 150
    },
    status_pass: {
        height: 15,
        width: 15,
        borderRadius: 20,
        backgroundColor: colors.PRIMARY
    },
    status_to_come: {
        height: 15,
        width: 15,
        borderRadius: 20,
        backgroundColor: colors.GRAY
    },
    status_current: {
        height: 20,
        width: 20,
        borderWidth: 3,
        borderColor: "#fab1a0",
        borderRadius: 20,
        backgroundColor: colors.PRIMARY,
        marginLeft: -2
    },
    status: {
        marginLeft: -9
    },
    status_demande: {
        marginTop: -9,
        marginBottom: 20
    },
    text_status_wraper: {
        paddingLeft: 20,
        paddingVertical: 5,
        backgroundColor: colors.WHITE
    },
    text_status_bold: {
        fontFamily: fonts.POPPINS_BOLD
    },
    margin_vertical: {
        marginVertical: 20
    },
    text_status_wraper_pending: {
        shadowColor: "#ccc",
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 0,
        flex: 1,
        marginLeft: 3,
        borderRadius: 4
    },
    btn_download: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        height: 50,
        borderRadius: 20,
        backgroundColor: colors.PRIMARY
    },
    text_btn: {
        color: colors.WHITE,
        fontFamily: fonts.POPPINS_MEDIUM,
        marginLeft: 5
    }
})