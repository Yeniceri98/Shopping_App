import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';


const ProductsOverviewScreen = (props) => {
    const products = useSelector(state => state.products.availableProducts);     // App.js'de combineReducer kısmında productsReducer'ı "products" a atamıştık. "availableProducts" ise productsReducer.js'de ulaşmak istediğimiz kısım.

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', {
            productId: id,              // "ProductDetails" sayfasına "productId" paramını yolladık
            productTitle: title         // Tıklanan ürünün adını navigation başlığında görebilmek için param yolluyoruz. Bu paramı ShopNavigator.js'in içindeki "options" kısmında alıyoruz
        })
    }

    return (
        <FlatList 
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem 
                    image={itemData.item.imageURL}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title)
                    }}
                    onViewDetails={() => {}}
                    onAddToCart={() => {}}
                />
            )}
        />
    )
}

export default ProductsOverviewScreen

const styles = StyleSheet.create({})