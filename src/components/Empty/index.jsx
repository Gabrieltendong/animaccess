//import liraries
import { colors, fonts } from '@themes/index';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// create a component
const Empty = ({title}) => {
    return (
        <View style={styles.container}>
            <Image 
                source={require("@assets/images/Empty-amico.png")}
                style={styles.image}
            />
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 200,
        width: 200
    },
    title: {
        fontFamily: fonts.POPPINS_MEDIUM,
        color: colors.GRAY,
        fontSize: 16,
        textAlign: 'center'
    }
});

//make this component available to the app
export default Empty;
