import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HOME_ETABLISSEMENT, SEARCH_BYCATEGORIE } from '@constants/routes';
import HomeScreen from '@screens/etablissement/home';
import SearchByCategorieScreen from '@screens/etablissement/search-bycategorie';

const Stack = createNativeStackNavigator()

function EtablissementHomeStack(){
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={HOME_ETABLISSEMENT} component={HomeScreen} />
            <Stack.Screen name={SEARCH_BYCATEGORIE} component={SearchByCategorieScreen} />
        </Stack.Navigator>
    )
}

export default EtablissementHomeStack