//import liraries
import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { styles } from './styles'

// create a component
const CategorieItem = ({item}) => {
    return (
        <ImageBackground 
            source={{uri: item.image}} 
            style={styles.container}
            imageStyle={styles.border_container}
        >
            <View style={styles.content}>
                <Text style={styles.title_categorie}>{item.name}</Text>
            </View>
        </ImageBackground>
    );
};

//make this component available to the app
export default CategorieItem;
