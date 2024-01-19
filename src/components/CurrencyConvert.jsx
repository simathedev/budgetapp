import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import country_code from '../countryList';
import { 
    FormControl,
     InputBase,
      MenuItem, 
      Select,
      useTheme,
    Typography } from '@mui/material';
import currency_symbols from '../countrySymbols';
import Flag from 'react-world-flags';
import {setCurrency} from '../state';
import { setBaseCurrency } from '../state';
import CalculateCurrency from "../components/CalculateCurrency";

const CurrencyConvert=()=>{
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const [selectedCurrency, setSelectedCurrency] = useState(localStorage.getItem("selectedCurrency") || "ZAR"); 
    console.log("localStorage.getItem('selectedCurrency'):", localStorage.getItem("selectedCurrency"));
    const dispatch = useDispatch();
    const baseCurrency=useSelector((state)=>state.baseCurrency)

    const handleCurrencyChange = async (event) => {
        const newCurrency = event.target.value;
        setSelectedCurrency(newCurrency);
        const newExchangeRate= await CalculateCurrency(baseCurrency,newCurrency);
       console.log("new exchange rate: ", newExchangeRate);
       console.log("registration currency 2024: ",newCurrency);
       const sumTest=16000*newExchangeRate;
       console.log("testing amount: ",sumTest);
       // const selectedExchangeRate=await fetchExchangeRates();
        //console.log("exchange rates: ",selectedExchangeRate);
        //INCLUDE CURRENCY CONVERT HERE AND DISPATCH THE EXCHANGE RATE TO NEW CURRENCY RATE
        const selectedSymbol = currency_symbols[newCurrency];
        //localStorage.setItem("selectExchangeRate",selectedExchangeRate);
        localStorage.setItem("selectedCurrency", newCurrency);
        localStorage.setItem("selectedCurrSymbol", selectedSymbol);
        localStorage.setItem("selectedExchangeRate",newExchangeRate);
        dispatch(setCurrency({  selectedCurrency: newCurrency, selectedCurrSymbol:selectedSymbol,selectedExchangeRate:newExchangeRate}));
    };

return(
    <FormControl
    
    variant="standard"
    sx={{
        backgroundColor: neutralLight, // Assuming you have defined this
        width: "150px",
        textAlign:"center",
        borderRadius: "0.25rem",
        p: "0.25rem 1rem",
        "& .MuiSvgIcon-root": {
            pr: "0.25rem",
            width: "3rem",
        },
        "& .MuiSelect-select:focus": {
            backgroundColor: neutralLight,
        },
    }}
>
    <Select
        value={selectedCurrency}
        onChange={handleCurrencyChange}
        input={<InputBase />}
    >
        {Object.keys(country_code).map((currencyCode) => (
            <MenuItem key={currencyCode} value={currencyCode}>
<div style={{ display: 'flex', alignItems: 'center' ,textAlign:'center', justifyContent:'center'}}>
                 <Flag
                            code={country_code[currencyCode]}
                            style={{
                                width: '1.5rem',
                                height: '1.5rem',
                                marginRight: '0.5rem',
                            }}
                        />
               {currencyCode}
               </div>
            </MenuItem>
        ))}
    </Select>
</FormControl>
)
}
export default CurrencyConvert;