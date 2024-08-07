import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';

const { width, height } = Dimensions.get('window');

export default function Medicaments({ navigation }) {
    const [medications, setMedications] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    const fetchMedications = () => {
        fetch('https://medicare-api-khaki.vercel.app/api/medicamentos')
            .then(response => response.json())
            .then(data => setMedications(data))
            .catch(error => console.error('Error fetching medications:', error));
    };

    useEffect(() => {
        fetchMedications();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchMedications();
        }, [])
    );

    const getImageForType = (type) => {
        switch (type) {
            case 'pastilla':
                return 'https://th.bing.com/th/id/R.fd24f4923474d9f8a1535899e84a9bda?rik=IdyanhYKmGK2rA&pid=ImgRaw&r=0';
            case 'gotas':
                return 'https://cdn-icons-png.flaticon.com/512/4465/4465359.png';
            case 'polvo':
                return 'https://media.istockphoto.com/id/1270354543/es/vector/ilustraci%C3%B3n-de-la-apertura-del-medicamento-en-polvo-de-naranja.jpg?s=170667a&w=0&k=20&c=3GhgiV8k1kaGQgk3E19nvcXEhA1HWdjTTHHztEkCQeg=';
            default:
                return '';
        }
    };

    const formatFrequency = (frecuencia) => {
        const hours = (frecuencia.horas && frecuencia.horas.length > 0) ? frecuencia.horas[0] : 0;
        const minutes = (frecuencia.minutos && frecuencia.minutos.length > 0) ? frecuencia.minutos[0] : 0;
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    };

    const handleDateChange = (day) => {
        setSelectedDate(day.dateString);
    };

    const handleSave = () => {
        console.log('Fecha seleccionada:', selectedDate);
        // Aquí deberías enviar la fecha seleccionada al backend o al estado correspondiente
    };

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
                    medications.map((medication) => (
                        <TouchableOpacity
                            key={medication._id}
                            style={styles.medicationContainer}
                            onPress={() => navigation.navigate('EditMedicament', { medication })}
                        >
                            <Image
                                source={{ uri: getImageForType(medication.presentación) }}
                                style={styles.medicationImage}
                            />
                            <View style={styles.medicationInfo}>
                                <Text style={styles.medicationName}>{medication.nombre}</Text>
                                <Text style={styles.medicationFrequency}>Frecuencia: {formatFrequency(medication.frecuencia)}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
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
    medicationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20, // Increased padding for a larger height
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    medicationInfo: {
        marginLeft: 10,
        flex: 1,
    },
    medicationName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    medicationFrequency: {
        fontSize: 14,
        color: '#666',
    },
    medicationImage: {
        width: 50,
        height: 50,
    },
});
