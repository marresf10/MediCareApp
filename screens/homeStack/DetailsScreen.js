import React from 'react';
import { useRoute } from "@react-navigation/native";
import { SafeAreaView, Text, View, StyleSheet, StatusBar, Image } from "react-native";

const DetailScreen = () => {
    const {
        params: { product },
    } = useRoute();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={"light-content"} />
            <View style={styles.productContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.productTitle}>{product.title}</Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: product.image }} style={styles.productImage} />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.productTitle}>{"$"+product.price}</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.productDescription}>{product.description}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#59788E',
    },
    productContainer: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
        width: '100%',
        alignItems: 'center',
    },
    productImage: {
        width: 290,
        height: 400,
        borderRadius: 10,
    },
    titleContainer: {
        backgroundColor: '#cdcdcd',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
    productTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    descriptionContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
        width: '100%',
        height:220,
    },
    productDescription: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});

export default DetailScreen;
