export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = productId => {
    return {
        type: DELETE_PRODUCT,
        pid: productId
    }
}

export const createProduct = (title, description, imageURL, price) => {
    return {
        type: CREATE_PRODUCT,
        productData: {
            title: title,
            description: description,
            imageURL,       // NOT: JavaScript özelliği olarak aynı ismi verirsek bu şekilde atama yapmadan da bırakabiliriz
            price
        }
    }
}

export const updateProduct = (id, title, description, imageURL) => {
    return {
        type: UPDATE_PRODUCT,
        pid: id,
        productData: {
            id,
            title,
            description,
            imageURL,
        }
    }
}