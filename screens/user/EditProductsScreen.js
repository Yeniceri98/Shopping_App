import React, { useState , useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView,Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import * as productsActions from '../../store/actions/productsActions';


const EditProductsScreen = (props) => {
    const { productId } = props.route.params;       // UserProductsScreen.js'den "productId" adlı param'ı aldık
    const prodId = productId

    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));       // productsReducer.js'den aldık

    const dispatch = useDispatch();


    const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
    const [titleIsValid, setTitleIsValid] = useState(false)     // Validation için ekledik    
    const [imageURL, setImageURL] = useState(editedProduct ? editedProduct.imageURL: "");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : "");


    const submitHandler = useCallback(() => {
        if (!titleIsValid) {
            Alert.alert("Wrong input!", "Please check the errors", 
            [
                {
                    text:"Okay",
                    style: "Default"
                }
            ])
            return;
        }

        if (editedProduct) {
            dispatch(productsActions.updateProduct(prodId, title, description, imageURL))       // Update
        }
        else {
            dispatch(productsActions.createProduct(title, description, imageURL, +price))       // Create
        }
    }, [dispatch, prodId, title, description, imageURL, price])


    useEffect(() => {
        props.navigation.setParams({
            submit: submitHandler
        })
    }, [submitHandler])


    // Validation
    const titleChangeHandler = text => {
        if (text.trim().length === 0) {
            setTitleIsValid(false);
        } 
        else {
            setTitleIsValid(true);
        }

        setTitle(text);
    }


    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput 
                        style={styles.input} 
                        value={title}    
                        // onChangeText={text => setTitle(text)}    Validation işlemi için burayı yoruma aldık
                        onChangeText={titleChangeHandler}
                        keyboardType="default"      // Klavye tipini belirler (default, number-pad, decimal-pad, numeric, email-address, phone-pad) 
                        returnKeyType="go"          // Klavyenin sağ altında yazan yazıyı belirler. (Default olan "Done" dır)
                        autoCorrect
                        onEndEditing={() => console.log("onEndEditing")}            // Yazmayı bitirip enter'a bastıktan sonra veya başka bir alana geçiş yaptıktan sonra bu property triggerlanır
                        onSubmitEditing={() => console.log("onSubmitEditing")}      // Yukarıdakinin aksine sadece enter'a basınca triggerlanır
                    />
                    {
                        !titleIsValid && <Text style={styles.errorMessage}>Please enter a valid title</Text>    // Title kısmına atadığımız "titleIsValid" state'i sayesinde, input boş işe bu hatayı verecek
                    }
                </View>
                <View style={styles.form}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput 
                        style={styles.input} 
                        value={imageURL}    
                        onChangeText={text => setImageURL(text)}
                    />
                </View>
                
                { // editedProduct = true olunca "price" görüntülenmeyecek. useState kısmında böyle ayarladık. Yani "edit" butonuna basınca price gözükmeyecek. Sağ üstteki "add" simgesine tıklayınca gözükecek
                    editedProduct ? null : (          
                        <View style={styles.form}>
                            <Text style={styles.label}>Price</Text>
                            <TextInput 
                                style={styles.input} 
                                value={price}    
                                onChangeText={text => setPrice(text)}
                                keyboardType="number-pad"      // Decimal klavye açılacak
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
                        multiline
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
    },
    errorMessage: {
        color: "red",
        fontSize: 12,
        marginVertical: 5
    }
})