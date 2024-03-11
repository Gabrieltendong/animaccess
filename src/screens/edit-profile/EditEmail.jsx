//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import { styles } from './styles';
import Container from '@components/common/Container';
import { useUserStore } from 'src/store/user.store';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import { useMutation } from 'react-query';
import { update_etablissement, update_prestataire } from 'src/feature/auth/auth.service';
import Alert from '@components/Alert';

// create a component
const EditEmailScreen = ({navigation}) => {

    const { user, updateUser } = useUserStore()
    const {mutateAsync: updatePresataire, isLoading: isLoadingUpdatePrestataire } = useMutation(update_prestataire)
    const {mutateAsync: updateEtablissement, isLoading: isLoadingUpdateEtablissement } = useMutation(update_etablissement)
    const { handleSubmit, control,reset, formState: { errors } } = useForm();
    const [isVisible, setIsVisible] = useState(false)
    const [message_error, setMessageError] = useState("")

    const handleUpdateEmail = async (data) => {

        if(user?.account?.user?.statut == "PRESTATAIRE"){
           const res = await updatePresataire({data, prestataire_id: user?.account?.id})
           if(res.id){
                updateUser(res)
                setIsVisible(true)
           }
           else if(data.email == user?.account?.user?.email && !res.status){
            setIsVisible(true)
           }
           else{
            setMessageError("Cette adresse email est déjà utilisé")
           }
           
            
        }else {
            const res = await updateEtablissement({data, etablissement_id: user?.account?.id})
            if(res.id){
                updateUser(res)
            }
            if(data.email == user?.account?.gerant?.email){
                setIsVisible(true)
            }
            if(!res.status){
                setMessageError("Cette adresse email a déjà utilisé")
            }
        }
    }

    const handleCloseModal = () => {
        setIsVisible(false)
        navigation.goBack()
    }

    useEffect(() => {
        if(user?.account?.user?.statut == "PRESTATAIRE"){
            reset({
                email: user?.account?.user?.email,
            })
        }else{
            reset({
                email: user?.account?.gerant?.email,
            })
        }
        
    }, [])

    return (
        <Container title={"Modifier mon adresse email"}>
            <Controller
                control={control}
                render = {({field: {onChange, value}}) => (
                    <Input 
                        iconName={'Mail'} 
                        placeholder={"Email"}
                        onChangeText={(value) => onChange(value)}
                        keyboardType={"email-address"}
                        value={value}
                    />
                )}
                name='email'
                rules={{ required: true }}
            />
            {errors.email && <Text style={styles.error}>L'email est obligatoire</Text>}
            {message_error && <Text style={styles.error}>{message_error}</Text>}
            <Button 
                text='Enregistrer' 
                style={styles.btn} 
                onPress={handleSubmit(handleUpdateEmail)}
                isLoading={isLoadingUpdatePrestataire || isLoadingUpdateEtablissement}
            />
            <Alert 
                type={"success"}
                isVisible={isVisible}
                title={"Modification reussi"}
                subTitle={"Votre modification a bien été en compte"}
                onToggle={handleCloseModal}
            />
        </Container>
    );
};

//make this component available to the app
export default EditEmailScreen;
