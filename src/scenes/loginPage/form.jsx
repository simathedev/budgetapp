import { useState , useEffect } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
  } from "@mui/material";
  import { Formik } from "formik";
  import * as yup from "yup";
  import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../state";
import { setBalance } from "../../state";
import {setCurrency} from '../../state';
import {setBaseCurrency} from '../../state';
import FlexBetween from "../../components/FlexBetween";
import CalculateCurrency from "../../components/CalculateCurrency";
import ChooseCurrency from "../../components/RegistrationCurrency";
import currency_symbols from '../../countrySymbols';

  const registerSchema = yup.object().shape({
    firstName: yup.string().required("first name required"),
    lastName: yup.string().required("last name required"),
    balance:yup.number().required("balance is required"),
    email: yup.string().email("invalid email").required("email required"),
    password: yup.string().required("password required"),
    currency: yup.string(),
  });
  
  const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("email required"),
    password: yup.string().required("password required"),
  });

  const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    balance:0,
    currency:'ZAR',
    password: "",
  };
  
  const initialValuesLogin = {
    email: "",
    password: "",
  };
  

const Form=()=>{
    const [pageType, setPageType] = useState("login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();  
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";
    const selectedCurrency=useSelector((state)=>state.selectedCurrency)
  

    const register=async (values,onSubmitProps)=>{
      console.log(" currency in register section: ", selectedCurrency)
      const registrationData = {
        ...values,
        currency: selectedCurrency, // Get the currency from the Redux store
      };
      const apiUrl=process.env.NODE_ENV === 'production' ?
      "https://budget-app-api-ecru.vercel.app/auth/register"
      :
      "http://localhost:3001/auth/register"

      const savedUserResponse=await fetch(
        //"https://budget-app-api-ecru.vercel.app/auth/register"
        apiUrl,{
          method:"POST",
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
          body:JSON.stringify(registrationData),
        });
      const savedUser=await savedUserResponse.json();
      onSubmitProps.resetForm();

      if (savedUser){
        setPageType("login");
      }
    }

    const login=async(values,onSubmitProps)=>{
      const apiUrl=process.env.NODE_ENV === 'production' ?
      "https://budget-app-api-ecru.vercel.app/auth/login"
      :
      "http://localhost:3001/auth/login"

      const loggedInResponse=await fetch(
        //"https://budget-app-api-ecru.vercel.app/auth/login"
        apiUrl,{
          method:"POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      )
      const loggedIn = await loggedInResponse.json();
      onSubmitProps.resetForm();
      if (loggedIn&&loggedIn.user) {
      const  UpdatedBalance=loggedIn.user.balance;
      const newExchangeRate= await CalculateCurrency(loggedIn.user.currency,loggedIn.user.currency);
      const selectedSymbol =await currency_symbols[loggedIn.user.currency];
      /* dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          }),
          setBalance({
             balance: UpdatedBalance,
          })
        );*/

        dispatch({
          type: setLogin.type,
          payload: {
            user: loggedIn.user,
            token: loggedIn.token,
          }
        });
        
        dispatch({
          type: setBalance.type,
          payload: {
            balance: UpdatedBalance,
          }
        });
        dispatch({
          type:setBaseCurrency.type,
          payload:{
            baseCurrency:loggedIn.user.currency,
          }
        })
       localStorage.setItem("selectedCurrency", loggedIn.user.currency);
       localStorage.setItem("selectedCurrSymbol", selectedSymbol);
        localStorage.setItem("selectedExchangeRate",newExchangeRate);
       dispatch(setCurrency({  selectedCurrency: loggedIn.user.currency, selectedCurrSymbol:selectedSymbol,selectedExchangeRate:newExchangeRate}));
      console.log("new exchange rate from login page: ", newExchangeRate);
       console.log("User details: ",loggedIn.user)
       console.log("user currency: ",loggedIn.user.currency)
       console.log("balance logged user: ",loggedIn.user.balance)
        navigate("/home");
      }

    }
    const balanceCheck=useSelector((state)=>state.balance)
    console.log("balanceCheck testing: ",balanceCheck)


    const handleFormSubmit=async(values, onSubmitProps)=>{
      if (isLogin) await login(values, onSubmitProps);
      if (isRegister) await register(values, onSubmitProps);    
    }


        return (
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
              validationSchema={isLogin ? loginSchema : registerSchema}
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
                })=>(
                    <form onSubmit={handleSubmit}>
                     <Box
                      display="grid"
                      gap="30px"
                      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                      sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                      }}
                     >
                      {isRegister && (
                        <> 
                      <TextField
                      label="First Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                      name="firstName"
                      error={
                        Boolean(touched.firstName) && Boolean(errors.firstName)
                      }
                      helperText={touched.firstName && errors.firstName}
                      sx={{ gridColumn: "span 2" }}
                      />

                      <TextField
                      label="Last Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                      name="lastName"
                      error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                      sx={{ gridColumn: "span 2" }}
                    />

              <TextField
              label="Current Balance"
              placeholder="enter current amount you have e.g, 50"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.balance}
              name="balance"
              error={Boolean(touched.balance) && Boolean(errors.balance)}
              helperText={touched.balance && errors.balance}
              sx={{ gridColumn: "span 2" }}
            />
            <ChooseCurrency/>
                </>   
                        
                      )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
           
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
            </Box> 

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
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
               textAlign:"center",
               color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color:palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
            </Box>

                    </form>
                )}
                
            </Formik>
        )
}

export default Form;