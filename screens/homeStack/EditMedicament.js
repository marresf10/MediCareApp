import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Calendar } from 'react-native-calendars';

export default function EditMedicament({ route, navigation }) {
    const { medication } = route.params;

    if (!medication) {
        console.error('No se recibió ningún medicamento');
        return <View style={styles.errorContainer}><Text style={styles.errorText}>No se recibió ningún medicamento</Text></View>;
    }

    const [nombre, setNombre] = useState(medication.nombre);
    const [tipo, setTipo] = useState(medication.presentación);
    const [frecuenciaHoras, setFrecuenciaHoras] = useState(medication.frecuencia.hora || 0);
    const [frecuenciaMinutos, setFrecuenciaMinutos] = useState(medication.frecuencia.minuto || 0);
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

    useEffect(() => {
        console.log('Medicament:', medication);
        console.log('Frecuencia Horas:', frecuenciaHoras);
        console.log('Frecuencia Minutos:', frecuenciaMinutos);
    }, []);

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
                fecha: proximaTomaFecha,
                hora: proximaTomaHora,
                minuto: proximaTomaMinuto
            },
            cantidad_dosis_disponibles: parseInt(cantidadDosis, 10)
        };

        console.log('Datos a enviar:', updatedMedicament);

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
            Alert.alert(
                'Medicamento Editado',
                'El medicamento se ha actualizado exitosamente.',
                [{ text: 'OK', onPress: () => navigation.goBack() }],
                {
                    cancelable: false,
                    backgroundColor: '#DCD6D6',
                    borderRadius: 10,
                    padding: 15,
                }
            );
        })
        .catch(error => {
            console.error('Error al actualizar medicamento:', error);
            Alert.alert(
                'Error',
                'Hubo un problema al actualizar el medicamento.',
                [{ text: 'OK' }],
                {
                    cancelable: false,
                    backgroundColor: '#DCD6D6',
                    borderRadius: 10,
                    padding: 15,
                }
            );
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
            <View style={styles.pickerWrapper}>
                <Picker selectedValue={tipo} onValueChange={setTipo} style={styles.picker}>
                    <Picker.Item label="Pastilla" value="pastilla" />
                    <Picker.Item label="Gotas" value="gotas" />
                    <Picker.Item label="Polvo" value="polvo" />
                </Picker>
            </View>

            <Text style={styles.label}>Frecuencia (Horas y Minutos):</Text>
            <View style={styles.pickerContainer}>
                <View style={styles.pickerWrapper}>
                    <Picker selectedValue={frecuenciaHoras} onValueChange={setFrecuenciaHoras} style={styles.picker}>
                        {[...Array(24).keys()].map(hour => (
                            <Picker.Item key={hour} label={`${hour} horas`} value={hour} />
                        ))}
                    </Picker>
                </View>
                <View style={styles.pickerWrapper}>
                    <Picker selectedValue={frecuenciaMinutos} onValueChange={setFrecuenciaMinutos} style={styles.picker}>
                        {[...Array(60).keys()].map(minute => (
                            <Picker.Item key={minute} label={`${minute} minutos`} value={minute} />
                        ))}
                    </Picker>
                </View>
            </View>

            <Text style={styles.label}>Próxima Toma:</Text>
            <Text style={styles.label}>Fecha:</Text>
            <Calendar
                current={proximaTomaFecha}
                onDayPress={handleDateChange}
                markedDates={{ [proximaTomaFecha]: { selected: true, marked: true } }}
                style={styles.calendar}
                theme={{
                    selectedDayBackgroundColor: '#457B9D',
                    todayTextColor: '#457B9D',
                    arrowColor: '#457B9D',
                }}
            />
            
            <Text style={styles.label}>Hora:</Text>
            <View style={styles.pickerContainer}>
                <View style={styles.pickerWrapper}>
                    <Picker selectedValue={proximaTomaHora} onValueChange={setProximaTomaHora} style={styles.picker}>
                        {[...Array(24).keys()].map(hour => (
                            <Picker.Item key={hour} label={`${hour} horas`} value={hour} />
                        ))}
                    </Picker>
                </View>
                <View style={styles.pickerWrapper}>
                    <Picker selectedValue={proximaTomaMinuto} onValueChange={setProximaTomaMinuto} style={styles.picker}>
                        {[...Array(60).keys()].map(minute => (
                            <Picker.Item key={minute} label={`${minute} minutos`} value={minute} />
                        ))}
                    </Picker>
                </View>
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
    pickerWrapper: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#f9f9f9',
        marginRight: 10,
    },
    picker: {
        width: '100%',
        height: 50,
    },
    calendar: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#457B9D',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 20,
        width: '50%',
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
