import {useState} from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    IconButton,
    Collapse,
    Alert,
    AlertTitle,
    useTheme,
    Card,
  } from "@mui/material";
  import {Close } from '@mui/icons-material';
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { toast } from 'react-toastify';
import ProgressLoadWidget from "../widgets/ProgressLoadWidget";
import FlexBetween from "../../components/FlexBetween";


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

const Form=()=>
{
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const user = useSelector((state) => state.user);
    const userId=`${user._id}`
   const token = useSelector((state) => state.token);
   const [open, setOpen] = useState(false);
   const [saving,setSaving]=useState(false);
   
    const goal=async(values,onSubmitProps)=>{
        try {
          const apiUrl=process.env.NODE_ENV === 'production' ?
          `https://budget-app-api-ecru.vercel.app/goals/addGoal`
          :
          `http://localhost:3001/goals/addGoal`

        const goalResponse=await fetch(
          //`https://budget-app-api-ecru.vercel.app/goals/addGoal`
          apiUrl,
          {
            method:"POST",
            headers: {
               Authorization: `Bearer ${token}`,
               "Content-Type": "application/json",
              },
            body:JSON.stringify(values),
          }
        )
        if(goalResponse.ok){
            setSaving(false);
            onSubmitProps.resetForm();
            toast.success('Goal Successfully Created.', { 
              autoClose: 5000, 
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
           
            navigate("/view/goals");
        }

        else{
          setSaving(false);
            console.log("failed to submit the goal form");
            toast.error('Goal Creation Unsuccessful', {
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
          catch (error) {
            console.error("Error in goal function:", error);
          }
      
      }


      const handleFormSubmit = async (values, onSubmitProps) => {
        try {
          setSaving(true);
           values={...values,user:userId}      
          await goal(values, onSubmitProps);
          console.log("submitting goal values: ", values);
         
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      };
      

    return(
        <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValuesGoal}
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
                })=>(
                    <form onSubmit={handleSubmit}>
                      <Box
                      position="relative"
                      display="grid"
                      gap="30px"
                      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                      sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                      }}>
                       
                      {saving&&(
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
                      <ProgressLoadWidget text={"Saving"} name={"Goal"}/>
                        </Card>
                      )}
                       
                      <TextField
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
              {"Add Goal"}
            </Button>
            </Box>
            
            </form>
                )}
        </Formik>
   
)    
}

export default Form;