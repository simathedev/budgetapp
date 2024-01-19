import Form from "./form";
import {Box,Typography,useTheme,useMediaQuery} from "@mui/material";
import Navbar from "../../scenes/navbar";


const GoalPage=()=>{
const theme=useTheme();
const isNonMobileScreens=useMediaQuery("(min-width:100px)");

    return(
        <Box>
       <Navbar/>
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
                Add A Goal
            </Typography>
            <Form/>
        </Box>
    </Box>
    )
}

export default GoalPage;