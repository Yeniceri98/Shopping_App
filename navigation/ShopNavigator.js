import React from 'react';
import { useWindowDimensions, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/UI/CustomHeaderButton';
import Colors from '../constants/Colors';
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductsScreen from '../screens/user/EditProductsScreen';


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
                    headerLeft: () => (
                        <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
                            <Item 
                                title="Menu"
                                iconName="menu"
                                onPress={() => {
                                    navigation.openDrawer()     // Drawer sekmesini açar
                                }}
                            />
                        </HeaderButtons>
                    )
                })}
            />

            <Stack.Screen 
                name="ProductDetailsScreen"
                component={ProductDetailsScreen}
                options={({ route }) => ({ title: route.params.productTitle })}     // ProductsOverviewScreen.js'den aldığımız "productTitle" paramıyla dinamik bir başlık elde ettik
            />

            <Stack.Screen 
                name="CartScreen" 
                component={CartScreen} 
                options={{
                    title: "Cart",
                }}     
            />
        </Stack.Navigator>
    )
}


// 2. bir Stack Navigator oluşturuyoruz. Sonrasında Stack Navigator'ları, Drawer Navigator'a atayacağız
export const OrdersNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.primary
                },
                headerTintColor: "white",
                headerTitleStyle: {
                    fontSize: 22,
                    fontWeight: "bold",
                }
            }}
        >
            <Stack.Screen 
                name="OrdersScreen"
                component={OrdersScreen}
                options={({ navigation }) => ({
                    title: "Orders",
                    headerLeft: () => (
                        <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
                            <Item 
                                title="Menu"
                                iconName="menu"
                                onPress={() => {
                                    navigation.openDrawer()     
                                }}
                            />
                        </HeaderButtons>
                    ),
                    
                })}
            />
        </Stack.Navigator>
    )
}


// UserProductsScreen ve EditProductsScreen sayfalarını atayacağız. Bunu da Drawer Navigator'a atadık
export const AdminNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.primary
                },
                headerTintColor: "white",
                headerTitleStyle: {
                    fontSize: 22,
                    fontWeight: "bold",
                }
            }}
        >
            <Stack.Screen 
                name="UserProductsScreen"
                component={UserProductsScreen}
                options={({ navigation }) => ({
                    title: "User Products",
                    headerLeft: () => (
                        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                            <Item 
                                title="Menu"
                                iconName="menu"
                                onPress={() => {
                                    navigation.openDrawer()     
                                }}
                            />
                        </HeaderButtons>
                    ),
                    headerRight: () => (
                        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                            <Item 
                                title="Create"
                                iconName="create"
                                onPress={() => {
                                    navigation.navigate('EditProductsScreen', {     
                                        productId: id       // Aşağı kısma UserProductsScreen.js'den alınan "productId" paramını yolluyoruz
                                    });     
                                }}
                            />
                        </HeaderButtons>
                    ),
                    
                })}
            />
            <Stack.Screen  
                name="EditProductsScreen"     
                component={EditProductsScreen}
                options={({ route }) => ({ title: route.params.productId,          // Dinamik bir başlık elde etmek için, UserProductsScreen.js'den "productId" adlı param aldık       
                    headerRight: () => (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item 
                            title="Check mark"
                            iconName="md-checkmark"
                            onPress={() => {
                                console.log("Submitted")
                            }}
                        />
                    </HeaderButtons>
                )})}      
    
            />
        </Stack.Navigator>
    )
}


const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
    const dimensions = useWindowDimensions();      // Alttaki "drawerType" kısmında kullanacağız. En yukarıda da import ettik. NOT: Ekstra property bilgisidir, kullanılması şart değil. Cihaz boyutu 768'den büyükse "permanent" küçükse "slide" draweType'ını kullanacak

    return (
        <Drawer.Navigator
            initialRouteName="ProductsOverviewScreen"
            drawerType={dimensions.width >= 768 ? "permanent" : "slide"}        // permanent'ta drawer navigator direkt açık şekilde geliyor ve kapanmıyor
            drawerStyle={{
                backgroundColor: "lavender",
                width: 220      // Açılan navigasyonun boyutu
            }}
        >
            <Drawer.Screen 
                name="ProductsOverview" 
                component={ProductsNavigator}
                options={{
                    title: "Products",
                    drawerIcon: config => <Fontisto name="product-hunt" size={24} color="black" />
                }}
            />
            <Drawer.Screen 
                name="OrdersScreen" 
                component={OrdersNavigator} 
                options={{
                    title: "Orders",
                    drawerIcon: config => <AntDesign name="shoppingcart" size={24} color="black" />
                }}
            />
            <Drawer.Screen 
                name="UserProductsScreen"
                component={AdminNavigator}
                options={{
                    title: "User Products",
                    drawerIcon: config => <AntDesign name="user" size={24} color="black" />
                }}
            />
        </Drawer.Navigator>
    )
}