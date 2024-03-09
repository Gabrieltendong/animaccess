import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BOOKING_DETAIL, MYACCOUNT_ETABLISSEMENT } from '@constants/routes';
import MyAccountScreen from '@screens/etablissement/myaccount';
import DetailBookingEtablissementScreen from '@screens/etablissement/detail-booking';

const Stack = createNativeStackNavigator()

function MyAccountStack(){
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={MYACCOUNT_ETABLISSEMENT} component={MyAccountScreen} />
            <Stack.Screen name={BOOKING_DETAIL} component={DetailBookingEtablissementScreen} />
        </Stack.Navigator>
    )
}

export default MyAccountStack