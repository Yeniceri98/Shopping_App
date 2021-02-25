import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import Colors from '../constants/colors';


const Stack = createStackNavigator();

export const ProductsNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{        // Bu navigator'a ait tüm ekranlar için template niteliğindedir
                headerStyle: {
                    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
                },
                headerTintColor: Platform.OS === 'android' ? "white" : Colors.primary,
                headerTitleStyle: {
                    fontSize: 22,
                    fontWeight: "bold",
                }
            }}
        >
            <Stack.Screen 
                name="ProductsOverviewScreen"
                component={ProductsOverviewScreen}
                options={{
                    title: "Products"       // Tab ismini bu şekilde değiştirebiliriz
                }}
            />
        </Stack.Navigator>
    )
}