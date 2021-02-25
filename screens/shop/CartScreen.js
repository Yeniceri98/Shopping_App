import React from 'react'
import { Button, StyleSheet, Text, View, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cartActions';     // Dispatch işlemi için import ettik


const CartScreen = () => {
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);       // App.js'de cartReducer'ı "cart" olarak atamıştık

    const cartItems = useSelector(state => {
        const transformedCartItems = [];

        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,       // models > cart-item.js'de tanımlanmıştı (alttakiler de aynı şekilde)
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,               // <CartItem /> componentine yollanan prop'larda bunları kullanacağız
                sum: state.cart.items[key].sum
            })
        }

        // return transformedCartItems;
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);     // Sepete eklenen ürünleri silerken her seferinde sıralamanın değişmemesi için sort metodunu kullandık
    })

    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
                </Text>
            </View>
            <Button 
                color={Colors.primary}
                title="Order Now"
                disabled={cartItems.length === 0}
            />
            <FlatList 
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => (
                    <CartItem 
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        onRemove={() => {
                            dispatch(cartActions.removeFromCart(itemData.item.productId));
                        }}
                    />
                )}
            />
        </View>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    summary: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        padding: 10,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "white"
    },
    summaryText: {
        fontFamily: "Font-Bold",
        fontSize: 18
    },
    amount: {
        color: Colors.secondary
    }
})