import Form from "./form";
import {Box,Typography,useTheme,useMediaQuery} from "@mui/material";


const TestingPage=()=>{
    const theme=useTheme();
    const isNonMobileScreens=useMediaQuery("(min-width:100px)");
    return(
        <Box>
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
            width={isNonMobileScreens?"50%":"93%"}
            p="2rem"
            m="2rem auto"
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

export default TestingPage;