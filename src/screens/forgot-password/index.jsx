//import liraries
import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { styles } from './styles'
import Icon from '@components/ui/Icon';
import { useForm, Controller } from 'react-hook-form';
import { colors } from '@themes/index';
import Button from '@components/ui/Button';
import Input from '@components/ui/Input';
import { useMutation } from 'react-query';
import { sent_otp_by_email } from 'src/feature/auth/auth.service';
import { VALIDATE_OTP } from '@constants/routes';

// create a component
const ForgotPasswordScreen = ({navigation}) => {

    const { handleSubmit, control, watch, formState: { errors } } = useForm();
    const {mutateAsync: sentOtpByEmail, isLoading } = useMutation(sent_otp_by_email)

    const handleSendOtp = async (data) => {
        const res = await sentOtpByEmail(data)
        // console.log("res", res)
        if(res.status){
            navigation.navigate(VALIDATE_OTP, {email: data.email})
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('@assets/images/banner_connexion.png')} 
                style={styles.image_header}
                imageStyle={styles.image_header_border}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="ArrowLeft" color={colors.WHITE} />
                </TouchableOpacity>
                <Text style={styles.header_title}>Mot de passe oublié</Text>
            </ImageBackground>
            <View style={styles.content}>
                <Controller
                    control={control}
                    render = {({field: {onChange, value}}) => (
                        <Input
                            value={value}
                            onChangeText={onChange}
                            iconName={'Mail'}
                            keyboardType='email-address'
                            placeholder={'Email'}
                        />
                    )}
                    name='email'
                    rules={{ required: true }}
                />
                {errors.email && <Text style={styles.error}>L'email est obligatoire</Text>}
                <Button 
                    text='Valider' 
                    style={styles.btn} 
                    onPress={handleSubmit(handleSendOtp)}
                    isLoading={isLoading}
                />
            </View>
        </View>
    );
};

//make this component available to the app
export default ForgotPasswordScreen;
