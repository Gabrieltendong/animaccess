//import liraries
import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { styles } from './styles'
import { SEARCH_BYCATEGORIE } from '@constants/routes';

// create a component
const CardCategorie = ({item, navigation}) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate(SEARCH_BYCATEGORIE)} style={styles.container}>
            <ImageBackground 
                source={item.image} 
                style={styles.image_wrapper}
                imageStyle={styles.border_container}
            >
                <Text style={styles.title_categorie}>{item.title}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
};

//make this component available to the app
export default CardCategorie;
