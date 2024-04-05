import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles'

const BookingStatusTag = ({ status }) => {
    const getStatusStyles = (status) => {
        let backgroundColor, statusText;
        switch (status) {
            case "DEMANDE":
                backgroundColor = "#FFA500"; // Orange
                statusText = "En attente";
                break;
            case "ACCECPTE":
                backgroundColor = "#4169E1"; // Bleu
                statusText = "En cours";
                break;
            case "PAYE_ET_TERMINE":
                backgroundColor = "#008000"; // Vert
                statusText = "Terminé";
                break;
            case "REFUSE":
                backgroundColor = "#FF0000"; // Rouge
                statusText = "Refusé";
                break;
            default:
                backgroundColor = "#000000"; // Noir
                statusText = "Statut inconnu";
                break;
        }
        return { backgroundColor, statusText };
    };

    const { backgroundColor, statusText } = getStatusStyles(status);

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={styles.title}>{statusText}</Text>
        </View>
    );
};

export default BookingStatusTag;
