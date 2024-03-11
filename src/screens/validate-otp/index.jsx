//import liraries
import React, { Component, useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';
import { useForm, Controller } from 'react-hook-form';
import { styles } from './styles'
import { colors } from '@themes/index';
import Icon from '@components/ui/Icon';
import Button from '@components/ui/Button';
import { useMutation } from 'react-query';
import { validate_otp } from 'src/feature/auth/auth.service';
import { RESET_PASSWORD } from '@constants/routes';

const CELL_COUNT = 6;


// create a component
const ValidateOtpScreen = ({route, navigation}) => {

    const { email } = route.params
    const { handleSubmit, control, watch, formState: { errors } } = useForm();
    const {mutateAsync: handleValidateOtp, isLoading } = useMutation(validate_otp)
    const [value, setValue] = useState('');
    const [message_error, setMessageError] = useState()
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const validateOtp = async (data) => {
        console.log("data", data)
        const res = await handleValidateOtp(data)
        if(res.status){
            navigation.navigate(RESET_PASSWORD, {email, otp: data.otp})
        }else{
            setMessageError("Le code est invalide")
        }
        console.log("object", res)
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
                <Text style={styles.header_title}>Validation de l'otp</Text>
            </ImageBackground>
            <View style={styles.content}>
                <Text style={styles.label}>Un code otp vous été envoyé par mail </Text>
                <Controller
                    control={control}
                    render = {({field: {onChange, value}}) => (
                        <CodeField
                            ref={ref}
                            {...props}
                            value={value}
                            onChangeText={onChange}
                            cellCount={CELL_COUNT}
                            rootStyle={styles.codeFieldRoot}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            renderCell={({index, symbol, isFocused}) => (
                            <Text
                                key={index}
                                style={[styles.cell, isFocused && styles.focusCell]}
                                onLayout={getCellOnLayoutHandler(index)}>
                                {symbol || (isFocused ? <Cursor/> : null)}
                            </Text>
                            )}
                        />
                    )}
                    name='otp'
                    rules={{ required: true }}
                />
                {
                    message_error && <Text style={styles.error}>{message_error}</Text>
                }
                {errors.otp && <Text style={styles.error}>Le code est obligatoire</Text>}
                <Button 
                    text='Valider' 
                    style={styles.btn} 
                    onPress={handleSubmit(validateOtp)} 
                    isLoading={isLoading}
                />
            </View>
        </View>
    );
};

//make this component available to the app
export default ValidateOtpScreen;
