import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: "",
    },
    isAuthenticate: false,
    cartItems: [],
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginRedux: (state, action) => {
            const {
                _id,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                image,
            } = action.payload.DT;
            state.userInfo = action.payload.DT;
            state.isAuthenticate = true;
        },
        logoutRedux: (state, action) => {
            state.userInfo.id = "";
            state.userInfo.firstName = "";
            state.userInfo.lastName = "";
            state.userInfo.email = "";
            state.userInfo.password = "";
            state.userInfo.confirmPassword = "";
            state.userInfo.image = "";
            state.isAuthenticate = false;
            state.cartItems = [];
        },
        clearCart: (state, action) => {
            state.cartItems = [];
        },
        addToCart: (state, action) => {
            const total = action.payload.price;
            state.cartItems.push({
                ...action.payload,
                quantity: 1,
                total: total,
            });
        },
        minusProduct: (state, action) => {
            console.log(action);

            state.cartItems.forEach((item) => {
                if (item.id === action.payload.id) {
                    if (item.quantity <= 0) {
                        return;
                    }
                    item.quantity = item.quantity - 1;
                    item.total = item.quantity * item.price;
                }
            });
        },
        plusProduct: (state, action) => {
            state.cartItems.forEach((item) => {
                if (item.id === action.payload.id) {
                    item.quantity = item.quantity + 1;
                    item.total = item.quantity * item.price;
                }
            });
        },
        deleteProductCart: (state, action) => {
            const cartFilter = state.cartItems.filter((item) => {
                return item.id !== action.payload.id;
            });
            state.cartItems = cartFilter;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    loginRedux,
    logoutRedux,
    addToCart,
    minusProduct,
    plusProduct,
    deleteProductCart,
    clearCart,
} = userSlice.actions;

export default userSlice.reducer;
