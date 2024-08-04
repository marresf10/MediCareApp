import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function AddMedicament({ navigation }) {
    const [nombre, setNombre] = useState('');
    const [tipo, setTipo] = useState('pastilla');
    const [frecuenciaHoras, setFrecuenciaHoras] = useState(0);
    const [frecuenciaMinutos, setFrecuenciaMinutos] = useState(0);

    const handleSave = () => {
        console.log(`Nombre: ${nombre}, Tipo: ${tipo}, Frecuencia: ${frecuenciaHoras} horas y ${frecuenciaMinutos} minutos`);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nombre del Medicamento:</Text>
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

            <Button title="Guardar" onPress={handleSave} />
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
        marginVertical: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
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
});
