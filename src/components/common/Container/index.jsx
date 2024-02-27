//import liraries
import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, StatusBar } from 'react-native';
import { styles } from './styles'
import { colors } from '@themes/index';

// create a component
const Container = ({children, title}) => {
    return (
        <View style={styles.container}>
            <StatusBar translucent={false} backgroundColor={colors.PRIMARY} />
            <View style={styles.header}>
                <ImageBackground 
                    source={require('@assets/images/banner_accueil.png')} 
                    style={styles.logo_wrapper}
                    imageStyle={styles.image_header_border}
                >
                    <Image 
                      source={require('@assets/images/logo/Logo-animaccess-sans-soustexte.png')}
                      style={styles.logo}
                      resizeMode='contain'
                    />
                </ImageBackground>
            </View>
            <Text style={styles.text_header}>{title}</Text>
            <View style={styles.content}>
            {children}
            </View>
        </View>
    );
};

//make this component available to the app
export default Container;
