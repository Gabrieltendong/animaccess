//import liraries
import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { styles } from './styles'
import Container from '@components/common/Container';
import BookingItem from '@components/BookingItem';
import Help from '@components/Help';
import { useUserStore } from 'src/store/user.store';
import BookingPrestataireItem from '@components/BookingPrestataireItem';
import { useQuery } from 'react-query';
import { get_my_booking_prestataire } from 'src/feature/booking/booking.service';
import Empty from '@components/Empty';

// create a component
const HomeScreen = () => {

    const { user } = useUserStore()
    const prestataire_id = user?.account?.id
    const {data: list_booking_pretataire, isLoading, refetch} = useQuery(['List_booking_prestataire', prestataire_id], get_my_booking_prestataire)

    return (
        <Container title={`Bonjour ${user?.account?.user?.name} !`}>
            <View style={[
                    styles.container,
                    Array.isArray(list_booking_pretataire) && list_booking_pretataire.length == 0 && styles.container_empty_booking
                ]}>
                
                {
                    Array.isArray(list_booking_pretataire) && list_booking_pretataire.length > 0?
                   <View>
                    <Text style={styles.header_title}>Mes prochains rendez-vous</Text>
                     <ScrollView style={styles.content} horizontal={true}>
                        {
                            Array.isArray(list_booking_pretataire) && list_booking_pretataire.slice(0,3).map((item) => (
                                <BookingPrestataireItem item={item} style={styles.booking_item} />
                            ))
                        }
                    </ScrollView>
                   </View>
                   :isLoading?
                   <ActivityIndicator size={'large'} />
                   :
                   <Empty title={"Vous n'avez pas de rendez-vous pour le moment"} />
                }
               
            </View>
            <View style={styles.footer}>
                <Help />
            </View>
        </Container>
    );
};

//make this component available to the app
export default HomeScreen;
