import { Box, Button,Typography,useTheme } from "@mui/material";
import WidgetWrapper from "../../components/WidgetWrapper";
import FlexBetween from "../../components/FlexBetween";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useEffect,useState } from "react";
import {setSaving} from  "../../state";
import ChartWidget from "./ChartWidget/ChartWidget";
import LoadingSmallWidget from "./LoadingSmallWidget";
//import UpdateBalance from "../../components/UpdateBalance";



const SavingsWidget=()=>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const{palette}=useTheme();
    const[responseData,setResponseData]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
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
      const apiUrl=process.env.NODE_ENV === 'production' ?
      `https://budget-app-api-ecru.vercel.app/savings/getSavingsTotal/${userId}`
      :
      `http://localhost:3001/savings/getSavingsTotal/${userId}`

      const response = await fetch(
        //`https://budget-app-api-ecru.vercel.app/savings/getSavingsTotal/${userId}`
        apiUrl, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    if(response.ok)
    {
      const data = await response.json();
      const FinalAmount=parseFloat(data.totalAmount*selectedExchangeRate).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2,  minimumIntegerDigits: 1, });
      console.log("converted amount: ",FinalAmount);
      setResponseData(FinalAmount);
      const savingAmount=data.totalAmount;
      dispatch(setSaving({saving:savingAmount}));
      setIsLoading(false);
    }
  
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
 
if (isLoading)
{
  return(
<WidgetWrapper >
    <LoadingSmallWidget text={'loading...'} name={'Savings'} height={'310px'}/>
</WidgetWrapper>
  ) 
}

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
            
            </Box>
             
        </WidgetWrapper>
       
    )
}

export default SavingsWidget;