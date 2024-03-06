//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from './styles'
import Container from '@components/common/Container';
import Accordion from 'react-native-collapsible/Accordion';
import MyInfos from '@components/MyInfos';
import MyBooking from '@components/MyBooking';
import SectionItem from '@components/SectionItem';
import MyInfosEtablissement from '@components/MyInfosEtablissement';
import { useQuery } from 'react-query';
import { useUserStore } from 'src/store/user.store';
import { get_my_booking_etablissement } from 'src/feature/booking/booking.service';
import { useBookingStore } from 'src/store/booking.store';

const SECTIONS = [
    {
      title: 'Mes informations',
      content: <MyInfosEtablissement />,
      icon: "UserRound"
    },
    {
      title: 'Mes réservations',
      content: <MyBooking />,
      icon: "CalendarCheck"
    },
];

const renderContent = ({content}) => {
    return(
        <View style={styles.content}>
            {content}
        </View>
    )
}

// create a component
const MyAccountScreen = () => {

    const { user } = useUserStore()
    const { setListBookingEtablissement } = useBookingStore()
    const etablissement_id = user?.account?.id
    const [activeSections, setActiveSections] = useState([0])
    const {data: list_booking_etablissement } = useQuery(["List_booking_etablissament", etablissement_id], get_my_booking_etablissement)

    useEffect(() => {
        setListBookingEtablissement(list_booking_etablissement)
    }, [list_booking_etablissement])
   
    return (
        <Container title={"Mon compte"}>
            <ScrollView contentContainerStyle={{paddingBottom: 100}}>
                <Accordion
                    sections={SECTIONS}
                    activeSections={activeSections}
                    // renderSectionTitle={renderSectionTitle}
                    renderHeader={SectionItem}
                    renderContent={renderContent}
                    onChange={setActiveSections}
                    underlayColor={'transparent'}
                    sectionContainerStyle={{marginVertical: 10}}
                />
            </ScrollView>
        </Container>
    );
};

//make this component available to the app
export default MyAccountScreen;
