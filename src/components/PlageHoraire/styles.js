import { colors } from "@themes/index";
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colors.WHITE,
        height: 80,
        padding: 10,
        borderRadius: 20,
        marginBottom: 10,
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    time_wrapper: {
        flex: 1,
        // flexDirection: 'row'
    },
    btn_delete: {
        // marginRight: 5,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn_time: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#eee',
        width: 100,
        height: 40
    },
    time: {
        // borderWidth: 1,
        marginLeft: 10,
        flex: 1
    }
})