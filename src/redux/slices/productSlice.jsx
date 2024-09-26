import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'

const initialState={
    products:[],
    selectedProduct:{},
    loading:false,
    error: null,
}
const BASE_URL="https://fakestoreapi.com";

export const getAllProducts=createAsyncThunk("getAllProducts",async()=>{
    const response=await fetch('https://fakestoreapi.com/products')
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const json = await response.json();
    return json; 

});

export const productSlice= createSlice({
    name:"product",
    initialState,
    reducers:{
        setSelectedProduct:(state,action)=>{
            state.selectedProduct=action.payload;

        }
        
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getAllProducts.pending, (state) => {
            state.loading = true; 
            state.error = null;
        })
        .addCase(getAllProducts.fulfilled, (state, action) => {
            state.loading = false; 
            state.products = action.payload; 
        })
        .addCase(getAllProducts.rejected, (state, action) => {
            state.loading = false; 
            state.error = action.error.message; 
        });
}
    }
)
export const { setSelectedProduct} = productSlice.actions

export default productSlice.reducer