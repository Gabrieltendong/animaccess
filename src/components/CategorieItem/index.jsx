//import liraries
import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native';
import { SEARCH_BYCATEGORIE } from '@constants/routes';

// create a component
const CategorieItem = ({item}) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigation.navigate(SEARCH_BYCATEGORIE, {categorie: item})}>
            <ImageBackground 
                source={{uri: item.image}} 
                style={styles.container}
                imageStyle={styles.border_container}
            >
                <View style={styles.content}>
                    <Text style={styles.title_categorie}>{item.name}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

//make this component available to the app
export default CategorieItem;
