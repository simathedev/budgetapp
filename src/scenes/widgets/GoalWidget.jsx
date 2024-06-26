import { Button,Typography,useTheme,Box } from "@mui/material";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { useEffect,useState } from "react";
import LoadingSmallWidget from "./LoadingSmallWidget";

const GoalWidget=()=>{
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [responseData,setResponseData]=useState([]);
   const [isLoading,setIsLoading]=useState(true);
   const selectedCurrSymbol = useSelector((state) => state.selectedCurrSymbol);
    const{palette}=useTheme();
     const user = useSelector((state) => state.user);
    const userId=`${user._id}`
   const token = useSelector((state) => state.token);
    const dark =palette.neutral.dark;
    const medium=palette.neutral.medium;
    const main=palette.neutral.main;

   const getGoalCount=async()=>{
      const apiUrl=process.env.NODE_ENV === 'production' ?
      `https://budget-app-api-ecru.vercel.app/goals/getGoalsCount/${userId}`
      :
      `http://localhost:3001/goals/getGoalsCount/${userId}`
  const response = await fetch(
   //`https://budget-app-api-ecru.vercel.app/goals/getGoalsCount/${userId}`
  apiUrl, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    if (response.ok)
    {
      const data=await response.json();
      setResponseData(data.totalCount);
      const goalCount=data.totalCount;
      setIsLoading(false);
    }
   
   }   
 
   useEffect(()=>{
      getGoalCount();
   },[]);

   if (isLoading)
{
  return(
<WidgetWrapper >
    <LoadingSmallWidget text={'loading...'} name={'Goals'} height={'240px'}/>
</WidgetWrapper>
  ) 
}

return(
    <WidgetWrapper
    display="flex"
    flexDirection="column"
    alignItems="center"
    textAlign="center"
    justifyContent="center"
    minHeight="240px"
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
              onClick={()=>navigate("/view/goals")}
             >
                Goals
             </Typography>

             <Typography
            variant="h4"
            color={medium}
            padding="1rem"
            >
            {responseData?`${responseData} goals`:'No goals set'}
            </Typography>
              <Box sx={{display:'flex'}}>
              <Button  onClick={()=>navigate("/add/goal")}>
             Add goals
             </Button>
             <Button  onClick={()=>navigate("/view/goals")}>
             View goals
             </Button>
              </Box>
          
             {/*
             set feature that only displays buttons when there are goals
             <Button>
                View goals
             </Button>
             <Button>
               Delete goals
            </Button>*/}
        
    </WidgetWrapper>
)
}
export default GoalWidget;