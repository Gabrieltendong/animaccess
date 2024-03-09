//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import {styles} from './styles';
import {colors} from '@themes/index';

type ButtonProps = {
  text: string;
  onPress: () => void;
  style: ViewStyle;
  variant: 'contain' | 'outline';
  isLoading?: boolean;
};

// create a component
const Button = ({
  text,
  onPress,
  style,
  variant = 'contain',
  isLoading,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        style,
        variant == 'outline' ? styles.btn_outline : styles.btn_contain,
      ]}
      onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator
          color={variant == 'outline' ? colors.PRIMARY : colors.WHITE}
          size={'large'}
        />
      ) : (
        <Text
          style={[
            styles.text_btn,
            {color: variant == 'outline' ? colors.PRIMARY : colors.WHITE},
          ]}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

//make this component available to the app
export default Button;
