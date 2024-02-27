//import liraries
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles'
import Icon from '@components/ui/Icon';
import { colors } from '@themes/index';

// create a component
const SectionItem = (section, index, isActive) => {
    console.log("section", section)
    return (
        <View style={styles.container}>
            <Icon name={section.icon} color={colors.BLACK} size={18} />
            <Text style={styles.section_title}>{section.title}</Text>
            <Icon name={isActive?"ChevronUp": "ChevronDown"} color={colors.PRIMARY} />
        </View>
    );
};

//make this component available to the app
export default SectionItem;
