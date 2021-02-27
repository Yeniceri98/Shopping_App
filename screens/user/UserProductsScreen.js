import React from 'react'
import { StyleSheet, Text, View, FlatList, Button, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/productsActions';


const UserProductsScreen = (props) => {
    const userProducts = useSelector(state => state.products.userProducts);     // Şimdilik sadece ownerId'nin u1 olduğu ürünleri listeler (productsReducer.js'de dummy bir şekilde oluşturmuştuk)

    const dispatch = useDispatch();

    const editProductHandler = (id) => {
        props.navigation.navigate('EditProductsScreen', {       // Touchable itemlere ve Edit butonuna basınca EditProductsScreen sayfasına yönlendirecek
            productId: id                                       // EditProductsScreen sayfasına "productId" adlı param'ı yolluyoruz. Param'ı ShopNavigator.js'de alacağız. Buradan aldığımız param sayesinde edit kısmında ilgili iteme ait özellikleri görüntüleyebiliyoruz
        })
    }

    const deleteHandler = (id) => {
        Alert.alert("Are you sure?", "Do you really want to delete this item?", 
        [
            { 
                text: "No", 
                style: "default"
            },
            { 
                text: "Yes", 
                state: "destructive", 
                onPress: () => {
                    dispatch(productsActions.deleteProduct(id))
                }   
            }
        ])
    }

    return (
        <FlatList 
            data={userProducts}
            keyExtractor={item => item.id}      // models > products.js'den unique id aldık (Alttakileri de)
            renderItem={itemData => (
                <ProductItem 
                    image={itemData.item.imageURL}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {                             // UserProducts sayfasındaki touchable itemlere yollanan prop. Onlardan birine tıklayınca bu fonksiyonu triggerlıyor
                        editProductHandler(itemData.item.id);
                    }}
                >
                    <Button 
                        color={Colors.primary} 
                        title="Edit" 
                        onPress={() => {
                            editProductHandler(itemData.item.id);
                        }} />
                    <Button 
                        color={Colors.primary}
                        title="Delete"
                        
                        // onPress={() => {
                        //     dispatch(productsActions.deleteProduct(itemData.item.id))
                        // }}

                        // NOT: Alert ekledikten sonra yukarıdaki satırı yoruma aldım
                        // Yukarıdaki "deleteHandler" fonksiyonuna 2 şekilde parametre yollayabiliriz:
                        
                        // 1. Yöntem
                        // onPress={deleteHandler.bind(this, itemData.item.id)}

                        // 2. Yöntem
                        onPress={() => {
                            deleteHandler(itemData.item.id)
                        }}
                    />
                </ProductItem>

                // İlk başta <ProductItem /> componenti self closing tag şeklindeydi
                // Sonrasında bunu değiştirdik çünkü <ProductItem /> daki butonların "Products" ve "User Products" sayfalarında farklı olmasını istedik
                // Bu yüzden ProductsOverviewScreen.js ve UserProductsScreen.js'de, <ProductItem /> componentinde farklı buton atamaları yaptık
            )}
        />
    )
}


export default UserProductsScreen

const styles = StyleSheet.create({})