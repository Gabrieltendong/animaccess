import { colors, fonts } from "@themes/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1
    },
    input_select: {
        width: '100%',
        // height: 50,
        // marginTop: 20,
        backgroundColor: colors.PRIMARY,
        color: colors.WHITE,
        borderRadius: 50
    },
    buttonTextStyle: {
        color: colors.WHITE,
        fontFamily: fonts.POPPINS_REGULAR,
        fontSize: 14
    },
    error: {
        color: colors.PRIMARY,
        fontFamily: fonts.POPPINS_REGULAR,
        fontSize: 12
    },
    text_area: {
        height: 120,
        borderColor: colors.PRIMARY,
        borderWidth: 1,
        marginVertical: 20,
        borderRadius: 20,
        color: colors.BLACK,
        fontFamily: fonts.POPPINS_REGULAR,
        textAlignVertical: 'top',
        paddingHorizontal: 10,
        
    },
    nextBtnTextStyle: {
        color: colors.WHITE,
        fontFamily: fonts.POPPINS_MEDIUM,
        fontSize: 14
    },
    nextBtnStyle: {
        height: 50,
        width: 200,
        backgroundColor: colors.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginBottom: 40
    },
    image_wrapper: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: colors.GRAY,
        borderRadius: 20,
        marginVertical: 10
    },
    image: {
        height: 100,
        borderRadius: 20,
        width: '100%'
    }
})