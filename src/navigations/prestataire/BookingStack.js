import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BOOKING_DETAIL_PRESTATAIRE, MYBOOKING_PRESTATAIRE } from '@constants/routes';
import MyBookingScreen from '@screens/prestataire/mybooking/MyBooking';
import BookingPrestataireDetailScreen from '@screens/prestataire/booking-detail';
import MyBookingStack from '@screens/prestataire/mybooking';

const Stack = createNativeStackNavigator()

function BookingStack(){
    return(
        <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_bottom'}}>
            <Stack.Screen 
                name={MYBOOKING_PRESTATAIRE} 
                component={MyBookingStack} 
            />
        </Stack.Navigator>
    )
}

export default BookingStack