//import liraries
import Icon from '@components/ui/Icon';
import { colors } from '@themes/index';
import React, { Component, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// create a component
const AdresseInput = ({placeholder, setAdresse, setLocation, defaultValue}) => {

    const inpuRef = useRef()

    useEffect(() => {
        if(defaultValue){
            setTimeout(() => {
                inpuRef?.current?.getAddressText("test")
            }, 1000);
        }
    }, [])


    return (
            <View >
                <GooglePlacesAutocomplete
                    ref={inpuRef}
                    numberOfLines={7}
                    fetchDetails={true}
                    debounce={300}
                    currentLocationLabel={"defaultValue"}
                    placeholder={placeholder}
                    isRowScrollable={true}
                    renderLeftButton={() => <Icon name={"MapPin"} color={colors.BLACK} />}
                    nearbyPlacesAPI={"GooglePlacesSearch"}
                    query={{
                        key: "AIzaSyAFpAbTDluIMS4p9EnCNEGjJmcf64JDtx0",
                        language: 'fr',
                    }}
                    onPress={(data, details) => {
                        setAdresse(details.formatted_address)
                        setLocation(details.geometry.location)
                    }}
                    styles={{
                    textInputContainer: styles.container,
                    description: {
                        color: '#000',
                    },
                    textInput: styles.textInput,
                    predefinedPlacesDescription: {
                        color: '#1faadb',
                    },
                    }}
                />
            </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        zIndex: 2
    },
    container: {
        height: 50,
        borderWidth: 1,
        borderColor: colors.PRIMARY,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 25,
        paddingHorizontal: 10
    },
    textInput: {
        height: 50,
        color: '#5d5d5d',
        fontSize: 16,
        backgroundColor: 'transparent',
        borderRadius: 10,
        flex: 1,
    }
});

//make this component available to the app
export default AdresseInput;
