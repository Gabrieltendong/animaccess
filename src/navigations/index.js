import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import EtablissementNavigator from './etablissement/TabsNavigator';
import PrestataireNavigator from './prestataire/TabsNavigator';
import { BOOKING_SERVICE, CHANGE_PASSWORD, DETAIL_SERVICE, EDIT_EMAIL, EDIT_ETABLISSEMENT_NAME, EDIT_NAME, EDIT_PHONE, EDIT_TYPE_ETABLISSEMENT, ETABLISSEMENT_NAVIGATOR, PRESTATAIRE_NAVIGATOR, WELCOME } from '@constants/routes';
import WelcomeScreen from '@screens/welcome';
import DetailServiceScreen from '@screens/etablissement/detail-service';
import BookingServiceScreen from '@screens/etablissement/booking';
import ChangePasswordScreen from '@screens/change-password';
import EditEmailScreen from '@screens/edit-profile/EditEmail';
import EditNameScreen from '@screens/edit-profile/EditName';
import EditPhoneScreen from '@screens/edit-profile/EditPhone';
import EditEtablissementNameScreen from '@screens/edit-profile/EditEtablissmentName';
import EditTypeEtablissementScreen from '@screens/edit-profile/EditTypeEtablissement';


const Stack = createNativeStackNavigator();

const Rooter = () => (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_bottom'}}>
        <Stack.Screen name={WELCOME} component={WelcomeScreen} />
        <Stack.Screen name={"Auth"} component={AuthNavigator} />
        <Stack.Screen name={ETABLISSEMENT_NAVIGATOR} component={EtablissementNavigator} />
        <Stack.Screen name={PRESTATAIRE_NAVIGATOR} component={PrestataireNavigator} />
        <Stack.Screen name={DETAIL_SERVICE} component={DetailServiceScreen} />
        <Stack.Screen name={BOOKING_SERVICE} component={BookingServiceScreen} />
        <Stack.Screen name={CHANGE_PASSWORD} component={ChangePasswordScreen} />
        <Stack.Screen name={EDIT_EMAIL} component={EditEmailScreen} />
        <Stack.Screen name={EDIT_NAME} component={EditNameScreen} />
        <Stack.Screen name={EDIT_PHONE} component={EditPhoneScreen} />
        <Stack.Screen name={EDIT_ETABLISSEMENT_NAME} component={EditEtablissementNameScreen} />
        <Stack.Screen name={EDIT_TYPE_ETABLISSEMENT} component={EditTypeEtablissementScreen} />
    </Stack.Navigator>
)

export default Rooter
