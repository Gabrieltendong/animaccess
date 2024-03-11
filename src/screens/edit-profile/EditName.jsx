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
const EditNameScreen = ({navigation}) => {

    const { user, updateUser } = useUserStore()
    const {mutateAsync: updatePresataire, isLoading: isLoadingUpdatePrestataire } = useMutation(update_prestataire)
    const {mutateAsync: updateEtablissement, isLoading: isLoadingUpdateEtablissement } = useMutation(update_etablissement)
    const { handleSubmit, control,reset, formState: { errors } } = useForm();
    const [isVisible, setIsVisible] = useState(false) 

    const handleUpdateName = async (data) => {

        if(user?.account?.user?.statut == "PRESTATAIRE"){
           const res = await updatePresataire({data, prestataire_id: user?.account?.id})
            updateUser(res)
            setIsVisible(true)
        }else {
            const res = await updateEtablissement({data, etablissement_id: user?.account?.id})
            updateUser(res)
            setIsVisible(true)
        }
    }

    const handleCloseModal = () => {
        setIsVisible(false)
        navigation.goBack()
    }

    useEffect(() => {
        if(user?.account?.user?.statut == "PRESTATAIRE"){
            reset({
                name: user?.account?.user?.name,
                lastname: user?.account?.user?.lastname
            })
        }else{
            reset({
                name: user?.account?.gerant?.name,
                lastname: user?.account?.gerant?.lastname
            })
        }
        
    }, [])

    return (
        <Container title={"Modifier mon nom"}>
            <Controller
                control={control}
                render = {({field: {onChange, value}}) => (
                    <Input 
                        iconName={'UserRound'} 
                        placeholder={"Nom"}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                    />
                )}
                name='name'
                rules={{ required: true }}
            />
            {errors.name && <Text style={styles.error}>Le nom est obligatoire</Text>}
            <Controller
                control={control}
                render = {({field: {onChange, value}}) => (
                    <Input 
                        iconName={'UserRound'} 
                        placeholder={"Prénom"}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                    />
                )}
                name='lastname'
                rules={{ required: false }}
            />
            <Button 
                text='Enregistrer' 
                style={styles.btn} 
                onPress={handleSubmit(handleUpdateName)}
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
export default EditNameScreen;
