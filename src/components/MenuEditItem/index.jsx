//import liraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles'
import Icon from '@components/ui/Icon';
import { colors } from '@themes/index';

// create a component
const MenuEditItem = ({title, icon, name}) => {
    return (
        <View style={styles.container}>
            <Icon name={icon} color={colors.BLACK} size={18} />
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity style={styles.btn_edit}>
                <Icon name={"Pencil"} color={colors.PRIMARY} size={14} />
                <Text style={styles.text_btn_edit}>Modifier</Text>
            </TouchableOpacity>
        </View>
    );
};

//make this component available to the app
export default MenuEditItem;
