import { createSlice } from "@reduxjs/toolkit";

const initialState={
    mode:'light',
    user:null,
    token:null,
    expenses:[],
    savings:[],
    balance:0,
    expense:0,
    saving:0,
    selectedCurrency:'ZAR',
    selectedCurrSymbol:'R',
    amountInTargetCurrency:0,
    baseCurrency:'',
}

export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setMode: (state)=>{
            state.mode = state.mode==="light"?"dark":"light";
        },
        setLogin:(state,action)=>{
            state.user=action.payload.user;
            state.token=action.payload.token;
        },
        setLogout:(state)=>{
            state.user=null;
            state.token=null;
            state.balance = 0; 
        },
        setBalance: (state, action) => {
      state.balance = action.payload.balance;
    },
    setExpense: (state, action) => {
        state.expense = action.payload.expense;
    },
    setSaving: (state, action) => {
        state.saving = action.payload.saving;
    },
    setCurrency: (state, action) => {
        state.selectedCurrency = action.payload.selectedCurrency;
        state.selectedCurrSymbol=action.payload.selectedCurrSymbol;
        state.selectedExchangeRate=action.payload.selectedExchangeRate;
        state.amountInTargetCurrency=action.payload.amountInTargetCurrency;
    },
      setBaseCurrency:(state,action)=>{
        state.baseCurrency=action.payload.baseCurrency;
      },
    }
})

export const {setMode,setLogin,setLogout,setBalance,setExpense,setSaving,setCurrency,setBaseCurrency}=authSlice.actions
export default authSlice.reducer;