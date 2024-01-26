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
  } from "@mui/material";
  import { Formik } from "formik";
  import {Close } from '@mui/icons-material';
import * as yup from "yup";
import { useNavigate,useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { setBalance } from "../../state";
import FlexBetween from "../../components/FlexBetween";
import { Label } from "@mui/icons-material"; 

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
        const response = await fetch(`https://budget-app-api-ecru.vercel.app/goals/getGoal/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        setResponseData(data.data);
        console.log("response data from update goal page: ",data.data);


      
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
            const goalResponse=await fetch(
                //CHECK THE URL AND FIX
              `https://budget-app-api-ecru.vercel.app/goals/updateGoal/${id}`,
                {
                  method:"PUT",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                   },
                 body:JSON.stringify(values),
                });
                if (goalResponse.ok){
               
                  navigate("/view/goals");
                ;
                  onSubmitProps.resetForm(); 
                }
                else{
                  console.log("failed to submit the goals form");
                }
             
        }
        catch(err){
            console.log("Error saving goal:",err);
        }
       
    }
    

    
     const handleFormSubmit=async(values, onSubmitProps)=>{
        try{
         
            values={...values,user:userId}   
          await updateGoal(values, onSubmitProps); 
            console.log("submitting update goal values: ", values);
        }
        catch(err)
        {
          console.err("Error submitting form:", err);
        } 
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
<Box sx={{ width: '100%' }}>
<Collapse in={open}>
<Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {pageVariable} has been successfully created!
        </Alert>
</Collapse>
</Box>
<Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 5" },
            }}
          >
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