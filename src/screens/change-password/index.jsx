//import liraries
import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import { styles } from './styles'
import Container from '@components/common/Container';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import { useMutation } from 'react-query';
import { useUserStore } from 'src/store/user.store';
import { reset_password } from 'src/feature/auth/auth.service';
import Alert from '@components/Alert';

// create a component
const ChangePasswordScreen = ({navigation}) => {

    const { user } = useUserStore()
    const {mutateAsync: changePassword, isLoading } = useMutation(reset_password)
    const { handleSubmit, control, watch, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false)
    const [showLastPassword, setShowLastPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isVisibleModalSuccess, setIsVisibleModalSuccess] = useState(false)
    const [isVisibleModalError, setIsVisibleModalError] = useState(false)
    const [messageError, setMessageError] = useState("")

    const handleChangePassword = async (data) => {
        const dataForm = {
            old_password: data.old_password,
            password: data.password
        }
        if(user?.account?.user?.statut == "PRESTATAIRE"){
            dataForm.email = user?.account?.user?.email
        }else{
            dataForm.email = user?.account?.gerant?.email
        }
        const res = await changePassword(dataForm)
        if(res.error){
            setMessageError(res.error)
            setIsVisibleModalError(true)
        }else{
            setIsVisibleModalSuccess(true)
        }
        console.log("res", res)
    }

    const handleCloseModalSuccess = () => {
        setIsVisibleModalSuccess(true)
        navigation.goBack()
    }

    return (
        <Container showBackButton={true} title={"Nouveau de mot de passe"}>
            <Controller
                control={control}
                render = {({field: {onChange, value}}) => (
                    <Input
                        value={value}
                        onChangeText={onChange}
                        iconName={'LockKeyhole'} 
                        placeholder={'Mot de passe actuel'}
                        leftIcon={showLastPassword?"Eye":"EyeOff"}
                        secureTextEntry={!showLastPassword}
                        onPressLeftIcon={() => setShowLastPassword(!showLastPassword)}
                    />
                )}
                name='old_password'
                rules={{ required: true }}
            />
            {errors.old_password && <Text style={styles.error}>Le mot de passe est obligatoire</Text>}
           <Controller
                control={control}
                render = {({field: {onChange, value}}) => (
                    <Input
                        value={value}
                        onChangeText={onChange}
                        iconName={'LockKeyhole'} 
                        placeholder={'Nouveau mot de passe'}
                        leftIcon={showPassword?"Eye":"EyeOff"}
                        secureTextEntry={!showPassword}
                        onPressLeftIcon={() => setShowPassword(!showPassword)}
                    />
                )}
                name='password'
                rules={{ required: true }}
            />
            {errors.password && <Text style={styles.error}>Le mot de passe est obligatoire</Text>}
            <Controller
                control={control}
                render = {({field: {onChange, value}}) => (
                    <Input
                        value={value}
                        onChangeText={onChange}
                        iconName={'LockKeyhole'} 
                        placeholder={'Confirmer votre nouveau mot de passe'}
                        leftIcon={showConfirmPassword?"Eye":"EyeOff"}
                        secureTextEntry={!showConfirmPassword}
                        onPressLeftIcon={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                )}
                name='confirm_password'
                rules={{ 
                    required: true,
                    validate: (val) => {
                        if (watch('password') != val) {
                            return "Les deux mots de passe ne sont pas identique";
                        }
                    }
                }}
            />
            {errors.confirm_password?.type == 'validate' && <Text style={styles.error}>Les deux mots de passe ne sont pas identique</Text>}
            {errors.confirm_password?.type == 'required' && <Text style={styles.error}>Ce champ est obligatoire</Text>}
            <Button 
                text='Valider' 
                style={styles.btn} 
                onPress={handleSubmit(handleChangePassword)}
                isLoading={isLoading}
            />
            <Alert
                type={"success"}
                isVisible={isVisibleModalSuccess}
                title={"Modification réussi"}
                subTitle={"Votre mot de passe a bien été modifié"}
                onToggle={handleCloseModalSuccess}
            />
            <Alert 
                type={"danger"}
                isVisible={isVisibleModalError}
                title={"Echec de modification"}
                subTitle={messageError}
                onToggle={() => setIsVisibleModalError(false)}
            />
        </Container>
    );
};

//make this component available to the app
export default ChangePasswordScreen;
