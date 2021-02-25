  import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useSelector } from 'react-redux';


const ProductsOverviewScreen = () => {
    const products = useSelector(state => state.products.availableProducts)     // App.js'de combineReducer kısmında productsReducer'ı "products" a atamıştık. "availableProducts" ise productsReducer.js'de ulaşmak istediğimiz kısım.

    return (
        <FlatList 
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => <Text>{itemData.item.title}</Text>}
        />
    )
}

export default ProductsOverviewScreen

const styles = StyleSheet.create({})