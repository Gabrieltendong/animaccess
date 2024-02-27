//import liraries
import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { styles } from './styles'

// create a component
const CategorieItem = () => {
    return (
        <ImageBackground 
            source={require('@assets/images/categorie_enfant.png')} 
            style={styles.container}
            imageStyle={styles.border_container}
        >
            <Text style={styles.title_categorie}>Pour les enfants</Text>
        </ImageBackground>
    );
};

//make this component available to the app
export default CategorieItem;
