import Form from "./form";
import {Box,Typography,useTheme,useMediaQuery} from "@mui/material";


const LoginPage=()=>{
    const theme=useTheme();
    const isNonMobileScreens=useMediaQuery("(min-width:600px)");
    return(
        <Box 
        sx={{pb:"3rem",display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}
        >
            <Box
            width="100%"
           textAlign="center"
           padding="2rem 0rem"
           //backgroundColor={theme.palette.background.alt} 
            >
                <Typography
                fontSize="32px"
                fontWeight="bold"
                color="primary"
                >
                    BudgetBuddy
                </Typography>
            </Box>

            <Box
            width={isNonMobileScreens?"60%":"80%"}
            //maxWidth="600px"
            p="2rem"
            m="1rem auto"
            borderRadius="1.5rem"
            backgroundColor={theme.palette.background.alt}

            >
                <Typography
                sx={{mb:"1.5rem" }}
                textAlign="center"
                >
                Your Personal Finance Companion
                </Typography>
                <Form/>
            </Box>
        </Box>
    )
 
}

export default LoginPage;