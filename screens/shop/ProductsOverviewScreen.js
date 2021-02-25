import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';


const ProductsOverviewScreen = (props) => {
    const products = useSelector(state => state.products.availableProducts);     // App.js'de combineReducer kısmında productsReducer'ı "products" a atamıştık. "availableProducts" ise productsReducer.js'de ulaşmak istediğimiz kısım.

    return (
        <FlatList 
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem 
                    image={itemData.item.imageURL}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onViewDetails={() => {
                        props.navigation.navigate('ProductDetailscreen', {
                            productId: itemData.item.id,              // "ProductDetails" sayfasına "productId" paramını yolladık
                            productTitle: itemData.item.title         // Tıklanan ürünün adını navigation başlığında görebilmek için param yolluyoruz. Bu paramı ShopNavigator.js'in içindeki "options" kısmında alıyoruz
                        })
                    }}
                    onAddToCart={() => {}}
                />
            )}
        />
    )
}

export default ProductsOverviewScreen

const styles = StyleSheet.create({})