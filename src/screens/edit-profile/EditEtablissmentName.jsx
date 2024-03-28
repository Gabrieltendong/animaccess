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
const EditEtablissementNameScreen = ({navigation}) => {

    const { user, updateUser } = useUserStore()
    const {mutateAsync: updateEtablissement, isLoading: isLoadingUpdateEtablissement } = useMutation(update_etablissement)
    const { handleSubmit, control,reset, formState: { errors } } = useForm();
    const [isVisible, setIsVisible] = useState(false) 

    const handleUpdateName = async (data) => {
        const res = await updateEtablissement({data, etablissement_id: user?.account?.id})
        updateUser(res)
        setIsVisible(true)
    }

    const handleCloseModal = () => {
        setIsVisible(false)
        navigation.goBack()
    }

    useEffect(() => {
        reset({
            etablissement_name: user?.account?.name,
        })
    }, [])

    return (
        <Container showBackButton={true} title={"Modifier le nom de l'etablissement"}>
            <Controller
                control={control}
                render = {({field: {onChange, value}}) => (
                    <Input 
                        iconName={'Home'} 
                        placeholder={"Nom de l'etablissement"}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                    />
                )}
                name='etablissement_name'
                rules={{ required: true }}
            />
            {errors.etablissement_name && <Text style={styles.error}>Le nom de l'etablissement est obligatoire</Text>}
            <Button 
                text='Enregistrer' 
                style={styles.btn} 
                onPress={handleSubmit(handleUpdateName)}
                isLoading={isLoadingUpdateEtablissement}
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
export default EditEtablissementNameScreen;
