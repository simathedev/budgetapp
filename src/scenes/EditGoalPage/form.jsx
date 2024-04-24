import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  useMediaQuery,
  Typography,
  IconButton,
  Collapse,
  Alert,
  useTheme,
  Card,
  } from "@mui/material";
  import { Formik } from "formik";
  import {Close } from '@mui/icons-material';
import * as yup from "yup";
import { useNavigate,useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { setBalance, setSaving } from "../../state";
import FlexBetween from "../../components/FlexBetween";
import { Label } from "@mui/icons-material";
import { toast } from 'react-toastify';
import LoadingWidget from "../widgets/LoadingWidget";
import ProgressLoadWidget from "../widgets/ProgressLoadWidget";


const goalSchema = yup.object().shape({
  name: yup.string().required("goal title is required"),
  targetAmount: yup.number().required("target amount is required"),
  currentBalance:yup.number().required("current balance is required"),
  targetDate: yup.string().required("target date is required"),
});

const initialValuesGoal = {
  name: "",
  targetAmount: 0,
  currentBalance: 0,
  targetDate:"",
};


const Form=()=>{

    const [responseData,setResponseData]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const [savingData,setSavingData]=useState(false);
   //change to get page
    let {pageType,id}=useParams();
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const balance=useSelector((state)=>state.balance);
    const userId=`${user._id}`
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isExpense = pageType === "expenses";
    const isSaving = pageType === "savings";
    let pageVariable=""
    if (pageType==="expenses")
    {
       pageVariable="expense"
    }
    if (pageType==="savings")
    {
      pageVariable="saving"
    }
    const [open, setOpen] = useState(false);

    const [initialValues, setInitialValues] = useState({
      user: "",
      description: "",
      date: "",
      amount: 10,
      category: "",
    });

    const getGoals=async(id)=>{
console.log("id:",id)
const apiUrl=process.env.NODE_ENV === 'production' ?
`https://budget-app-api-ecru.vercel.app/goals/getGoal/${id}`
:
`http://localhost:3001/goals/getGoal/${id}`
        const response = await fetch(
          //`https://budget-app-api-ecru.vercel.app/goals/getGoal/${id}`
          apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        if (response.ok)
        {
          const data = await response.json();
          setResponseData(data.data);
          console.log("response data from update goal page: ",data.data);
          setIsLoading(false);
        }
      

      
    }

   useEffect(()=>{
    getGoals(id);
            },[id]);

 
            
  useEffect(() => {
      
        setInitialValues({
          name: responseData.name || "",
      targetAmount: responseData.targetAmount || "",
      targetDate: responseData.targetDate || "",
      currentBalance: responseData.currentBalance || "",
        });
      }, [responseData]);


 const updateGoal=async(values,onSubmitProps)=>{
        try{
          const apiUrl=process.env.NODE_ENV === 'production' ?
          `https://budget-app-api-ecru.vercel.app/goals/updateGoal/${id}`
          :`http://localhost:3001/goals/updateGoal/${id}`

            const goalResponse=await fetch(
                
              //`https://budget-app-api-ecru.vercel.app/goals/updateGoal/${id}`
              apiUrl,
                {
                  method:"PUT",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                   },
                 body:JSON.stringify(values),
                });
                if (goalResponse.ok){
                  setSavingData(false);
                  toast.success('Goal Successfully Updated.', { 
                    // Position of the notification
                    autoClose: 5000, // Duration before the notification automatically closes (in milliseconds)
                    hideProgressBar: true, // Whether to hide the progress bar
                    closeOnClick: true, // Whether clicking the notification closes it
                    pauseOnHover: true, // Whether hovering over the notification pauses the autoClose timer
                    draggable: true, // Whether the notification can be dragged
                    progress: undefined, // Custom progress bar (can be a React element)
                    theme: "colored",
                    // Other options for customizing the notification
                  });
                  navigate("/view/goals");
                ;
                  onSubmitProps.resetForm(); 
                }
                else{
                  setSavingData(false);
                  console.log("failed to submit the goals form");
                  toast.error('Goal Update Unsuccessful', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
                }
             
        }
        catch(err){
            console.log("Error saving goal:",err);
        }
       
    }
    

    
     const handleFormSubmit=async(values, onSubmitProps)=>{
        try{
          setSavingData(true);
            values={...values,user:userId}   
          await updateGoal(values, onSubmitProps); 
            console.log("submitting update goal values: ", values);
        }
        catch(err)
        {
          console.err("Error submitting form:", err);
        } 
        }

        if(isLoading)
        {
          return <LoadingWidget/>
        }
return(

<Formik
  enableReinitialize={true}
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={goalSchema}
              >

{({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>

        <Box
        position="relative"
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 5" },
            }}
          >
               {savingData&&(
                        <Card
                        sx={{width:isNonMobile?'60%':'90%', 
           position: 'absolute',
            top: '50%',
            left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex:9999,
          borderRadius:4,
        }}
                        >
        <ProgressLoadWidget text={"Updating"} name={"Goal"}/>
                        </Card>
                      )}
            <>
            <TextField
                  label="Goal Title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={Boolean(touched.name) && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Target Amount"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.targetAmount}
                  name="targetAmount"
                  error={Boolean(touched.targetAmount) && Boolean(errors.targetAmount)}
                  helperText={touched.targetAmount && errors.targetAmount}
                  sx={{ gridColumn: "span 4" }}
                />
                 <TextField
                  label="Current Balance"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.currentBalance}
                  name="currentBalance"
                  error={Boolean(touched.currentBalance) && Boolean(errors.currentBalance)}
                  helperText={touched.currentBalance && errors.currentBalance}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                      label="Target Date"
                      type="date"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.targetDate}
                      name="targetDate"
                      error={Boolean(touched.targetDate) && Boolean(errors.targetDate)}
                      helperText={touched.targetDate && errors.targetDate}
                      sx={{ gridColumn: "span 4" }}
                    />
        
            
            </>

            </Box>

{/* BUTTONS */}
<Box>
  <Button
    fullWidth
    type="submit"
    sx={{
      m: "2rem 0",
      p: "1rem",
      backgroundColor: palette.primary.main,
      color: palette.background.alt,
      "&:hover": { color: palette.primary.main },
    }}
  >
    {"Update Goal"}
  </Button>
</Box>
</form>
)}
</Formik>
)}

export default Form;