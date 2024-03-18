//import liraries
import React, { Component, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles } from './styles'
import Container from '@components/common/Container';
import { list_services } from 'src/mocks/services';
import CardItem from '@components/Card';
import Empty from '@components/Empty';
import { useQuery } from 'react-query';
import { useUserStore } from 'src/store/user.store';
import { get_my_favorite } from 'src/feature/favoris/favoris.service';

// create a component
const FavoritesScreen = () => {
    const { user } = useUserStore()
    const etablissement_id = user?.account?.id
    const {data: list_my_favorite, isLoading, refetch} = useQuery(['myFavorite', etablissement_id], get_my_favorite)

    return (
        <Container title={"Mes favoris"}>
            <FlatList 
                data={list_my_favorite}
                renderItem={({item}) => <CardItem item={item} isFavotite={true} />}
                ListEmptyComponent={() => <Empty title={"Vous n'avez aucun favoris"} />}
                numColumns={2}
                refreshing={isLoading}
                onRefresh={() => refetch()}
                columnWrapperStyle={{gap: 10}}
                style={styles.content}
                contentContainerStyle={{paddingBottom: 70}}
            />
        </Container>
    );
};

//make this component available to the app
export default FavoritesScreen;
