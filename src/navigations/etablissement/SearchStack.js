import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SEARCH, SEARCH_BYCATEGORIE } from '@constants/routes';
import SearchScreen from '@screens/etablissement/search';
import SearchByCategorieScreen from '@screens/etablissement/search-bycategorie';

const Stack = createNativeStackNavigator()

function SearchStack(){
    return(
        <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_bottom'}}>
            <Stack.Screen name={SEARCH} component={SearchScreen} />
            <Stack.Screen name={SEARCH_BYCATEGORIE} component={SearchByCategorieScreen} />
        </Stack.Navigator>
    )
}

export default SearchStack