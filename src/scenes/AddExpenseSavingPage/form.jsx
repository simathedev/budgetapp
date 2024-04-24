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
  import { setBalance } from "../../state";
  import FlexBetween from "../../components/FlexBetween";
import { Label } from "@mui/icons-material";
import UpdateBalance from "../../components/UpdateBalance";
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

  const initialValuesExpense= {
    user:"",
    description: "",
    date: "",
    amount:0,
    category: "",
  };

 const initialValuesSaving= {
    user:"",
    description: "",
    date: "",
    amount:0,
    category: "",
  };
  
  
  const Form=()=>{
    
   const [categories,setCategories]=useState([]);
   const [selectedCategory,setSelectedCategory]=useState("");
   const [isLoading,setIsLoading]=useState(true);
   const [savingData, setSavingData]=useState(false);
   let {pageType}=useParams();
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();  
    const user = useSelector((state) => state.user);
    const userId=`${user._id}`
   // console.log("userID:",userId)
   const token = useSelector((state) => state.token);
   const balance=useSelector((state)=>state.balance);
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
    
    
    const getCategories=async()=>{
      const apiUrl=process.env.NODE_ENV === 'production' ?
      `https://budget-app-api-ecru.vercel.app/categories`:
      `http://localhost:3001/categories`

        const categoryResponse=await fetch(
            //`https://budget-app-api-ecru.vercel.app/categories`
            apiUrl
            ,{
                method:"GET",
                headers: { Authorization: `Bearer ${token}` },

            })
            if (categoryResponse.ok)
            {
              const data=await categoryResponse.json();
              setCategories(data);
              console.log("categories:",data);
              setIsLoading(false);
            }
   
    }
    useEffect(()=>{
            getCategories();
            },[])


    const expense=async(values,onSubmitProps)=>{
        try{
          const apiUrl=process.env.NODE_ENV === 'production' ?
          `https://budget-app-api-ecru.vercel.app/expenses/addExpense`
          :
          `http://localhost:3001/expenses/addExpense`
            const expenseResponse=await fetch(
                //CHECK THE URL AND FIX
             // `https://budget-app-api-ecru.vercel.app/expenses/addExpense`
             apiUrl,{
                  method:"POST",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                   },
                 body:JSON.stringify(values),
                });
                if (expenseResponse.ok){
                  setSavingData(false)
                  const updateBalance=parseFloat(balance)- parseFloat(values.amount);
                  console.log("updated balance:", updateBalance);
                  await UpdateBalance(updateBalance,token,userId);
                  dispatch(setBalance({balance:updateBalance}));
                   //include exported function that updates balance in db
                  setOpen(true)
                  toast.success('Expense Successfully Created.', { 
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
                }
             
        }
        catch(err){
            console.log("Error saving expense:",err);
            toast.error('Expense Creation Unsuccessful', {
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

    const saving=async(values,onSubmitProps)=>{
       try{
        const apiUrl=process.env.NODE_ENV === 'production' ?
        `https://budget-app-api-ecru.vercel.app/savings/addSaving`
        :
        `http://localhost:3001/savings/addSaving`
        const savingResponse=await fetch(
        
          //`https://budget-app-api-ecru.vercel.app/savings/addSaving`
          apiUrl,
          {
            method:"POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
             },
           body:JSON.stringify(values),
          });
        if (savingResponse.ok)
        {
          setSavingData(false)
                  const updateBalance=parseFloat(balance)+ parseFloat(values.amount);
                  console.log("updated balance:", updateBalance);
                  await UpdateBalance(updateBalance,token,userId);
          //console.log("updated balance update response:", updateResponse);
          dispatch(setBalance({balance:updateBalance}));
          setOpen(true)
          toast.success('Savings Successfully Created.', { 
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
          //dispatch()
          onSubmitProps.resetForm();
          navigate("/view/savings");

        }
        else{
          setSavingData(false)
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
   /* const isSuccess = UpdateBalance(balance,token,userId)
    if (!isSuccess) {
      console.log("Failed to update balance on the server");
    }*/
    const handleFormSubmit=async(values, onSubmitProps)=>{
      try{
        setSavingData(true)
        if (isExpense)
        {
          values={...values,user:userId}   
          await expense(values, onSubmitProps);
          console.log("submitting expense values: ", values);
        }
        if (isSaving)
        {
          values={...values,user:userId}   
          await saving(values, onSubmitProps); 
          //const updateBalance=parseFloat(balance)+ parseFloat(values.amount);
          //console.log("updated balance:", updateBalance);
  //const updateResponse=
  //await UpdateBalance(updateBalance,token,userId);
          console.log("submitting saving values: ", values);
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

          return (
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={isExpense ? initialValuesExpense : initialValuesSaving}
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
            top: '50%',
            left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex:9999,
          borderRadius:4,
        }}
                        >
                        {isSaving?(
                      <ProgressLoadWidget text={"Adding"} name={"Saving"}/>

                        ):(
                          <ProgressLoadWidget text={"Adding"} name={"Expense"}/>

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
              {isExpense ? "Add Expense" : "Add Saving"}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
          )
  }

  export default Form;