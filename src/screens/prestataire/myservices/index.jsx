//import liraries
import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles } from './styles'
import Container from '@components/common/Container';
import Button from '@components/ui/Button';
import { list_services } from 'src/mocks/services';
import MyServiceItem from '@components/MyServiceItem';
import { CREATE_SERVICE } from '@constants/routes';
import { useService } from 'src/feature/service/useService';
import { useUserStore } from 'src/store/user.store';
import { useMutation, useQuery } from 'react-query';
import { delete_service_prestataire, get_all_prestataire_service } from 'src/feature/service/service.service';
import { useServiceStore } from 'src/store/service.store';
import Empty from '@components/Empty';

// create a component
const MyServiceScreen = ({navigation}) => {

    const { getListeServicePrestataire } = useService() 
    const { user } = useUserStore() 
    const { list_service_prestataire } = useServiceStore()
    const { isLoading, refetch } = getListeServicePrestataire(user?.account?.id)

    console.log("list_service_prestataire", JSON.stringify(list_service_prestataire))
           
    return (
        <Container>
            <View style={styles.row}>
                <Text style = {styles.title}>Mes services</Text>
                <Button 
                    text='Créer un service' 
                    style={styles.btn}
                    onPress={() => navigation.navigate(CREATE_SERVICE)}
                />
            </View>
            <FlatList
                style={{paddingTop: 10, marginHorizontal: -20, paddingHorizontal: 10}}
                data={list_service_prestataire}
                renderItem={({item, index}) => (
                    <MyServiceItem 
                        key={index} 
                        item={item}
                    />
                ) } 
                ListEmptyComponent={() => <Empty title={"Vous n'avez aucun service"} />}
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
export default MyServiceScreen;
