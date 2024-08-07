import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import Feed from './screens/tabScreens/Feed';
import Medicaments from './screens/tabScreens/Medicaments';
import AddMedicament from './screens/homeStack/AddMedicament';
import EditMedicament from './screens/homeStack/EditMedicament';
import Settings from './screens/tabScreens/Settings';
import Home from './screens/tabScreens/HomeScreen';
import DetailScreen from './screens/homeStack/DetailsScreen';

const FeedStack = createNativeStackNavigator();

function FeedStackGroup() {
    return (
        <FeedStack.Navigator>
            <FeedStack.Screen 
                name="FeedMain"
                component={Feed} 
                options={{ headerShown: false }}
            />
            <FeedStack.Screen
                name="Details"
                component={DetailScreen}
            />
        </FeedStack.Navigator>
    );
}

const MedicamentsStack = createNativeStackNavigator();

function MedicamentsStackGroup() {
    return (
        <MedicamentsStack.Navigator>
            <MedicamentsStack.Screen 
                name="MedicamentsMain"
                component={Medicaments} 
                options={{ headerShown: false }}
            />
            <MedicamentsStack.Screen 
                name="AddMedicament"
                component={AddMedicament}
                options={{ title: 'Agregar Medicamento' }}
            />
            <MedicamentsStack.Screen 
                name="EditMedicament"
                component={EditMedicament}
                options={{ title: 'Editar Medicamento' }}
            />
        </MedicamentsStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

function TabGroup() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: { backgroundColor: '#DCD6D6' },
                tabBarLabelStyle: { fontSize: 14 },
                tabBarActiveTintColor: '#457B9D',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
                tabBarIcon: ({ color }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Medicaments') {
                        iconName = 'notifications';
                    } else if (route.name === 'Settings') {
                        iconName = 'settings';
                    }
                    return <Ionicons name={iconName} size={28} color={color} />;
                },
            })}
        >
            <Tab.Screen 
                name="Home" 
                component={Home}
                options={{ tabBarLabel: "Home" }}
            />
            <Tab.Screen 
                name="Medicaments" 
                component={MedicamentsStackGroup}
                options={{ tabBarLabel: "Medicaments" }}
            />
            <Tab.Screen 
                name="Settings" 
                component={Settings}
                options={{ tabBarLabel: "Settings" }}
            />
        </Tab.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <TabGroup />
        </NavigationContainer>
    );
}
