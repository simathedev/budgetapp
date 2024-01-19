import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { setCurrency } from "../state";


const CalculateCurrency = async (base,newCurrency) => {
  const baseCurrency = base||'ZAR';
  const apiUrl = `https://v6.exchangerate-api.com/v6/e705675999b0dabb648e712e/latest/${baseCurrency}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.conversion_rates) {
      const exchangeRates = data.conversion_rates;
      return exchangeRates[newCurrency] || 1; // Return the exchange rate or 1 as a default
    }
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
  }

  return 1; // Return 1 as a default value in case of errors
};

export default CalculateCurrency;
