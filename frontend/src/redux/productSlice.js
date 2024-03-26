import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productList: [],
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setDataProduct: (state, action) => {
            state.productList = [...action.payload];
        },
    },
});

// Action creators are generated for each case reducer function
export const { setDataProduct } = productSlice.actions;

export default productSlice.reducer;
