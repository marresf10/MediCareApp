import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler'; // Importa Swipeable para manejar gestos

const { width } = Dimensions.get('window');

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

    const handleDelete = (id) => {
        Alert.alert(
            "Confirmar Eliminación",
            "¿Estás seguro de que deseas eliminar este medicamento?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    onPress: () => {
                        fetch(`https://medicare-api-khaki.vercel.app/api/medicamentos/${id}`, {
                            method: 'DELETE',
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(data => {
                            fetchMedications(); // Recargar la lista después de eliminar
                            //aqui quiero agregar mi alerta o mensaje
                        })
                        .catch(error => console.error('Error al eliminar medicamento:', error));
                    }
                }
            ],
            { cancelable: false }
        );
    };

    const renderRightActions = (id) => (
        <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(id)}
        >
            <Text style={styles.deleteButtonText}>Eliminar</Text>
        </TouchableOpacity>
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
                    medications.map((medication) => (
                        <Swipeable key={medication._id} renderRightActions={() => renderRightActions(medication._id)}>
                            <TouchableOpacity
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
                        </Swipeable>
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
        padding: 20,
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
    deleteButton: {
        backgroundColor: '#D9534F',
        justifyContent: 'center',
        alignItems: 'center',
        width: 140, 
        height: '100%',
        paddingHorizontal: 15,
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
