import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as productsActions from '../../store/actions/productsActions';
import { Formik } from 'formik';
import * as yup from 'yup';


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
            dispatch(productsActions.updateProduct(productId, title, description, imageURL))       // Update
        }
        else {
            dispatch(productsActions.createProduct(title, description, imageURL, +price))          // Create
        }
    }, [dispatch, productId, title, description, imageURL, price])


    useEffect(() => {
        props.navigation.setParams({
            submit: submitHandler
        })
    }, [submitHandler])


    const formValidation = yup.object().shape({
        title: yup.string().required("Title is required").min(2),
        imageURL: yup.string().required("Image URL is required"),
        price: yup.number().required("Price must be a number").test(val => {
            return val > 0
        }),
        description: yup.string().required("Description is required").min(10)
    })

    
    return (
        <ScrollView>
            <Formik
                initialValues={{ title: "", imageURL: "", price: "", description: ""}}
                //onSubmit={values => console.log(values)}
                onSubmit={values => submitHandler(values)}    // (Eklenen öğe değerleri gözükmüyor)
                validationSchema={formValidation}
            >
                {({ handleChange, handleSubmit, values, errors, isValid, handleReset }) => (
                    <View style={styles.container}>
                        <View style={styles.form}>
                            <Text style={styles.label}>Title</Text>
                            <TextInput 
                                style={styles.input}
                                value={values.title}
                                // value={title}
                                placeholder="Title"
                                onChangeText={handleChange('title')}             
                                // onChangeText={text => setTitle('title')}             
                            />
                            {
                                errors.title && (
                                    <Text style={styles.errorMessage}>{errors.title}</Text>
                                )
                            } 
                        </View>
                        <View style={styles.form}>
                            <Text style={styles.label}>Image URL</Text>
                            <TextInput 
                                style={styles.input}
                                value={values.imageURL}
                                placeholder="Image URL"
                                onChangeText={handleChange('imageURL')}
                            />
                            {
                                errors.imageURL && (
                                    <Text style={styles.errorMessage}>{errors.imageURL}</Text>
                                )
                            }
                        </View>
                        {
                            editedProduct ? null : (
                                <View style={styles.form}>
                                    <Text style={styles.label}>Price</Text>
                                    <TextInput 
                                        style={styles.input}
                                        value={values.price}
                                        placeholder="Price"
                                        onChangeText={handleChange('price')}
                                    />
                                    {
                                        errors.price && (
                                            <Text style={styles.errorMessage}>{errors.price}</Text>
                                        )
                                    }
                                </View>
                            )
                        }
                        <View style={styles.form}>
                            <Text style={styles.label}>Description</Text>
                            <TextInput 
                                style={styles.input}
                                value={values.description}
                                placeholder="Description"
                                onChangeText={handleChange('description')}
                            />
                            {
                                errors.description && (
                                    <Text style={styles.errorMessage}>{errors.description}</Text>
                                )
                            }
                        </View>
                        {
                            editedProduct ? null : (
                                <View style={styles.buttonContainer}>
                                    <View style={styles.button}>
                                        <Button
                                            title="Submit" 
                                            onPress={handleSubmit} 
                                            disabled={!isValid}         // Girilen değerler valid değilse butona tıklayamayacağız
                                        />
                                    </View>
                                    <View style={styles.button}>
                                        <Button 
                                            title="reset" 
                                            color="red"
                                            onPress={handleReset}       // Formu resetler
                                        />
                                    </View>
                                </View>
                            )
                        }
                    </View>
                )}
            </Formik>
        </ScrollView>

                /* <View style={styles.container}>
                    <View style={styles.form}>
                        <Text style={styles.label}>Title</Text>
                        <TextInput 
                            style={styles.input} 
                            value={title}    
                            onChangeText={text => setTitle(text)}
                            keyboardType="default"                                      // Klavye tipini belirler (default, number-pad, decimal-pad, numeric, email-address, phone-pad) 
                            returnKeyType="go"                                          // Klavyenin sağ altında yazan yazıyı belirler. (Default olan "Done" dır)
                            autoCorrect
                            onEndEditing={() => console.log("onEndEditing")}            // Yazmayı bitirip enter'a bastıktan sonra veya başka bir alana geçiş yaptıktan sonra bu property triggerlanır
                            onSubmitEditing={() => console.log("onSubmitEditing")}      // Yukarıdakinin aksine sadece enter'a basınca triggerlanır
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
                </View> */
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
        fontSize: 10
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center"
    },
    button: {
        margin: 10,
    }
})