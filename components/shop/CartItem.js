import React from 'react'
import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';


const CartItem = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity} </Text>
                <Text style={styles.mainText}>{props.title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>${props.amount.toFixed(2)}</Text>
                <TouchableOpacity style={styles.deleteButton} onPress={props.onRemove}>
                    <Ionicons 
                        name={Platform.OS === 'android' ? "md-trash" : "ios-trash"}
                        size={24}
                        color="red"
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CartItem

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginHorizontal: 20,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    itemData: {
        flexDirection: "row",
        alignItems: "center",
    },
    quantity: {
        fontFamily: "Font-Regular",
        color: "#888",
        fontSize: 16
    },
    mainText: {
        fontFamily: "Font-Bold",
        fontSize: 16
    },
    deleteButton: {
        marginLeft: 20
    }
})


// CartScreen.js'de kullanacağız