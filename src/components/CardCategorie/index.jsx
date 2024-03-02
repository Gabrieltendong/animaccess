//import liraries
import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { styles } from './styles'
import { SEARCH_BYCATEGORIE } from '@constants/routes';

// create a component
const CardCategorie = ({item, navigation}) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate(SEARCH_BYCATEGORIE, {categorie: item})} style={styles.container}>
            <ImageBackground 
                source={{uri: item?.image}} 
                style={styles.image_wrapper}
                imageStyle={styles.border_container}
            >
                <View style={styles.content}>
                    <Text style={styles.title_categorie}>{item?.name}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

//make this component available to the app
export default CardCategorie;
