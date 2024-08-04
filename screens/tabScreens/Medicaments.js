import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import MedicationListAll from '../components/MedicationListAll';

const { width, height } = Dimensions.get('window');

export default function Medicaments({ navigation }) {
    const [medications, setMedications] = useState([]);

    // Función para obtener medicamentos
    const fetchMedications = () => {
        fetch('https://medicare-api-khaki.vercel.app/api/medicamentos')
            .then(response => response.json())
            .then(data => setMedications(data))
            .catch(error => console.error('Error fetching medications:', error));
    };

    useEffect(() => {
        // Cargar medicamentos al montar el componente
        fetchMedications();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            // Actualizar la lista de medicamentos cuando la pantalla recibe el foco
            fetchMedications();
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.topBarText}>MediCare</Text>
                {medications.length > 0 && (
                    <TouchableOpacity 
                        style={styles.addButton}
                        onPress={() => navigation.navigate('AddMedicament')}
                    >
                        <Ionicons name="add" size={24} color="#fff" />
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.content}>
                {medications.length === 0 ? (
                    <>
                        <View style={styles.imageContainer}>
                            <Image 
                                source={{ uri: 'https://th.bing.com/th/id/OIP._JtdHaQZAUe8roEHR3qXfwHaHa?rs=1&pid=ImgDetMain' }} 
                                style={styles.image}
                            />
                        </View>
                        <Text style={styles.title}>Agrega tus medicamentos</Text>
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={() => navigation.navigate('AddMedicament')}
                        >
                            <Text style={styles.buttonText}>Agregar</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <MedicationListAll medications={medications} />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topBar: {
        backgroundColor: '#A8DADC',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topBarText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    addButton: {
        padding: 10,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    imageContainer: {
        width: width * 0.4,
        height: width * 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: (width * 0.4) / 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#457B9D',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
