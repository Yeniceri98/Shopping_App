import PRODUCTS from '../../data/dummy-data';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')       // ownerId'nin "u1" olduğu productları listeler (Bir eşyler görüntüleyebilmek amacıyla şimdilik böyle kullandık)
}

export default productsReducer = (state = initialState, action) => {
    return state;
}