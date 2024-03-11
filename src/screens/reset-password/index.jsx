//import liraries
import React, { Component, useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { styles } from './styles'
import Icon from '@components/ui/Icon';
import { colors } from '@themes/index';
import Alert from '@components/Alert';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import { useMutation } from 'react-query';
import { forgot_password } from 'src/feature/auth/auth.service';
import { LOGIN } from '@constants/routes';

// create a component
const ResetPasswordScreen = ({navigation, route}) => {

    const { email, otp } = route.params
    const {mutateAsync: forgotPassword, isLoading } = useMutation(forgot_password)
    const { handleSubmit, control, watch, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState()
    const [isVisibleModalSuccess, setIsVisibleModalSuccess] = useState(false)

    const handleResetPassword = async (data) => {
        const dataForm = {
            email,
            otp,
            ...data
        }
        const res = await forgotPassword(dataForm)
        if(res.status){
            setIsVisibleModalSuccess(true)
        }
    }

    const handleCloseModalSuccess = () => {
        setIsVisibleModalSuccess(false)
        navigation.navigate(LOGIN)
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
                <Text style={styles.header_title}>Changer de mot de passe</Text>
            </ImageBackground>
            <View style={styles.content}>
                <Controller
                    control={control}
                    render = {({field: {onChange, value}}) => (
                        <Input
                            value={value}
                            onChangeText={onChange}
                            iconName={'LockKeyhole'} 
                            placeholder={'Mot de passe'}
                            leftIcon={showPassword?"Eye":"EyeOff"}
                            secureTextEntry={!showPassword}
                            onPressLeftIcon={() => setShowPassword(!showPassword)}
                        />
                    )}
                    name='password'
                    rules={{ required: true }}
                />
                {errors.password && <Text style={styles.error}>Le mot de passe est obligatoire</Text>}
                <Button 
                    text='Valider' 
                    style={styles.btn} 
                    onPress={handleSubmit(handleResetPassword)}
                    isLoading={isLoading}
                />
            </View>
            <Alert 
                type={"success"}
                isVisible={isVisibleModalSuccess}
                title={"Nouveau mot de passe"}
                subTitle={"Votre mot de passe a bien été modifié"}
                onToggle={handleCloseModalSuccess}
            />
        </View>
    );
};

//make this component available to the app
export default ResetPasswordScreen;
