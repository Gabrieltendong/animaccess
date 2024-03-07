import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CREATE_SERVICE, EDIT_SERVICE, MY_SERVICE } from '@constants/routes';
import HomeScreen from '@screens/etablissement/home';
import MyServiceScreen from '@screens/prestataire/myservices';
import CreateServiceScreen from '@screens/prestataire/create-service';
import EditServiceScreen from '@screens/prestataire/edit-service';

const Stack = createNativeStackNavigator()

function ServiceStack(){
    return(
        <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_bottom'}}>
            <Stack.Screen 
                name={MY_SERVICE} 
                component={MyServiceScreen} 
            />
            <Stack.Screen 
                name={CREATE_SERVICE} 
                component={CreateServiceScreen}
                options={{
                    headerShown: true,
                    headerTitle: "Créer un service"
                }}
            />
            <Stack.Screen 
                name={EDIT_SERVICE} 
                component={EditServiceScreen}
                options={({ route }) => ({ 
                    headerShown: true,
                    headerTitle: route.params?.item?.service?.service?.name 
                })} 
            />
        </Stack.Navigator>
    )
}

export default ServiceStack