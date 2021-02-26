import React, { useState , useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import * as productsActions from '../../store/actions/productsActions';


const EditProductsScreen = (props) => {
    const { productId } = props.route.params;       // UserProductsScreen.js'den "productId" adlı param'ı aldık


    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === productId));       // productsReducer.js'den aldık

    const dispatch = useDispatch();


    const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
    const [imageURL, setImageURL] = useState(editedProduct ? editedProduct.imageURL: "");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : "");


    const submitHandler = useCallback(() => {
        if (editedProduct) {
            dispatch(productsActions.updateProduct(productId, title, description, imageURL))    // Update
        }

        else {
            dispatch(productsActions.createProduct(title, description, imageURL, +price))       // Create
        }
        
        props.navigation.goBack();
    }, [dispatch, productId, title, description, imageURL, price])


    useEffect(() => {
        props.navigation.setParams({
            submit: submitHandler
        })
    }, [submitHandler])


    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput 
                        style={styles.input} 
                        value={title}    
                        onChangeText={text => setTitle(text)}
                    />
                </View>
                <View style={styles.form}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput 
                        style={styles.input} 
                        value={imageURL}    
                        onChangeText={text => setImageURL(text)}
                    />
                </View>
                
                {
                    editedProduct ? null : (          // editedProduct = true olunca "price" görüntülenmeyecek. useState kısmında böyle ayarladık. Yani "edit" butonuna basınca price gözükmeyecek. Sağ üstteki "add" simgesine tıklayınca gözükecek
                        <View style={styles.form}>
                            <Text style={styles.label}>Price</Text>
                            <TextInput 
                                style={styles.input} 
                                value={price}    
                                onChangeText={text => setPrice(text)}
                            />
                        </View>
                    )
                }

                <View style={styles.form}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput 
                        style={styles.input} 
                        value={description}    
                        onChangeText={text => setDescription(text)}
                    />
                </View>
            </View>
        </ScrollView>
    )
}


export default EditProductsScreen

const styles = StyleSheet.create({
    container: {
        margin: 20
    },
    form: {
        width: "100%"
    },
    label: {
        fontFamily: "Font-Bold",
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
    }
})