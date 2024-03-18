//import liraries
import Container from '@components/common/Container';
import React, { Component, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { styles } from './styles';
import Input from '@components/ui/Input';
import { colors } from '@themes/index';
import Button from '@components/ui/Button';
import Alert from '@components/Alert';
import { useMutation } from 'react-query';
import { create_sav } from 'src/feature/sav/sav.service';
import { useUserStore } from 'src/store/user.store';

// create a component
const HelpScreen = ({navigation}) => {

    const {user} = useUserStore()
    const { handleSubmit, control, setValue, formState: { errors } } = useForm();
    const [isVisibleModal, setIsVisibleModal] = useState(false)
    const {mutateAsync: createSav, isLoading} = useMutation(create_sav)

    const handleSendHelp = async (data) => {
        const dataForm = {...data, sender: user?.account?.user?user?.account?.user?.id: user?.account?.gerant?.id}
        const res = await createSav(dataForm)
        if(res.id){
            setIsVisibleModal(true)
        }
    }

    const handleCloseModal = () => {
        setIsVisibleModal(false)
        navigation.goBack()
    }

    return (
        <Container style={styles.container} title={"Besoin d'assistance ?"}>
            <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                    <Input
                        iconName={"BadgeHelp"}
                        placeholder="Titre du besoin"
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name='title'
                rules={{required: true}}
            />
            {errors.title && <Text style={styles.error}>Le titre du besoin est obligatoire</Text>}
            <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                    <TextInput
                        placeholder='Donner une description de votre besoin'
                        onChangeText={onChange}
                        numberOfLines={4}
                        multiline={true}
                        style={styles.text_area}
                        value={value}
                        placeholderTextColor={colors.GRAY}
                    />
                )}
                name='message'
                rules={{required: true}}
            />
            {errors.message && <Text style={styles.error}>Le message est obligatoire</Text>}
            <Button 
                text='Envoyer' 
                onPress={handleSubmit(handleSendHelp)}
                isLoading={isLoading} 
            />
            <Alert
                type={"success"}
                title={"Demande d'assistance"}
                subTitle={"Votre demande d'assistance a bien été envoyé, Nous vous repondrons au plus vite"}
                isVisible={isVisibleModal}
                onToggle={handleCloseModal}
            />
        </Container>
    );
};

//make this component available to the app
export default HelpScreen;
