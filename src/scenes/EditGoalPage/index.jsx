import Form from "./form";
import Navbar from "../navbar";
import {Box,Typography,useTheme,useMediaQuery} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {Link} from 'react-router-dom';
import BackButton from "../../components/BackButton";


const EditGoalPage=()=>{
    let {pageType}=useParams();
    const isExpense = pageType === "expenses";
    const isSaving = pageType === "savings";
    const theme=useTheme();
    const isNonMobileScreens=useMediaQuery("(min-width:600px)");

    return(
       <Box>
        <Navbar/>
        <Link to={`/view/goals`} style={{textDecoration:'none'}}>
        <BackButton/>
        </Link>
        <Box
            width={isNonMobileScreens?"70%":"85%"}
            p="2rem"
            m="2rem auto"
            borderRadius="1.5rem"
            backgroundColor={theme.palette.background.alt}
            >
        <Typography
        sx={{mb:"1.5rem",
        fontSize:{xs:"20px",sm:'24px'},
        textAlign:"center"
      }}
        >
           {"Edit Goal"}
        </Typography>  
        <Form/>
          </Box>
       </Box>
    )
}

export default EditGoalPage;