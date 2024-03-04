//import liraries
import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './styles'
import Container from '@components/common/Container';
import SearchBar from '@components/SeachBar';
import CategorieItem from '@components/CategorieItem';
import ServiceItem from '@components/ServiceItem';
import Help from '@components/Help';
import { useQuery } from 'react-query';
import { get_all_prestataire_service } from 'src/feature/service/service.service';
import { get_all_categorie } from 'src/feature/categorie/categorie.service';
import { SEARCH_STACK } from '@constants/routes';

// create a component
const HomeScreen = ({navigation}) => {

    const {data: list_all_service, isLoading: isLoadingAllService} = useQuery("all_service", get_all_prestataire_service)
    const {data: list_all_categorie, isLoading: isLoadingAllCategorieService} = useQuery("all_categorie", get_all_categorie)
 
    return (
        <Container title={'Bonjour !'}>
            <SearchBar onPressIn={() => navigation.navigate(SEARCH_STACK)} /> 
            <ScrollView contentContainerStyle={{paddingBottom: 80}}>
                <View style={styles.section_title_wrapper}>
                    <Text style={styles.section_title}>Catégories</Text>
                </View>
                <ScrollView horizontal style={{maxHeight: 100}}>
                    {
                        list_all_categorie?.results && list_all_categorie?.results.map((item, index) => (
                            <CategorieItem key={index} item={item} />
                        ))
                    } 
                </ScrollView>
                <View style={styles.section_title_wrapper}>
                    <Text style={styles.section_title}>Nos coups de coeur</Text>
                </View>
                <ScrollView horizontal style={{maxHeight: 250}}>
                    {
                        list_all_service?.results && list_all_service?.results.map((item, index) => (
                            <ServiceItem key={index} item={item} />
                        ))
                    }
                </ScrollView>
                <Help />
            </ScrollView>
        </Container>
    );
};

//make this component available to the app
export default HomeScreen;
