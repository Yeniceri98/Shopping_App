import React from 'react'
import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cartActions';      // "onAddToCart" kısmında dispatch yaparken ihtiyacımız olacak
import Colors from '../../constants/Colors';


const ProductsOverviewScreen = (props) => {
    const products = useSelector(state => state.products.availableProducts);     // App.js'de combineReducer kısmında productsReducer'ı "products" a atamıştık. "availableProducts" ise productsReducer.js'de ulaşmak istediğimiz kısım.

    const dispatch = useDispatch();

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetails', {
            productId: id,
            productTitle: title
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
                    onSelect={() => {               // Burası da ProductItem.js'deki yeni düzenlemeden sonra geldi
                        selectItemHandler(itemData.item.id, itemData.item.title);   
                    }}

                    // onViewDetails={() => {
                    //     props.navigation.navigate('ProductDetails', {
                    //         productId: itemData.item.id,              // "ProductDetails" sayfasına "productId" paramını yolladık
                    //         productTitle: itemData.item.title         // Tıklanan ürünün adını navigation başlığında görebilmek için param yolluyoruz. Bu paramı ShopNavigator.js'in içindeki "options" kısmında alıyoruz
                    //     })
                    // }}
                    // onAddToCart={() => {
                    //     dispatch(cartActions.addToCart(itemData.item))     // Product'ımız itemData.item oluyor
                    // }}

                    // NOT: Yukarısını ProducItem.js'de yaptığım buton değişikliğinden ötürü yorum satırına aldım
                >
                    <Button 
                        color={Colors.secondary}
                        title="View Details"
                        onPress={() => {
                            selectItemHandler(itemData.item.id, itemData.item.title);
                        }}
                    />
                    <Button 
                        color={Colors.secondary}
                        title="To Cart"
                        onPress={() => {
                            dispatch(cartActions.addToCart(itemData.item));
                        }}
                    />
                </ProductItem>
            )}
        />
    )
}

export default ProductsOverviewScreen

const styles = StyleSheet.create({})