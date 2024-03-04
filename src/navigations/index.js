import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import EtablissementNavigator from './etablissement/TabsNavigator';
import PrestataireNavigator from './prestataire/TabsNavigator';
import { BOOKING_SERVICE, DETAIL_SERVICE, ETABLISSEMENT_NAVIGATOR, PRESTATAIRE_NAVIGATOR, WELCOME } from '@constants/routes';
import WelcomeScreen from '@screens/welcome';
import DetailServiceScreen from '@screens/etablissement/detail-service';
import BookingServiceScreen from '@screens/etablissement/booking';


const Stack = createNativeStackNavigator();

const Rooter = () => (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_bottom'}}>
        <Stack.Screen name={WELCOME} component={WelcomeScreen} />
        <Stack.Screen name={"Auth"} component={AuthNavigator} />
        <Stack.Screen name={ETABLISSEMENT_NAVIGATOR} component={EtablissementNavigator} />
        <Stack.Screen name={PRESTATAIRE_NAVIGATOR} component={PrestataireNavigator} />
        <Stack.Screen name={DETAIL_SERVICE} component={DetailServiceScreen} />
        <Stack.Screen name={BOOKING_SERVICE} component={BookingServiceScreen} />
    </Stack.Navigator>
)

export default Rooter
