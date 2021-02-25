import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cartActions';      // "onAddToCart" kısmında dispatch yaparken ihtiyacımız olacak


const ProductsOverviewScreen = (props) => {
    const products = useSelector(state => state.products.availableProducts);     // App.js'de combineReducer kısmında productsReducer'ı "products" a atamıştık. "availableProducts" ise productsReducer.js'de ulaşmak istediğimiz kısım.

    const dispatch = useDispatch();

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
                        props.navigation.navigate('ProductDetail', {
                            productId: itemData.item.id,              // "ProductDetails" sayfasına "productId" paramını yolladık
                            productTitle: itemData.item.title         // Tıklanan ürünün adını navigation başlığında görebilmek için param yolluyoruz. Bu paramı ShopNavigator.js'in içindeki "options" kısmında alıyoruz
                        })
                    }}
                    onAddToCart={() => {
                        dispatch(cartActions.addToCart(itemData.item))     // Product'ımız itemData.item oluyor
                    }}
                />
            )}
        />
    )
}

export default ProductsOverviewScreen

const styles = StyleSheet.create({})