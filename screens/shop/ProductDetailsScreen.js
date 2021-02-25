import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux';


const ProductDetailScreen = (props) => {
    // const productId = props.navigation.getParam('productId');     // Aşağıdaki kullanım güncel olandır. İkisi de aynı işlevi görür
    const { productId } = props.route.params;                        // ProductsOverviewScreen.js'den "productId" adlı paramı aldık

    const selectedProduct = useSelector(state => 
        state.products.availableProducts.find(prod => prod.id === productId
    ))

    return (
        <View>
            <Text>{selectedProduct.title}</Text>
        </View>
    )
}

export default ProductDetailScreen

const styles = StyleSheet.create({})