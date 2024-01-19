import Form from "./form";
import Navbar from "../navbar";
import {Box,Typography,useTheme,useMediaQuery} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";


const EditGoalPage=()=>{
    let {pageType}=useParams();
    const isExpense = pageType === "expenses";
    const isSaving = pageType === "savings";
    const theme=useTheme();
    const isNonMobileScreens=useMediaQuery("(min-width:100px)");

    return(
       <Box>
        <Navbar/>
        <Box
            width={isNonMobileScreens?"70%":"93%"}
            p="2rem"
            m="2rem auto"
            borderRadius="1.5rem"
            backgroundColor={theme.palette.background.alt}
            >
        <Typography
        sx={{mb:"1.5rem" }}
        textAlign="center"
        fontSize="24px"
        >
           {"Edit Goal"}
        </Typography>  
        <Form/>
          </Box>
       </Box>
    )
}

export default EditGoalPage;