//import liraries
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ViewStyle} from 'react-native';
import {styles} from './styles';
import {colors} from '@themes/index';

type ButtonProps = {
  text: string;
  onPress: () => void;
  style: ViewStyle;
  variant: 'contain' | 'outline';
};

// create a component
const Button = ({text, onPress, style, variant = 'contain'}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        style,
        variant == 'outline' ? styles.btn_outline : styles.btn_contain,
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.text_btn,
          {color: variant == 'outline' ? colors.PRIMARY : colors.WHITE},
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

//make this component available to the app
export default Button;
