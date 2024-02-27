//import liraries
import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles } from './styles'
import Container from '@components/common/Container';
import { list_services } from 'src/mocks/services';
import CardItem from '@components/Card';

// create a component
const FavoritesScreen = () => {
    return (
        <Container title={"Mes favoris"}>
            <FlatList 
                data={list_services}
                renderItem={CardItem}
                numColumns={2}
                columnWrapperStyle={{gap: 10}}
                style={styles.content}
                contentContainerStyle={{paddingBottom: 70}}
            />
        </Container>
    );
};

//make this component available to the app
export default FavoritesScreen;
