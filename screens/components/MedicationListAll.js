import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const MedicationListAll = ({ medications }) => {
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.medicationName}>{item.nombre}</Text>
                <Text style={styles.medicationQuantity}>Cantidad Disponible: {item.cantidad_dosis_disponibles}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => console.log(`Editing ${item.nombre}`)}>
                <Text style={styles.buttonText}>  Editar  </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <FlatList
            data={medications}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.listContainer}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        flexGrow: 1,
        padding: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        width: width - 40,
    },
    textContainer: {
        flex: 1,
    },
    medicationName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    medicationQuantity: {
        fontSize: 16,
        color: '#888',
    },
    button: {
        backgroundColor: '#457B9D',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 30,
        marginRight: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default MedicationListAll;
