//import liraries
import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles'
import Icon from '../Icon';
import { colors } from '@themes/index';
import {Home} from 'lucide-react-native'

// create a component
const Input = ({
    iconName,
    leftIcon,
    placeholder,
    onPressLeftIcon,
    secureTextEntry=false,
    onChangeText,
    keyboardType,
    value
}) => {
    return (
        <View style={styles.container}>
            <Icon name={iconName} color={colors.BLACK} size={18}/>
            <TextInput 
                secureTextEntry={secureTextEntry} 
                placeholder={placeholder} 
                style={styles.input} 
                placeholderTextColor={colors.GRAY}
                onChangeText={onChangeText}
                numberOfLines={1}
                keyboardType={keyboardType}
                value={value}
            />
            {
                leftIcon &&
                <TouchableOpacity onPress={onPressLeftIcon}>
                    <Icon name={leftIcon} color={colors.PRIMARY} size={18}/>
                </TouchableOpacity>
            }
        </View>
    );
};

//make this component available to the app
export default Input;
