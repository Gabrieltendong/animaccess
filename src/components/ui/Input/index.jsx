//import liraries
import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
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
    value,
    defaultValue,
    leftText
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
                defaultValue={defaultValue}
            />
            {
                leftIcon &&
                <TouchableOpacity onPress={onPressLeftIcon}>
                    <Icon name={leftIcon} color={colors.PRIMARY} size={18}/>
                </TouchableOpacity>
            }
            {
                leftText && 
                <Text style={styles.leftText}>
                    {leftText}
                </Text>
            }
        </View>
    );
};

//make this component available to the app
export default Input;
