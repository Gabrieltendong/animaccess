//import liraries
import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles } from './styles'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Container from '@components/common/Container';
import MyBookingScreen from './MyBooking';
import MyScheduleScreen from './MySchedule';
import { colors, fonts } from '@themes/index';

const Tab = createMaterialTopTabNavigator();

// create a component
const MyBookingStack = () => {
    return (
        <Container>
            <Tab.Navigator screenOptions={{
                tabBarIndicatorStyle: {
                    backgroundColor: colors.PRIMARY
                },
                tabBarLabelStyle: {
                    textTransform: 'none',
                    fontFamily: fonts.POPPINS_BOLD
                }
            }} >
                <Tab.Screen 
                    name="MyBooking" 
                    component={MyBookingScreen}
                    options={{
                        tabBarLabel: "Mes réservations"
                    }}
                />
                <Tab.Screen 
                    name="MySchedule" 
                    component={MyScheduleScreen}
                    options={{
                        tabBarLabel: "Mon Planning"
                    }}
                />
            </Tab.Navigator>
        </Container>
    );
};

//make this component available to the app
export default MyBookingStack;
