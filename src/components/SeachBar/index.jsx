//import liraries
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles'
import Icon from '@components/ui/Icon';
import { colors } from '@themes/index';

// create a component
const SearchBar = ({onPressIn, onChangeText, onSearch, value}) => {
    return (
        <View style={styles.container}>
            <View style={styles.input_wrapper}>
                <Icon name={'Search'} color={colors.GRAY} size={18} />
                <TextInput
                    value={value}
                    placeholder='Recherche...' 
                    placeholderTextColor={colors.GRAY}
                    style={styles.input}
                    onPressIn={onPressIn}
                    onChangeText={onChangeText}
                />
            </View>
            <TouchableOpacity style={styles.btn_filter} onPress={onSearch}>
                <Icon name={'SlidersHorizontal'} color={colors.WHITE} size={20} />
            </TouchableOpacity>
        </View>
    );
};

//make this component available to the app
export default SearchBar;
