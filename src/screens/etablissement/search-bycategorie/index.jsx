//import liraries
import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { styles } from './styles'
import Container from '@components/common/Container';

import Icon from '@components/ui/Icon';
import { colors } from '@themes/index';
import { list_categorie } from 'src/mocks/categorie';
import { list_services } from 'src/mocks/services';
import CardItem from '@components/Card';

// create a component
const SearchByCategorieScreen = ({navigation}) => {
    return (
        <Container title={"Recherche ..."}>
            <View style = {styles.header}>
                <TouchableOpacity style={styles.btn_back} onPress={() => navigation.goBack()}>
                    <Icon name={'ChevronLeft'} color={colors.WHITE} />
                </TouchableOpacity>
                <View style={styles.image_wrapper}>
                    <ImageBackground 
                        source={list_categorie[0].image} 
                        style={styles.header_image}
                        imageStyle={styles.header_image_border}
                    >
                        <Text style={styles.header_title}>{list_categorie[0].title}</Text>
                    </ImageBackground>
                </View>
            </View>
            <Text style={styles.result_number}>81 resultats</Text>
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
export default SearchByCategorieScreen;
