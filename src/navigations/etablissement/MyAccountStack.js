import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BOOKING_DETAIL, MYACCOUNT_ETABLISSEMENT, MYBOOKING_ETABLISSEMENT } from '@constants/routes';
import MyAccountScreen from '@screens/etablissement/myaccount';
import DetailBookingEtablissementScreen from '@screens/etablissement/detail-booking';
import MyBookingEtablissementScreen from '@screens/etablissement/mybooking';

const Stack = createNativeStackNavigator()

function MyAccountStack(){
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={MYACCOUNT_ETABLISSEMENT} component={MyAccountScreen} />
            <Stack.Screen name={BOOKING_DETAIL} component={DetailBookingEtablissementScreen} />
            <Stack.Screen name={MYBOOKING_ETABLISSEMENT}  component={MyBookingEtablissementScreen}/>
        </Stack.Navigator>
    )
}

export default MyAccountStack