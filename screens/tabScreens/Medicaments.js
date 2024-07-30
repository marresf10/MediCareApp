import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Medicaments() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.topBarText}>MediCare</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.imageContainer}>
                    {/* Puedes reemplazar el URI con la imagen deseada */}
                    <Image 
                        source={{ uri: 'https://th.bing.com/th/id/OIP._JtdHaQZAUe8roEHR3qXfwHaHa?rs=1&pid=ImgDetMain' }} 
                        style={styles.image}
                    />
                </View>
                <Text style={styles.title}>Añade tus medicamentos</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>   Agregar   </Text>
                </TouchableOpacity>
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
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    topBarText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    imageContainer: {
        width: width * 0.4, // 40% of screen width
        height: width * 0.4, // Maintain aspect ratio
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: '100%', // Take full width of the container
        height: '100%', // Take full height of the container
        borderRadius: (width * 0.4) / 2, // Circular image
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#457B9D',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25, // A larger borderRadius for more rounded corners
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
