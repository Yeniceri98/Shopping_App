import React from 'react'
import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/productsActions';


const UserProductsScreen = () => {
    const userProducts = useSelector(state => state.products.userProducts);     // Şimdilik sadece ownerId'nin u1 olduğu ürünleri listeler (productsReducer.js'de dummy bir şekilde oluşturmuştuk)

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
                />
            )}
        />
    )
}

export default UserProductsScreen

const styles = StyleSheet.create({})