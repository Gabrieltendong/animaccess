//import liraries
import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from './styles'
import Container from '@components/common/Container';
import SearchBar from '@components/SeachBar';
import CategorieItem from '@components/CategorieItem';
import ServiceItem from '@components/ServiceItem';
import Help from '@components/Help';

// create a component
const HomeScreen = () => {
    return (
        <Container title={'Bonjour !'}>
            <SearchBar />
            <ScrollView contentContainerStyle={{paddingBottom: 80}}>
                <View style={styles.section_title_wrapper}>
                    <Text style={styles.section_title}>Catégories</Text>
                </View>
                <ScrollView horizontal style={{maxHeight: 100}}>
                    <CategorieItem />
                    <CategorieItem />
                </ScrollView>
                <View style={styles.section_title_wrapper}>
                    <Text style={styles.section_title}>Nos coups de coeur</Text>
                </View>
                <ScrollView horizontal style={{maxHeight: 250}}>
                    <ServiceItem />
                    <ServiceItem />
                </ScrollView>
                <Help />
            </ScrollView>
        </Container>
    );
};

//make this component available to the app
export default HomeScreen;
