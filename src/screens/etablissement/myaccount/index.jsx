//import liraries
import React, { Component, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from './styles'
import Container from '@components/common/Container';
import Accordion from 'react-native-collapsible/Accordion';
import MyInfos from '@components/MyInfos';
import MyBooking from '@components/MyBooking';
import SectionItem from '@components/SectionItem';
import MyInfosEtablissement from '@components/MyInfosEtablissement';

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
    const [activeSections, setActiveSections] = useState([0])

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
