import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Switch, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function Settings() {
    const [isDarkMode, setIsDarkMode] = useState(false); // Estado para manejar el tema

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode); // Alternar entre claro y oscuro
    };

    return (
        <SafeAreaView style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
            <View style={styles.topBar}>
                <Text style={[styles.topBarText, isDarkMode ? styles.darkTopBarText : styles.lightTopBarText]}>
                    Configuración
                </Text>
            </View>
            <View style={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Idioma</Text>
                    <TouchableOpacity style={[styles.option, isDarkMode && styles.darkOption]}>
                        <Text style={[styles.optionText, isDarkMode && styles.darkOptionText]}> Español </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.option, isDarkMode && styles.darkOption]}>
                        <Text style={[styles.optionText, isDarkMode && styles.darkOptionText]}> Inglés </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Notificaciones</Text>
                    <View style={[styles.option, isDarkMode && styles.darkOption]}>
                        <Text style={[styles.optionText, isDarkMode && styles.darkOptionText]}>
                            Recibir notificaciones
                        </Text>
                        <Switch value={true} onValueChange={() => { /* Cambiar estado de notificación */ }} />
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Tema</Text>
                    <TouchableOpacity style={[styles.option, isDarkMode && styles.darkOption]} onPress={toggleTheme}>
                        <Text style={[styles.optionText, isDarkMode && styles.darkOptionText]}>
                            {isDarkMode ? 'Modo claro' : 'Modo oscuro'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    lightContainer: {
        backgroundColor: '#F5F5F5',
    },
    darkContainer: {
        backgroundColor: '#333',
    },
    topBar: {
        backgroundColor: '#A8DADC',
        padding: 15,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    topBarText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    lightTopBarText: {
        color: '#000',
    },
    darkTopBarText: {
        color: '#FFF',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD',
    },
    lightOption: {
        backgroundColor: '#FFF',
    },
    darkOption: {
        backgroundColor: '#555',
    },
    optionText: {
        fontSize: 16,
    },
    lightOptionText: {
        color: '#000',
    },
    darkOptionText: {
        color: '#FFF',
    },
});
