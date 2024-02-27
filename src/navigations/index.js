import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import EtablissementNavigator from './etablissement/TabsNavigator';
import PrestataireNavigator from './prestataire/TabsNavigator';
import { ETABLISSEMENT_NAVIGATOR, PRESTATAIRE_NAVIGATOR, WELCOME } from '@constants/routes';
import WelcomeScreen from '@screens/welcome';


const Stack = createNativeStackNavigator();

const Rooter = () => (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_bottom'}}>
        <Stack.Screen name={WELCOME} component={WelcomeScreen} />
        <Stack.Screen name={"Auth"} component={AuthNavigator} />
        <Stack.Screen name={ETABLISSEMENT_NAVIGATOR} component={EtablissementNavigator} />
        <Stack.Screen name={PRESTATAIRE_NAVIGATOR} component={PrestataireNavigator} />
    </Stack.Navigator>
)

export default Rooter
