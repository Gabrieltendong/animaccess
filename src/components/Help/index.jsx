//import liraries
import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native';
import { HELP } from '@constants/routes';

// create a component
const Help = () => {
    const navigation = useNavigation()
    return (
        <ImageBackground 
            source={require('@assets/images/banner_help.png')}
            style={styles.image_wrapper} 
            imageStyle={styles.image_border}
            resizeMode='stretch'
        >
            <Text style={styles.title}>Besoin d'aide ?</Text>
            <Text style={styles.sub_title}>Vous souhaitez être accompagné dans votre recherche ?</Text>
            <Text style={styles.sub_title}>Vous pouvez nous contacter, un conseiller vas vous aider a faire le premier pas!</Text>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate(HELP)}>
                <Text style={styles.text_btn}>Notre assistance</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
};

//make this component available to the app
export default Help;
