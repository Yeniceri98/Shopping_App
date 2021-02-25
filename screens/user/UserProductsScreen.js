import React from 'react'
import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/productsActions';


const UserProductsScreen = () => {
    const userProducts = useSelector(state => state.products.userProducts);     // Şimdilik sadece ownerId'nin u1 olduğu ürünleri listeler (productsReducer.js'de dummy bir şekilde oluşturmuştuk)

    const dispatch = useDispatch();

    return (
        <FlatList 
            data={userProducts}
            keyExtractor={item => item.id}      // models > products.js'den unique id aldık (Alttakileri de)
            renderItem={itemData => (
                <ProductItem 
                    image={itemData.item.imageURL}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onViewDetails={() => {}}
                    onAddToCart={() => {}}
                >
                    <Button 
                        color={Colors.primary} 
                        title="Edit" 
                        onPress={() => {

                        }} />
                    <Button 
                        color={Colors.primary}
                        title="Delete"
                        onPress={() => {
                            dispatch(productsActions.deleteProduct(itemData.item.id))
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