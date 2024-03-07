//import liraries
import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from './styles'
import Container from '@components/common/Container';
import BookingItem from '@components/BookingItem';
import Help from '@components/Help';
import { useUserStore } from 'src/store/user.store';
import BookingPrestataireItem from '@components/BookingPrestataireItem';
import { useQuery } from 'react-query';
import { get_my_booking_prestataire } from 'src/feature/booking/booking.service';

// create a component
const HomeScreen = () => {

    const { user } = useUserStore()
    const prestataire_id = user?.account?.id
    const {data: list_booking_pretataire, isLoading, refetch} = useQuery(['List_booking_prestataire', prestataire_id], get_my_booking_prestataire)

    return (
        <Container title={`Bonjour ${user?.account?.user?.name} !`}>
            <View style={styles.container}>
                {
                    list_booking_pretataire && 
                    <ScrollView style={styles.content} horizontal={true}>
                        {
                            Array.isArray(list_booking_pretataire) && list_booking_pretataire.slice(0,3).map((item) => (
                                <BookingPrestataireItem item={item} style={styles.booking_item} />
                            ))
                        }
                    </ScrollView>
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
