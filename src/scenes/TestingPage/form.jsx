import {useState} from "react";
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
import { useDispatch,useSelector } from "react-redux";
import FlexBetween from "../../components/FlexBetween";
import { setLogin } from "../../state";

  const registerSchema = yup.object().shape({
    name: yup.string().required("goal title is required"),
  });
  
  const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("email required"),
    password: yup.string().required("password required"),
  });

  const initialValuesRegister = {
    name: "",

  };
  
  const initialValuesLogin = {
    email: "",
    password: "",
  };
  

const Form=()=>{
    const [pageType, setPageType] = useState("goal");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();  
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const user = useSelector((state) => state.user);
    const userId=`${user._id}`
   const token = useSelector((state) => state.token);
    const isLogin = pageType === "login";
    const isRegister = pageType === "goal";

    const register=async (values,onSubmitProps)=>{
      /*const savedUserResponse=await fetch(
        `http://budget-app-api-ecru.vercel.app/add/goal/${userId}`,
        {
          method:"POST",
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
          body:JSON.stringify(values),
        });
      const savedUser=await savedUserResponse.json();
      onSubmitProps.resetForm();*/
      try {
        console.log("Inside goal function...");
        // ...rest of the code
      } catch (error) {
        console.error("Error in goal function:", error);
      }
    }

    const login=async(values,onSubmitProps)=>{
     /* const loggedInResponse=await fetch(
        "http://budget-app-api-ecru.vercel.app/auth/login",
        {
          method:"POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      )
      const loggedIn = await loggedInResponse.json();
      onSubmitProps.resetForm();
      if (loggedIn&&loggedIn.user) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
            balance: loggedIn.user.balance,
          })
        );
       console.log("User details: ",loggedIn.user)
        navigate("/home");
      }*/
      try {
        console.log("Inside login function...");
        // ...rest of the code
      } catch (error) {
        console.error("Error in login function:", error);
      }
    }
    const handleFormSubmit=async(values, onSubmitProps)=>{
      //if (isLogin) await login(values, onSubmitProps);
      //if (isRegister) await register(values, onSubmitProps);
      console.log("Form values:", values); // Add this line to log the values object
        try {
          console.log("Form submitted!");
    if (isLogin) await login(values, onSubmitProps);
      if (isRegister) await register(values, onSubmitProps);
        } catch (error) {
          console.error("Error submitting form:", error);
        }
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
                    {/* <TextField
                      label="Goal Title"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      name="name"
                      error={
                        Boolean(touched.name) && Boolean(errors.name)
                      }
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
                    /> */}
 <TextField
                        label="Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        name="name"
                        error={Boolean(touched.name) && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                        sx={{ gridColumn: "span 4" }}
                      />

                </>   
                        
                      )}
                      {isLogin&&(
                        <>
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
                    </>
                    )}
                      
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
                setPageType(isLogin ? "goal" : "login");
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