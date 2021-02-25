import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';


const Stack = createStackNavigator();

export const ProductsNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{        // Bu navigator'a ait tüm screenler için template niteliğindedir
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

            <Stack.Screen 
                name="ProductDetailsScreen"
                component={ProductDetailsScreen}
                options={({ route }) => ({ title: route.params.productTitle })}     // ProductsOverviewScreen.js'den aldığımız "productTitle" paramıyla dinamik bir başlık elde ettik
            />
        </Stack.Navigator>
    )
}