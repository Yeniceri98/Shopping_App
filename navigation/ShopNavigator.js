import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/UI/CustomHeaderButton';
import Colors from '../constants/Colors';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';


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
                options={({ navigation }) => ({
                    title: "Products",       // Tab ismini bu şekilde değiştirebiliriz
                    headerRight: () => (
                        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                            <Item 
                                title="Cart"
                                iconName="md-cart"
                                onPress={() => {
                                    navigation.navigate('CartScreen')       // Sağ üstteki simgeye tıklayınca "CartScreen" sayfasına yönlendirme yapacak
                                }}      
                            />
                        </HeaderButtons>
                    ),
                })}
            />

            <Stack.Screen 
                name="ProductDetail"
                component={ProductDetailsScreen}
                options={({ route }) => ({ title: route.params.productTitle })}     // ProductsOverviewScreen.js'den aldığımız "productTitle" paramıyla dinamik bir başlık elde ettik
            />

            <Stack.Screen 
                name="CartScreen" 
                component={CartScreen} 
                options={{
                    title: "Products",
                }}     
            />
        </Stack.Navigator>
    )
}