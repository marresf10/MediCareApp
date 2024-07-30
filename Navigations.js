import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feed from './screens/tabScreens/Feed';
import Medicaments from './screens/tabScreens/Medicaments';
import Settings from './screens/tabScreens/Settings';
import Home from './screens/tabScreens/HomeScreen';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from './screens/homeStack/DetailsScreen';

// Configuración del Stack Navigator
const Stack = createNativeStackNavigator();

function StackGroup() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="FeedMain"
                component={Feed} 
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Details"
                component={DetailScreen}
                options={({ route }) => ({
                    // Opciones para DetailsScreen
                })}
            />
        </Stack.Navigator>
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
                component={Medicaments}
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
