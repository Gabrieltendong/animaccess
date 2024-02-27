import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HOME_ETABLISSEMENT } from '@constants/routes';
import HomeScreen from '@screens/etablissement/home';

const Stack = createNativeStackNavigator()

function EtablissementHomeStack(){
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={HOME_ETABLISSEMENT} component={HomeScreen} />
        </Stack.Navigator>
    )
}

export default EtablissementHomeStack