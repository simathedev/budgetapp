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
import UpdateBalance from "../../components/UpdateBalance";
 

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

    /*const updateBalance=async()=>{
      const balanceResponse=await fetch(
        `https://budget-app-api-ecru.vercel.app/balance/updateBalance/${user._id}`,
        {
          method:"POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
           },
        }
      )
    }*/
    
    
    const getCategories=async()=>{
        const categoryResponse=await fetch(
            `https://budget-app-api-ecru.vercel.app/categories`,{
                method:"GET",
                headers: { Authorization: `Bearer ${token}` },

            })

        const data=await categoryResponse.json();
        setCategories(data);
        console.log("categories:",data);
    }
    useEffect(()=>{
            getCategories();
            },[])


    const expense=async(values,onSubmitProps)=>{
        try{
            const expenseResponse=await fetch(
                //CHECK THE URL AND FIX
              `httpsbudget-app-api-ecru.vercel.app/expenses/addExpense`,
                {
                  method:"POST",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                   },
                 body:JSON.stringify(values),
                });
                if (expenseResponse.ok){
                  const updateBalance=parseFloat(balance)- parseFloat(values.amount);
                  console.log("updated balance:", updateBalance);
                  await UpdateBalance(updateBalance,token,userId);
                  dispatch(setBalance({balance:updateBalance}));
                   //include exported function that updates balance in db
                  setOpen(true)
                  navigate("/view/expenses");
                ;
                  onSubmitProps.resetForm(); 
                }
                else{
                  console.log("failed to submit the expense form");
                }
             
        }
        catch(err){
            console.log("Error saving expense:",err);
        }
       
    }

    const saving=async(values,onSubmitProps)=>{
       try{
        const savingResponse=await fetch(
          //CHECK THE URL AND FIX
          `https://budget-app-api-ecru.vercel.app/savings/addSaving`,
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
                  const updateBalance=parseFloat(balance)+ parseFloat(values.amount);
                  console.log("updated balance:", updateBalance);
                  await UpdateBalance(updateBalance,token,userId);
          //console.log("updated balance update response:", updateResponse);
          dispatch(setBalance({balance:updateBalance}));
          setOpen(true)
          //dispatch()
          onSubmitProps.resetForm();
          navigate("/view/savings");

        }
        else{
          console.log("failed to submit the savings form");
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
        <Grid item xs={4} key={category._id} >
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