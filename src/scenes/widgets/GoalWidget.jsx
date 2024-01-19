import { Button,Typography,useTheme } from "@mui/material";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { useEffect,useState } from "react";

const GoalWidget=()=>{
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [responseData,setResponseData]=useState([]);
   const selectedCurrSymbol = useSelector((state) => state.selectedCurrSymbol);
    const{palette}=useTheme();
     const user = useSelector((state) => state.user);
    const userId=`${user._id}`
   const token = useSelector((state) => state.token);
    const dark =palette.neutral.dark;
    const medium=palette.neutral.medium;
    const main=palette.neutral.main;

   const getGoalCount=async()=>{
  const response = await fetch(`http://localhost:3001/goals/getGoalsCount/${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    const data=await response.json();
    setResponseData(data.totalCount);
   // console.log("response goal data: ",data.totalCount);
    const goalCount=data.totalCount;
   }   
 
   useEffect(()=>{
      getGoalCount();
   },[]);

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

            <Button  onClick={()=>navigate("/add/goal")}>
             Add goals
             </Button>
             <Button  onClick={()=>navigate("/view/goals")}>
             View goals
             </Button>
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