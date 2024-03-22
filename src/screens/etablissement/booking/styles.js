import { colors, fonts } from "@themes/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        // paddingHorizontal: 10
    },
    title: {
        fontFamily: fonts.POPPINS_BOLD,
        fontSize: 18
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    day_wapper: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginBottom: 20,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    day_name_wrapper: {
        flex: 1, 
        alignItems: 'center',
        // borderBottomColor: colors.BLACK,
        // borderBottomWidth: 1
    },
    btn_row: {
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.PRIMARY,
        borderRadius: 15
    },
    day_name: {
        fontSize: 12,
        color: colors.GRAY,
        fontFamily: fonts.POPPINS_REGULAR,
        textTransform: 'capitalize'
    },
    day_name_selected: {
        borderBottomColor: colors.PRIMARY,
        borderBottomWidth: 1
    },
    dateStyle: {
        fontSize: 18,
        fontFamily: fonts.POPPINS_BOLD
    },
    header_week: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.WHITE,
        marginVertical: 20
    },
    header_month_name: {
        fontFamily: fonts.POPPINS_BOLD,
        marginHorizontal: 20,
        textTransform: 'capitalize'
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 30,
        marginRight: 10
    },
    name_prestataire: {
        fontFamily: fonts.POPPINS_BOLD
    },
    name_service: {
        fontFamily: fonts.POPPINS_REGULAR,
        color: colors.GRAY,
        marginLeft: 5
    },
    content_calendar: {
        minHeight: 320,
        backgroundColor: colors.WHITE,
        borderRadius: 20,
        overflow: 'hidden',
        marginTop: 10
    },
    monthStyle: {
        textTransform: 'capitalize',
        fontFamily: fonts.POPPINS_BOLD
    },
    plage_horaire_wrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10
    },
    plage_horaire: {
        height: 35,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        margin: 5,
        borderWidth: 1,
    },
    plage_horaire_selected: {
        borderColor: colors.PRIMARY,
        backgroundColor: colors.PRIMARY
    },
    plage_horaire_busy: {
        borderColor: '#ddd',
        backgroundColor: colors.WHITE
    },
    plage_horaire_not_busy: {
        borderColor: colors.GRAY,
        backgroundColor: colors.WHITE
    },
    text_plage_horaire_selected: {
        color: colors.WHITE
    },
    text_plage_horaire_busy: {
        color: "#ddd",
    },
    text_plage_horaire_not_busy: {
        color: colors.GRAY
    },
    price_wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        borderRadius: 20,
        backgroundColor: colors.WHITE,
        marginTop: 30,
        paddingHorizontal: 10
    },
    text_primary: {
        color: colors.PRIMARY,
        fontFamily: fonts.POPPINS_MEDIUM,
        fontSize: 12
    },
    price: {
        color: colors.PRIMARY,
        fontFamily: fonts.POPPINS_BOLD,
        fontSize: 20
    },
    btn: {
        width: 200,
        alignSelf: 'center',
        marginTop: 20
    }
})