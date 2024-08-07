import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';
import { Calendar } from 'react-native-calendars';

export default function EditMedicament({ route, navigation }) {
    // Verifica los datos en route.params
    const { medication } = route.params;

    // Verifica si medication está definido
    if (!medication) {
        console.error('No se recibió ningún medicamento');
        return <View><Text>No se recibió ningún medicamento</Text></View>;
    }

    const [nombre, setNombre] = useState(medication.nombre);
    const [tipo, setTipo] = useState(medication.presentación);
    const [frecuenciaHoras, setFrecuenciaHoras] = useState(medication.frecuencia.hora || 0); // Default to 0 if undefined
    const [frecuenciaMinutos, setFrecuenciaMinutos] = useState(medication.frecuencia.minuto || 0); // Default to 0 if undefined
    const [dosis, setDosis] = useState(medication.dosis);
    const [cantidadDosis, setCantidadDosis] = useState(String(medication.cantidad_dosis_disponibles));
    const [proximaTomaFecha, setProximaTomaFecha] = useState(new Date(medication.proxima_toma.fecha).toISOString().split('T')[0]);
    const [proximaTomaHora, setProximaTomaHora] = useState(medication.proxima_toma.hora);
    const [proximaTomaMinuto, setProximaTomaMinuto] = useState(medication.proxima_toma.minuto);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Editar Medicamento',
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
        const updatedMedicament = {
            nombre,
            dosis,
            presentación: tipo,
            frecuencia: {
                hora: frecuenciaHoras,
                minuto: frecuenciaMinutos
            },
            proxima_toma: {
                fecha: proximaTomaFecha, // Ya está en formato YYYY-MM-DD
                hora: proximaTomaHora,
                minuto: proximaTomaMinuto
            },
            cantidad_dosis_disponibles: parseInt(cantidadDosis, 10)
        };
    
        const medicamentId = medication._id;
        if (!medicamentId) {
            console.error('Medicamento ID no encontrado');
            return;
        }
    
        fetch(`https://medicare-api-khaki.vercel.app/api/medicamentos/${medicamentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedMedicament),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta del servidor:', data);
            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'Medicamento Actualizado',
                text2: 'El medicamento se ha actualizado exitosamente.',
            });
            navigation.goBack();
        })
        .catch(error => {
            console.error('Error al actualizar medicamento:', error);
        });
    };

    const handleDateChange = (day) => {
        setProximaTomaFecha(day.dateString);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Medicamento:</Text>
            <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

            <Text style={styles.label}>Tipo de Medicamento:</Text>
            <Picker selectedValue={tipo} onValueChange={setTipo} style={styles.input}>
                <Picker.Item label="Pastilla" value="pastilla" />
                <Picker.Item label="Gotas" value="gotas" />
                <Picker.Item label="Polvo" value="polvo" />
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

            <Text style={styles.label}>Próxima Toma:</Text>
            <Text style={styles.label}>Fecha:</Text>
            <Calendar
                current={proximaTomaFecha}
                onDayPress={handleDateChange}
                markedDates={{ [proximaTomaFecha]: { selected: true, marked: true } }}
            />
            
            <Text style={styles.label}>Hora:</Text>
            <View style={styles.pickerContainer}>
                <Picker selectedValue={proximaTomaHora} onValueChange={setProximaTomaHora} style={styles.picker}>
                    {[...Array(24).keys()].map(hour => (
                        <Picker.Item key={hour} label={`${hour} horas`} value={hour} />
                    ))}
                </Picker>
                <Picker selectedValue={proximaTomaMinuto} onValueChange={setProximaTomaMinuto} style={styles.picker}>
                    {[...Array(60).keys()].map(minute => (
                        <Picker.Item key={minute} label={`${minute} minutos`} value={minute} />
                    ))}
                </Picker>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Guardar Cambios</Text>
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
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        fontSize: 16,
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    picker: {
        width: '48%',
        height: 50,
    },
    button: {
        backgroundColor: '#457B9D',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
