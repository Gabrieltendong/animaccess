//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, ImageBackground, Image, StatusBar } from 'react-native';
import { styles } from './styles'
import Button from '@components/ui/Button';
import { SIGNUP } from '@constants/routes';

// create a component
const WelcomeScreen = ({navigation}) => {

    
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor={'transparent'} />
            <View style={styles.header}>
                <ImageBackground source={require('@assets/images/header-connexion-inscription.png')} style={styles.header_img}>
                    <Image 
                        source={require('@assets/images/logo/Logo-animaccess-sans-fond-blanc.png')} 
                        style={styles.logo} 
                        resizeMode='contain' 
                    />
                    <Text style={styles.header_text}>Connectez soins et santé</Text>
                </ImageBackground>
            </View>
            <View style={styles.content}>
                <Button 
                    variant='outline' 
                    text='Connexion' 
                    onPress={() => navigation.navigate("Auth")} 
                />
                <Button 
                    text='Inscription' 
                    onPress={() => navigation.navigate("Auth", {screen: SIGNUP})} 
                />
            </View>
        </View>
    );
};

//make this component available to the app
export default WelcomeScreen;
