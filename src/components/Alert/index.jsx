//import liraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal'
import { styles } from './styles';
import Icon from '@components/ui/Icon';
import { colors } from '@themes/index';
import Button from '@components/ui/Button';

// create a component
const Alert = ({
    type,
    isVisible,
    onToggle,
    title,
    subTitle
}) => {
    return (
        <Modal
            animationIn={'slideInUp'}
            animationOut={'fadeOut'}
            isVisible={isVisible}
            onBackButtonPress={onToggle}
            style={styles.container}
        >
            <View style={styles.content}>
                <View style={[styles.icon_wrapper]}> 
                    <Icon name={type == 'success'?"CheckCircle":"AlertCircle"} color={type == "success"? colors.SUCCESS: colors.DANGER} size={40} />
                </View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subTitle}</Text>
                <TouchableOpacity style={[styles.btn, {backgroundColor: type == "success"? colors.SUCCESS: colors.DANGER}]} onPress={onToggle} >
                    <Text style={styles.text_btn}>OK</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

//make this component available to the app
export default Alert;
