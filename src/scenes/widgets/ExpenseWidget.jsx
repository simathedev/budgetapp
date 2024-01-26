import { Box, Button,Typography,useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useState,useEffect } from "react";
import {CalculateCurrency} from "../../components/CalculateCurrency";
import {setExpense} from  "../../state";
import { setBalance } from "../../state";
import UpdateBalance from "../../components/UpdateBalance";
import ChartWidget from "./ChartWidget/ChartWidget";



const ExpenseWidget=()=>{
       /* 
   To display the data involved
       <h2>Currency Conversion</h2>
      <p>Amount in {baseCurrency}: {amountInBaseCurrency}</p>
      <p>Exchange Rate: {exchangeRates[selectedCurrency]}</p>
      <p>Amount in {selectedCurrency}: {amountInTargetCurrency}</p>
      */
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const{palette}=useTheme();
    const dark =palette.neutral.dark;
    const medium=palette.neutral.medium;
    const main=palette.neutral.main;
    const selectedCurrSymbol = useSelector((state) => state.selectedCurrSymbol);
    const selectedExchangeRate=useSelector((state)=>state.selectedExchangeRate);
    const balance = useSelector((state) => state.balance);
    const user = useSelector((state) => state.user);
    const userId=`${user._id}`
    const token = useSelector((state) => state.token);    
    const[responseData,setResponseData]=useState([]);


    const getTotalExpenses=async()=>{
        try{
            const response = await fetch(`https://budget-app-api-ecru.vercel.app/expenses/getExpenseTotal/${userId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            //console.log("response data: ", data);
            const FinalAmount=parseFloat(data.totalAmount*selectedExchangeRate).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2,  minimumIntegerDigits: 1, });
            console.log("converted amount: ",FinalAmount);
            setResponseData(FinalAmount);
            const expenseAmount=data.totalAmount;
           
            dispatch(setExpense({expense:expenseAmount}));
        
            //include exported function that updates balance in db
       
       
        }
        catch(err)
        {
            console.log("Error fetching total expenses: ",err)
        }
       
    }
    useEffect(()=>{
        getTotalExpenses();
    },[selectedCurrSymbol])
    const expenseTotal=useSelector((state)=>state.expense);
    //console.log('expense total: ',expenseTotal);


    return(
        <WidgetWrapper
        textAlign="left"
        >
            <Box textAlign="center" >
                <Typography
                 variant="h2"
                 color={dark}
                 fontWeight="500"
                 sx={{
                    "&:hover": {
                      color: palette.primary.light,
                      cursor: "pointer",
                    },
                  }}
                  onClick={()=>navigate("/view/expenses")}
                >
                Expenses
                </Typography>
                <ChartWidget balance={expenseTotal} totalBalance={balance}/>
            <Typography
             variant="h4"
             color={medium}
             padding="1rem"
            >

           {responseData.totalAmount===0?"no expenses":`- ${selectedCurrSymbol} ${responseData}`}
                </Typography>
                <Button onClick={()=>navigate("/add/expenses")}>
           add expenses
                </Button>
                <Button onClick={()=>navigate("/view/expenses")}>
            view expenses
           </Button>
           {/* <FlexBetween gap="1rem">
           //if there is no expenses found in db then the expenses is set to 0 
           when set to 0 only add expenses button must show otherwise the other buttons must show
           <Button>
            view expenses
           </Button>
                <Button>
                delete expenses
                </Button>
            </FlexBetween>*/}
            </Box>
        </WidgetWrapper>
       
    )
}

export default ExpenseWidget;