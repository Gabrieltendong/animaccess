//import liraries
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { styles } from './styles';
import Container from '@components/common/Container';
import { useService } from 'src/feature/service/useService';
import { useServiceStore } from 'src/store/service.store';
import Empty from '@components/Empty';
import CardItem from '@components/Card';

// create a component
const ProfilePrestataireScreen = ({route}) => {

    const {prestataire_infos} = route.params
    const { getListeServicePrestataire } = useService()
    const { list_service_prestataire } = useServiceStore()
    const { isLoading, refetch } = getListeServicePrestataire(prestataire_infos?.id)

    console.log("list_service_prestataire", list_service_prestataire)

    return (
        <Container>
            <Text style = {styles.title_wrapper}>
                <Text style={styles.title}>Liste des services de </Text>
                <Text style={styles.title_bold}>{prestataire_infos?.user?.name} {prestataire_infos?.user?.lastname} </Text>
            </Text>
            <FlatList
                style={{paddingTop: 10, marginHorizontal: -20, paddingHorizontal: 10}}
                data={list_service_prestataire}
                renderItem={({item, index}) => (
                    <CardItem 
                        key={index} 
                        item={item}
                    />
                ) }
                numColumns={2}
                refreshing={isLoading}
                onRefresh={() => refetch()}
                columnWrapperStyle={{gap: 10}}
                contentContainerStyle={{paddingBottom: 80}}
            />
        </Container>
    );
};

//make this component available to the app
export default ProfilePrestataireScreen;
