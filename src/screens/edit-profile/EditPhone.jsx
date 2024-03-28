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
const EditPhoneScreen = ({navigation}) => {

    const { user, updateUser } = useUserStore()
    const {mutateAsync: updatePresataire, isLoading: isLoadingUpdatePrestataire } = useMutation(update_prestataire)
    const {mutateAsync: updateEtablissement, isLoading: isLoadingUpdateEtablissement } = useMutation(update_etablissement)
    const { handleSubmit, control,reset, formState: { errors } } = useForm();
    const [isVisible, setIsVisible] = useState(false)

    const handleUpdatePhone = async (data) => {

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
                telephone: user?.account?.user?.telephone,
            })
        }else{
            reset({
                telephone: user?.account?.gerant?.telephone,
            })
        }
        
    }, [])

    return (
        <Container showBackButton={true} title={"Modifier mon numéro de téléphone"}>
            <Controller
                control={control}
                render = {({field: {onChange, value}}) => (
                    <Input 
                        iconName={'Phone'} 
                        placeholder={"Téléphone"}
                        onChangeText={(value) => onChange(value)}
                        keyboardType={"phone-pad"}
                        value={value}
                    />
                )}
                name='telephone'
                rules={{ required: true }}
            />
            {errors.telephone && <Text style={styles.error}>Le téléphone est obligatoire</Text>}
            <Button 
                text='Enregistrer' 
                style={styles.btn} 
                onPress={handleSubmit(handleUpdatePhone)}
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
export default EditPhoneScreen;
