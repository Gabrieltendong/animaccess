//import liraries
import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles'
import Container from '@components/common/Container';
import Accordion from 'react-native-collapsible/Accordion';
import MyInfos from '@components/MyInfos';
import SectionItem from '@components/SectionItem';

const SECTIONS = [
    {
      title: 'Mes informations',
      content: <MyInfos />,
      icon: "UserRound"
    }
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
        </Container>
    );
};

//make this component available to the app
export default MyAccountScreen;
