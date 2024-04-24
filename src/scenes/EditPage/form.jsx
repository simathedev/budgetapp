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
  Card,
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
import { toast } from 'react-toastify'; 
import LoadingWidget from "../widgets/LoadingWidget";
import ProgressLoadWidget from "../widgets/ProgressLoadWidget";



const expenseSchema = yup.object().shape({
    description: yup.string().required("description required"),
    date: yup.date().required("date required"),
    amount: yup.number().required("amount required"),
    category: yup.string().required("category required"),
  });

  const savingSchema = yup.object().shape({
    description: yup.string().required("description required"),
    date: yup.date().required("date required"),
    amount: yup.number().required("amount required"),
    category: yup.string().required("category required"),
  });


const Form=()=>{
    const [categories,setCategories]=useState([]);
    const [selectedCategory,setSelectedCategory]=useState("");
    const [responseData,setResponseData]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const [savingData,setSavingData]=useState(false);
   //change to get page
    let {pageType,id}=useParams();
    console.log("edit page + pageType editpage: ",pageType);
    console.log("id from useParams editpage: ",id);
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

    const getCategories=async()=>{
      const apiUrl=process.env.NODE_ENV === 'production' ?
      `https://budget-app-api-ecru.vercel.app/categories`
      :
      `http://localhost:3001/categories`

        const categoryResponse=await fetch(
            //`https://budget-app-api-ecru.vercel.app/categories`
            apiUrl,{
                method:"GET",
                headers: { Authorization: `Bearer ${token}` },

            })

        const data=await categoryResponse.json();
        setCategories(data);
        console.log("categories:",data);
    }
    const getIdData=async(pageType,id)=>{
        let fetchOptions = {};
        console.log("pagetype:",pageType)
        console.log("id:",id)
        const apiUrl=process.env.NODE_ENV === 'production' ?
        `https://budget-app-api-ecru.vercel.app`
        :
        `http://localhost:3001`
        switch(pageType)
        {
            case 'expenses':
            fetchOptions = {
                fetchURL:  `${apiUrl}/expenses/getExpense/${id}`,
             };
             break;
             case 'savings':
                fetchOptions = {
                    fetchURL:   `${apiUrl}/savings/getSaving/${id}`,
                 };
        break;
        default:
        break;
     }
     console.log("fetchURL for get Id: ",fetchOptions.fetchURL);
     
     if (fetchOptions.fetchURL) {
        const response = await fetch(fetchOptions.fetchURL, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        if(response.ok)
        {
          const data = await response.json();
          setResponseData(data.data);
          console.log(data.data.description);
          console.log("response data from update Page: ",data.data);  
          setIsLoading(false);
        }
      
      
    }
}

   useEffect(()=>{
    getIdData(pageType,id);
            },[id]);

 
            
  useEffect(() => {
      if (Array.isArray(responseData) && responseData.length > 0) {
        const data = responseData[0];
        setInitialValues({
          user: data.user || "",
          description: data.description || "",
          date: data.date || "",
          amount: data.amount || "",
          category: data.category || "",
          
        });
        setSelectedCategory(data.category);
      }
      else if (typeof responseData === 'object' && Object.keys(responseData).length > 0){
        setInitialValues({
          user: responseData.user || "",
      description: responseData.description || "",
      date: responseData.date || "",
      amount: responseData.amount || "",
      category: responseData.category || "",
        });
        setSelectedCategory( responseData.category);
      }
    else {
      // If responseData is not available, reset initial values
      setInitialValues({
        user: "",
        description: "",
        date: "",
        amount: 30,
        category: "",
      });
    }
  }, [responseData]);

  
 
            useEffect(()=>{
              getCategories();
              },[])
          

 const updateExpense=async(values,onSubmitProps)=>{
        try{
            const expenseResponse=await fetch(
                //CHECK THE URL AND FIX
              `https://budget-app-api-ecru.vercel.app/expenses/updateExpense/${id}`,
                {
                  method:"PUT",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                   },
                 body:JSON.stringify(values),
                });
                if (expenseResponse.ok){
               setSavingData(false);
               //Just change to the amount updated
             const updateBalance=parseFloat(balance)- parseFloat(values.amount);
              console.log("updated balance:", updateBalance);
              dispatch(setBalance({balance:updateBalance}));
              toast.success('Expense Successfully Update.', { 
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
                  navigate("/view/expenses");
                ;
                  onSubmitProps.resetForm(); 
                }
                else{
                  setSavingData(false);
                  console.log("failed to submit the expense form");
                  toast.error('Expense Creation Unsuccessful', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                }
             
        }
        catch(err){
            console.log("Error saving expense:",err);
        }
       
    }
    

    const updateSaving=async(values,onSubmitProps)=>{
        try{
          const apiUrl= process.env.NODE_ENV === 'production' ?
          `https://budget-app-api-ecru.vercel.app/savings/updateSaving/${id}`
          :
          `http://localhost:3001/savings/updateSaving/${id}`
         const savingResponse=await fetch(
           //CHECK THE URL AND FIX
           //`https://budget-app-api-ecru.vercel.app/savings/updateSaving/${id}`
           apiUrl,
           {
             method:"PUT",
             headers: {
               Authorization: `Bearer ${token}`,
               "Content-Type": "application/json",
              },
            body:JSON.stringify(values),
           });
         if (savingResponse.ok)
         {
                   setSavingData(false);
                 const updateBalance=parseFloat(balance)+ parseFloat(values.amount);
                 console.log("updated balance:", updateBalance);
                 dispatch(setBalance({balance:updateBalance}));
                 toast.success('Saving Successfully Updated.', { 
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
           onSubmitProps.resetForm();
           navigate("/view/savings");
 
         }
         else{
          setSavingData(false);
           console.log("failed to submit the savings form");
           toast.error('Savings Creation Unsuccessful', {
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
         console.log("Error saving savings:",err);
        }
     
         
     }
    
     const handleFormSubmit=async(values, onSubmitProps)=>{
        try{
          
          if (isExpense)
          {
            setSavingData(true);
            values={...values,user:userId}   
           await updateExpense (values, onSubmitProps);
            console.log("submitting update expense values: ", values);
          }
          if (isSaving)
          {
            setSavingData(true);
            values={...values,user:userId}   
          await updateSaving(values, onSubmitProps); 
            console.log("submitting update saving values: ", values);
          }
        }
        catch(err)
        {
          console.err("Error submitting form:", err);
        } 
        }
if (isLoading)
{
  return <LoadingWidget/>
}
return(

<Formik
  enableReinitialize={true}
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={isExpense ? expenseSchema : savingSchema}
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
            display="grid"
            position="relative"
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
            top: isNonMobile?'50%':'50%',
            left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex:9999,
          borderRadius:4,
        }}
                        >
            {isSaving?(
        <ProgressLoadWidget text={"Updating"} name={"Saving"}/>

            ):(
        <ProgressLoadWidget text={"Updating"} name={"Expense"}/>

            )}
                        </Card>
                      )}
            <>
            <TextField
                  label="Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  name="description"
                  error={Boolean(touched.description) && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Date"
                  type="date"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.date}
                  name="date"
                  error={Boolean(touched.date) && Boolean(errors.date)}
                  helperText={touched.date && errors.date}
                  sx={{ gridColumn: "span 4" }}
                />
                 <TextField
                  label="Amount"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.amount}
                  name="amount"
                  error={Boolean(touched.amount) && Boolean(errors.amount)}
                  helperText={touched.amount && errors.amount}
                  sx={{ gridColumn: "span 4" }}
                />
               
               <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.primary.main}`}
                  borderRadius="5px"
                  p="2rem"
                  position="relative"
                >
                <Typography
                sx={{
                    position: "absolute",  // Absolute positioning for the Typography
                    top: "-1rem",  // Move the Typography up by 1 rem
                    background: "#FFF",  // Set a background color for the Typography
                    padding: "0 1rem",  // Add padding to the Typography
                }}
                >
                    Category
                </Typography>
               
                
               <Grid container spacing={2}
                 sx={{ gridColumn: "span 4" }}
                
               >
               {categories.map((category) => (
        <Grid item xs={6} sm={6} md={4} key={category._id} >
          <Button
            variant="outlined"
            fullWidth
            size="large"
            onClick={(e) => {
                e.preventDefault();
                setFieldValue("category", category.name
                )
                setSelectedCategory(category.name)
              }} 
               sx={{
                height: "52px",
                fontSize:isNonMobile?'14px':'11px',
              backgroundColor:
                selectedCategory === category.name ?` ${palette.primary.main}` : "transparent",
                color: selectedCategory === category.name ?`${palette.background.alt}`:`${palette.primary.main}`,
                "&:hover": { color: palette.primary.main },
              }}
          >
            {category.name}
          </Button>
        </Grid>
      ))}
               </Grid>
               </Box>
            
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
    {isExpense ? "Update Expense" : "Update Saving"}
  </Button>
</Box>
</form>
)}
</Formik>
)}

export default Form;