//import liraries
import React, { Component, useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { useForm } from 'react-hook-form';
import SelectDropdown from 'react-native-select-dropdown'

import { styles } from './styles';
import Container from '@components/common/Container';
import { useUserStore } from 'src/store/user.store';
import Button from '@components/ui/Button';
import { useMutation } from 'react-query';
import { update_etablissement } from 'src/feature/auth/auth.service';
import Alert from '@components/Alert';
import { useTypeEtablissement } from 'src/feature/type_etablissement/useTypeEtablissement';
import Icon from '@components/ui/Icon';
import { colors } from '@themes/index';

// create a component
const EditTypeEtablissementScreen = ({navigation}) => {

    const dropdownRef = useRef({}); 
    const { user, updateUser } = useUserStore()
    const {mutateAsync: updateEtablissement, isLoading: isLoadingUpdateEtablissement } = useMutation(update_etablissement)
    const { handleSubmit, control,reset, formState: { errors } } = useForm();
    const [isVisible, setIsVisible] = useState(false) 
    const {data: listTypeEtablissement, isLoading, isError} = useTypeEtablissement()
    const [type_etablissement, setTypeEtablissement] = useState()
    const [error_type_etablissement, setErrorTypeEtablissement] = useState("")

    const handleUpdateName = async () => {
        const data = {
            type_etablissement
        }
        console.log("type data", data)
        const res = await updateEtablissement({data, etablissement_id: user?.account?.id})
        updateUser(res)
        setIsVisible(true)
    }

    console.log("type_etablissement", type_etablissement)

    const handleCloseModal = () => {
        setIsVisible(false)
        navigation.goBack()
    }

    useEffect(() => {
        if(Array.isArray(listTypeEtablissement?.results)){
            const index = listTypeEtablissement.results.findIndex(item => item.id == user?.account?.type_etablissement?.id)
            dropdownRef?.current?.selectIndex(index)
        }
        setTypeEtablissement(user?.account?.type_etablissement?.id)
    }, [listTypeEtablissement])

    return (
        <Container showBackButton={true} title={"Modifier le type de l'établissement"}>
            <View style={styles.input_select_wrapper}>
                <SelectDropdown
                    ref={dropdownRef}
                    buttonStyle={styles.input_select}
                    defaultButtonText={"Choisir le type de l'etablissement"}
                    defaultValue={type_etablissement}
                    onSelect={(item) => {
                        return {
                            ...setTypeEtablissement(item.id),
                            ...setErrorTypeEtablissement('')
                        }
                    }}
                    data={listTypeEtablissement?.results}
                    buttonTextAfterSelection={(item, index) => {
                        return item.name
                    }}
                    buttonTextStyle={styles.buttonTextStyle}
                    rowTextForSelection={(item, index) => <Text>{item.name}</Text>}
                    renderDropdownIcon={() => <Icon name={"ChevronDown"} color={colors.WHITE}/>}
                />
            </View>
            {error_type_etablissement && <Text style={styles.error}>{error_type_etablissement}</Text>}
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
export default EditTypeEtablissementScreen;
