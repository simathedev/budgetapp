import { Box, Button,Typography,useTheme } from "@mui/material";
import WidgetWrapper from "../../components/WidgetWrapper";
import FlexBetween from "../../components/FlexBetween";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useEffect,useState } from "react";
import {setSaving} from  "../../state";
import ChartWidget from "./ChartWidget/ChartWidget";
//import UpdateBalance from "../../components/UpdateBalance";



const SavingsWidget=()=>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const{palette}=useTheme();
    const[responseData,setResponseData]=useState([]);
    const dark =palette.neutral.dark;
    const medium=palette.neutral.medium;
    const main=palette.neutral.main;
    const user = useSelector((state) => state.user);
    const userId=`${user._id}`
   const token = useSelector((state) => state.token);
   const selectedCurrSymbol = useSelector((state) => state.selectedCurrSymbol);
   const selectedExchangeRate=useSelector((state)=>state.selectedExchangeRate);
   const balance = useSelector((state)=>state.balance);

   
   const getTotalSavings=async()=>{
    try{
      const response = await fetch(`http://budget-app-api-ecru.vercel.app/savings/getSavingsTotal/${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    const FinalAmount=parseFloat(data.totalAmount*selectedExchangeRate).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2,  minimumIntegerDigits: 1, });
    console.log("converted amount: ",FinalAmount);
    setResponseData(FinalAmount);
   // console.log("response data: ", data.totalAmount);
    const savingAmount=data.totalAmount;
    //const updatedBalance=saving
    dispatch(setSaving({saving:savingAmount}));

  
    }
    catch(err)
    {
      console.log("Error fetching total savings: ", err)
    }
     
  }
  useEffect(()=>{
getTotalSavings();
  },[selectedExchangeRate])
const savingTotal=useSelector((state)=>state.saving);
console.log('saving total: ',savingTotal);
    return(
        <WidgetWrapper
        
        >
            <Box textAlign="center">
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
              onClick={()=>navigate("/view/savings")}
            >
            Savings
            </Typography>
            <ChartWidget  balance={savingTotal} totalBalance={balance}/>
            <Typography
             variant="h4"
             color={medium}
             padding="1rem"
            >
           {responseData===0?"no savings": `+ ${selectedCurrSymbol} ${responseData}`} 
            </Typography>
            
            <Button onClick={()=>navigate("/add/savings")} >
                Add savings
                </Button>
            <Button onClick={()=>navigate("/view/savings")} >
                view savings
                </Button>
           {/* <FlexBetween gap="1rem">
                <Button>
                delete savings
            </Button>
            </FlexBetween>*/}
            
            </Box>
             
        </WidgetWrapper>
       
    )
}

export default SavingsWidget;