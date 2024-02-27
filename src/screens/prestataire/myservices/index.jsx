//import liraries
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles'

// create a component
const MyServiceScreen = () => {
    return (
        <View style={styles.container}>
            <Text>MyServiceScreen</Text>
        </View>
    );
};

//make this component available to the app
export default MyServiceScreen;
