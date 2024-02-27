import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HOME_PRESTATAIRE, MYACCOUNT_PRESTATAIRE, MYBOOKING_PRESTATAIRE, MY_SERVICE } from '@constants/routes';
import HomeScreen from '@screens/prestataire/home';
import MyServiceScreen from '@screens/prestataire/myservices';
import MyBookingScreen from '@screens/prestataire/mybooking';

const Tab = createBottomTabNavigator();

function PrestataireNavigator(){
    return(
        <Tab.Navigator>
            <Tab.Screen name={HOME_PRESTATAIRE} component={HomeScreen} />
            <Tab.Screen name={MY_SERVICE} component={MyServiceScreen} />
            <Tab.Screen name={MYBOOKING_PRESTATAIRE} component={MyBookingScreen} />
            <Tab.Screen name={MYACCOUNT_PRESTATAIRE} component={MYACCOUNT_PRESTATAIRE} />
        </Tab.Navigator>
    )
}

export default PrestataireNavigator