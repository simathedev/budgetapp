import Navbar from "../navbar";
import {Box,Typography,useTheme,useMediaQuery,Button} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {Link} from 'react-router-dom';
import BackButton from "../../components/BackButton";
import {CurrencyExchange,Poll,Savings,QuestionMark} from '@mui/icons-material';

const NotFoundPage=()=>{
    let {pageType}=useParams();
   // console.log("page type:", pageType)
    //const [pageType, setPageType] = useState("expense");
    const isExpense = pageType === "expenses";
    const isSaving = pageType === "savings";
    const theme=useTheme();
    const isNonMobileScreens=useMediaQuery("(min-width:600px)");
return(
    <Box sx={{display:'flex',flexDirection:'column',height:'100vh'}}>
        <Navbar/>
       
        <Box
            width={isNonMobileScreens?"70%":"85%"}
            p="2rem"
            m="2rem auto"
            mt="4rem"
            borderRadius="1.5rem"
            //backgroundColor={theme.palette.background.alt}
            display='flex'
            flexDirection='column'
            justifyContent="center"
            alignItems="center"
            >
         <Savings style={{fontSize:'3rem'}}  color='primary'/>
        <Typography variant='h1'fontSize={isNonMobileScreens?'4rem':'2.6rem'} color='primary' fontWeight='bold'>
    Error 404
</Typography>
<Typography variant='h4' fontSize={isNonMobileScreens?'2rem':'1.4rem'} color='primary'>
  Page Not Found
</Typography>
<Link to='/home' style={{textDecoration:'none'}}>
<Button>Return To Homepage</Button>
</Link>
          </Box>
    </Box>
)
}

export default NotFoundPage;