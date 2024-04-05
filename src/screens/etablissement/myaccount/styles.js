import { StyleSheet } from "react-native";
import { colors, fonts } from "@themes/index";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: { 
        minHeight: 350, 
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingVertical: 30,
        width: '95%',
        alignSelf: 'center',
        marginTop: 1
    },
    mybookingsBtn:{
        flexDirection: 'row',
        alignItems: 'center',
        display:'flex',
        backgroundColor: colors.WHITE,
        borderRadius: 50,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    mybookingsBtnText: {
        marginLeft: 10,
    },
})