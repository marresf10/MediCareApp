import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function AddMedicament({ navigation }) {
    const [nombre, setNombre] = useState('');
    const [tipo, setTipo] = useState('pastilla');
    const [frecuenciaHoras, setFrecuenciaHoras] = useState(0);
    const [frecuenciaMinutos, setFrecuenciaMinutos] = useState(0);
    const [dosis, setDosis] = useState('');
    const [cantidadDosis, setCantidadDosis] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Agregar Medicamento',
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: '#A8DADC',
            },
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        });
    }, [navigation]);

    const handleSave = () => {
        const now = new Date();
        const fechaActual = now.toISOString().split('T')[0];
        const horaActual = now.getHours();
        const minutoActual = now.getMinutes();

        const proximaToma = new Date(now);
        proximaToma.setHours(proximaToma.getHours() + frecuenciaHoras);
        proximaToma.setMinutes(proximaToma.getMinutes() + frecuenciaMinutos);

        const fechaProximaToma = proximaToma.toISOString().split('T')[0];
        const horaProximaToma = proximaToma.getHours();
        const minutoProximaToma = proximaToma.getMinutes();

        const newMedicament = {
            nombre,
            dosis,
            presentación: tipo,
            frecuencia: {
                horas: [frecuenciaHoras],
                minutos: [frecuenciaMinutos]
            },
            proxima_toma: {
                fecha: fechaProximaToma,
                hora: horaProximaToma,
                minuto: minutoProximaToma
            },
            cantidad_dosis_disponibles: parseInt(cantidadDosis, 10)
        };

        fetch('https://medicare-api-khaki.vercel.app/api/medicamentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMedicament),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Medicamento agregado:', data);
            Alert.alert(
                'Medicamento Agregado',
                'El medicamento se ha guardado exitosamente.',
                [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
        })
        .catch(error => {
            console.error('Error al agregar medicamento:', error);
            Alert.alert(
                'Error',
                'Hubo un problema al agregar el medicamento.',
                [{ text: 'OK' }]
            );
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Medicamento:</Text>
            <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

            <Text style={styles.label}>Tipo de Medicamento:</Text>
            <Picker selectedValue={tipo} onValueChange={setTipo} style={styles.input}>
                <Picker.Item label="Pastilla" value="pastilla" />
                <Picker.Item label="Polvo" value="polvo" />
                <Picker.Item label="Gotas" value="gotas" />
            </Picker>

            <Text style={styles.label}>Frecuencia (Horas y Minutos):</Text>
            <View style={styles.pickerContainer}>
                <Picker selectedValue={frecuenciaHoras} onValueChange={setFrecuenciaHoras} style={styles.picker}>
                    {[...Array(24).keys()].map(hour => (
                        <Picker.Item key={hour} label={`${hour} horas`} value={hour} />
                    ))}
                </Picker>
                <Picker selectedValue={frecuenciaMinutos} onValueChange={setFrecuenciaMinutos} style={styles.picker}>
                    {[...Array(60).keys()].map(minute => (
                        <Picker.Item key={minute} label={`${minute} minutos`} value={minute} />
                    ))}
                </Picker>
            </View>

            <Text style={styles.label}>Dosis (ej: 500gr):</Text>
            <TextInput style={styles.input} value={dosis} onChangeText={setDosis} />

            <Text style={styles.label}>Cantidad de Dosis Disponibles:</Text>
            <TextInput style={styles.input} value={cantidadDosis} onChangeText={setCantidadDosis} keyboardType="numeric" />

            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    picker: {
        flex: 1,
        height: 50,
    },
    button: {
        backgroundColor: '#457B9D',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        alignSelf: 'center',
        width: '50%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
