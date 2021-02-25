import React from 'react'
import { StyleSheet, Text, View, ScrollView, Button, Image } from 'react-native'
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';


const ProductDetailScreen = (props) => {
    // const productId = props.navigation.getParam('productId');     // Aşağıdaki kullanım güncel olandır. İkisi de aynı işlevi görür
    const { productId } = props.route.params;                        // ProductsOverviewScreen.js'den "productId" adlı paramı aldık

    const selectedProduct = useSelector(state => 
        state.products.availableProducts.find(prod => prod.id === productId
    ))

    return (
        // <Text>{selectedProduct.title}</Text>

        <ScrollView>
            <Image style={styles.image} source={{ uri: selectedProduct.imageURL}} />        
            <View style={styles.buttonContainer}>
                <Button 
                    style={styles.button}
                    color={Colors.primary}
                    title="Add to Chart"
                    onPress={() => {}}
                />
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>  
            <Text style={styles.description}>{selectedProduct.description}</Text>

        </ScrollView>
        
    )
}

export default ProductDetailScreen

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 300
    },
    buttonContainer: {
        margin: 10,
        alignItems: "center",
    },
    price: {
        fontSize: 20,
        color: "#888",
        textAlign: "center",
        marginVertical: 20,
        fontFamily: "Font-Regular"
    },
    description: {
        fontSize: 14,
        textAlign: "center",
        marginHorizontal: 20,
        fontFamily: "Font-Regular"
    },
})