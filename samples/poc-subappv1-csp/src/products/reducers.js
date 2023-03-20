export const addProduct = (value) => {
    return {
        type: "ADD_PRODUCT",
        payload: value,
    };
};

export const products = (state = '', action) => {
    switch (action.type) {
        case 'ADD_PRODUCT':
            state.products.push(action.payload);
            return state;
        default:
            return state
    }
}

export const productsReducers = {
    products,
}