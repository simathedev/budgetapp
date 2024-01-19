import { Button,Typography,useTheme } from "@mui/material";
import WidgetWrapper from "../../components/WidgetWrapper";
import LimitWidget from "./LimitWidget";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import {setBalance} from "../../state";
import { useEffect,useState } from "react";



const BalanceWidget=()=>{
    const{palette}=useTheme();
    const dark =palette.neutral.dark;
    const medium=palette.neutral.medium;
    const main=palette.neutral.main;
    const dispatch = useDispatch();
  const navigate = useNavigate();
    const balance = useSelector((state) => state.balance);
    const user = useSelector((state) => state.user);
    const userCurrency = useSelector((state) => state.user.currency);
    const userId=`${user._id}`
    const token = useSelector((state) => state.token);    
    const selectedCurrSymbol = useSelector((state) => state.selectedCurrSymbol);
    const selectedExchangeRate=useSelector((state)=>state.selectedExchangeRate);
    const expense=useSelector((state)=>state.expense);
    const saving=useSelector((state)=>state.saving);
    const[responseData,setResponseData]=useState([]);


    const getBalance=async()=>{
      try{
        console.log("currency from redux db: ",userCurrency);
      console.log("selected exhange rate: ",selectedExchangeRate);
      const FinalAmount=parseFloat(balance*selectedExchangeRate).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2,  minimumIntegerDigits: 1, });
      console.log("converted amount: ",FinalAmount);
      setResponseData(FinalAmount);
      }
      catch(err)
      {
        console.log("Error fetching total savings: ", err)
      }
       
    }
    useEffect(()=>{
      getBalance();
    },[selectedExchangeRate]);
    
    return(
        <WidgetWrapper
        alignItems="center"
        textAlign="center"
        >
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
              onClick={()=>navigate("/view/transactions")}
             >
             Balance
            </Typography>
            <Typography
            variant="h4"
            color={medium}
            padding="1rem"
            >
          {selectedCurrSymbol} {responseData}
            </Typography>

            <LimitWidget/>
             
        
             <Button onClick={()=>navigate("/view/transactions")}>
             view transactions
             </Button>
            
        </WidgetWrapper>
       
    )
}

export default BalanceWidget;