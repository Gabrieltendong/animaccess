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
import { useQuery } from 'react-query';
import { get_list_service_by_categorie } from 'src/feature/service/service.service';
import Empty from '@components/Empty';

// create a component
const SearchByCategorieScreen = ({navigation, route}) => {

    const { categorie } = route.params  
    const categorie_id = categorie.id
    const { data: list_service_by_categorie, isLoading } = useQuery(["listServiceByCategorie", categorie_id], get_list_service_by_categorie)

    return (
        <Container>
            <View style = {styles.header}>
                <TouchableOpacity style={styles.btn_back} onPress={() => navigation.goBack()}>
                    <Icon name={'ChevronLeft'} color={colors.WHITE} />
                </TouchableOpacity>
                <View style={styles.image_wrapper}>
                    <ImageBackground 
                        source={{uri: categorie.image}} 
                        style={styles.header_image}
                        imageStyle={styles.header_image_border}
                    >
                        <View style={styles.header_title_wrapper}><Text style={styles.header_title}>{categorie.name}</Text></View>
                    </ImageBackground>
                </View>
            </View>
            <Text style={styles.result_number}>{list_service_by_categorie && list_service_by_categorie.length}   resultats</Text>
            <FlatList 
                data={list_service_by_categorie}
                renderItem={({item}) => <CardItem item={item} />}
                ListEmptyComponent={() => <Empty title={"Aucun service trouvé pour cette catégorie"} />}
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
