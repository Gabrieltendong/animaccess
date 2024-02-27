import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EtablissementHomeStack from './HomeStack';
import { FAVORITES, MYACCOUNT_ETABLISSEMENT, SEARCH, SEARCH_STACK } from '@constants/routes';
import SearchScreen from '@screens/etablissement/search';
import FavoritesScreen from '@screens/etablissement/favorites';
import MyAccountScreen from '@screens/etablissement/myaccount';
import Icon from '@components/ui/Icon';
import { colors } from '@themes/index';
import { Platform, StyleSheet, View } from 'react-native';
import SearchStack from './SearchStack';

const Tab = createBottomTabNavigator();

function EtablissementNavigator() {
  return (
    <Tab.Navigator 
      screenOptions={({route}) => ({
        headerShown: false, 
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'EtablissementHomeStack') {
            iconName = "Home"
          }
          else if(route.name == SEARCH_STACK){
            iconName = "Search"
          }
          else if(route.name == FAVORITES){
            iconName = "Heart"
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
          position: 'absolute'
        }
      })}
    >
      <Tab.Screen 
        name={"EtablissementHomeStack"} 
        component={EtablissementHomeStack}
      />
      <Tab.Screen 
        name={SEARCH_STACK} 
        component={SearchStack}
      />
      <Tab.Screen 
        name={FAVORITES} 
        component={FavoritesScreen}
      />
      <Tab.Screen 
        name={MYACCOUNT_ETABLISSEMENT} 
        component={MyAccountScreen}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon_wrapper: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30
  }
})

export default EtablissementNavigator