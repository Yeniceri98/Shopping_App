import React from 'react'
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors'


const ProductItem = (props) => {
    return (
        <TouchableOpacity onPress={props.onSelect} activeOpacity={0.5} >
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: props.image }} />
                </View>
                <View style={styles.details}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button color={Colors.primary} title="View Details" onPress={props.onViewDetails} />
                    <Button color={Colors.primary} title="To Chart" onPress={props.ononAddtoCart} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ProductItem

const styles = StyleSheet.create({
    container: {
        elevation: 5,
        borderRadius: 20,
        backgroundColor: "white",
        height: 300,
        width: "90%",
        margin: 20
    },
    imageContainer: {         // container'da borderRadius kullanıldığı zaman resimleri ayrı bir <View /> içerisinde alırsak resmin tamamını görüntüleyebiliriz
        width: "100%",
        height: "60%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: "hidden"
    },
    image: {
        width: "100%",
        height: "100%"
    },
    details: {
        alignItems: "center",
        height: "15%",
        padding: 15
    },
    title: {
        fontSize: 18,
        marginVertical: 5,
        fontFamily: "Font-Bold"
    },
    price: {
        fontSize: 14,
        color: "#888",
        fontFamily: "Font-Regular"
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "25%",
        paddingHorizontal: 15
    }
})


// ProductsOverviewScreen.js'de kullanacağız