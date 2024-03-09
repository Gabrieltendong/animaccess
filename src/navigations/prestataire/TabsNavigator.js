import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '@components/ui/Icon';
import { colors } from '@themes/index';
import { Platform, StyleSheet, View } from 'react-native';
import { BOOKING_STACK, HOME_PRESTATAIRE, MYACCOUNT_PRESTATAIRE, SERVICE_STACK } from '@constants/routes';
import HomeScreen from '@screens/prestataire/home';
import MyAccountScreen from '@screens/prestataire/myaccount';
import ServiceStack from './ServiceStack';
import BookingStack from './BookingStack';

const Tab = createBottomTabNavigator();

function PrestataireNavigator(){
    return(
        <Tab.Navigator 
            detachInactiveScreens={false}
            screenOptions={({route}) => ({
                headerShown: false, 
                tabBarShowLabel: false,
                
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === HOME_PRESTATAIRE) {
                    iconName = "Home"
                }
                else if(route.name == SERVICE_STACK){
                    iconName = "Smile"
                }
                else if(route.name == BOOKING_STACK){
                    iconName = "CalendarClock"
                }
                else{
                    iconName = "UserRound"
                }
                // You can return any component that you like here!
                return <View style = {[styles.icon_wrapper, {backgroundColor: focused?'#fff': 'transparent'}]}>
                        <Icon name={iconName} size={size} color={color} />
                    </View>
                },
                tabBarActiveTintColor: colors.PRIMARY,
                tabBarInactiveTintColor: colors.WHITE,
                tabBarStyle: {
                    height: Platform.OS=='android'? 60: 80,
                    backgroundColor: colors.PRIMARY,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    justifyContent: 'center',
                    position: 'absolute'
                }
            })}
        >
            <Tab.Screen name={HOME_PRESTATAIRE} component={HomeScreen} />
            <Tab.Screen name={SERVICE_STACK} component={ServiceStack} />
            <Tab.Screen name={BOOKING_STACK} component={BookingStack} />
            <Tab.Screen name={MYACCOUNT_PRESTATAIRE} component={MyAccountScreen} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    icon_wrapper: {
      height: 40,
      width: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
      marginTop: -30
    }
})

export default PrestataireNavigator