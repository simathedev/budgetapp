// ChooseCurrency.jsx
import React, { useState } from 'react';
import { FormControl, InputBase, MenuItem, Select, useTheme } from '@mui/material';
import Flag from 'react-world-flags';
import { useDispatch } from 'react-redux';
import { setCurrency } from '../state';
import country_code from '../countryList';
import currency_symbols from '../countrySymbols';
import CalculateCurrency from '../components/CalculateCurrency';

const ChooseCurrency = () => {
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const [selectedCurrency, setSelectedCurrency] = useState(localStorage.getItem('selectedCurrency') || 'ZAR');
  const [clicked,setClicked]=useState(false);
  const dispatch = useDispatch();

  const handleCurrencyChange = async (event) => {
    const newCurrency = event.target.value;
    console.log("New Currency:", newCurrency);
  
    if (clicked) {
      const newExchangeRate = await CalculateCurrency(newCurrency);
      console.log("New Exchange Rate:", newExchangeRate);
  
      const selectedSymbol = currency_symbols[newCurrency];
      console.log("Selected Symbol:", selectedSymbol);
      setSelectedCurrency(newCurrency);
  
      localStorage.setItem('selectedExchangeRate', newExchangeRate);
      dispatch(setCurrency({ selectedCurrency: newCurrency, selectedCurrSymbol: selectedSymbol, selectedExchangeRate: newExchangeRate }));
    }
  };
  

  const handleDropdownOpen = async (event) => {
    setClicked(true);
    console.log("Dropdown opened");
};

  return (
    <FormControl
      variant="standard"
      sx={{
        backgroundColor: neutralLight,
        gridColumn: 'span 2',
        textAlign: 'center',
        borderRadius: '0.25rem',
        p: '0.25rem 1rem',
        '& .MuiSvgIcon-root': {
          pr: '0.25rem',
          width: '3rem',
        },
        '& .MuiSelect-select:focus': {
          backgroundColor: neutralLight,
        },
      }}
    >
      <Select
        value={selectedCurrency}
        onChange={handleCurrencyChange}
        onOpen={handleDropdownOpen}
        input={<InputBase />}
      >
        {Object.keys(country_code).map((currencyCode) => (
          <MenuItem key={currencyCode} value={currencyCode}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', textAlign: 'center', justifyContent: 'center' }}>
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
  );
};

export default ChooseCurrency;
