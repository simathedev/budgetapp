// PlusIcon.js
import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import {CurrencyExchange,Poll,Savings} from '@mui/icons-material';

const AppFeatures = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width:600px)");

  return (
<Box
sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap:'1rem',
                width:'90%',
                m:'0.3rem 0rem',
                
}}
>
<Box
sx={{
    display: 'flex',
    flexDirection:'column',
    gap:'0.3rem',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
    borderRadius:"1.5rem",
    height:{xs:'105px',sm:'130px',md:'150px'},
    width:{xs:'7rem',sm:'10rem',md:'12rem'},
    p:'1rem',
    backgroundColor:theme.palette.background.alt,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    }}
>
<CurrencyExchange/>
<Typography
sx={{fontSize: {
    md:15,sm: 12,xs: 9}}}
>
Includes Currency Convertor
</Typography>

</Box>
<Box
sx={{
    display: 'flex',
    flexDirection:'column',
    gap:'0.3rem',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
    borderRadius:"1.5rem",
    height:{xs:'105px',sm:'130px',md:'150px'},
    width:{xs:'7rem',sm:'10rem',md:'12rem'},
    p:'1rem',
    backgroundColor:theme.palette.background.alt,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    }}
>
    <Savings/>
<Typography
sx={{fontSize: {
    md:15,sm: 12,xs: 9}}}
> Add Savings, Expenses And Goals</Typography>
</Box>
<Box
sx={{
    display: 'flex',
    flexDirection:'column',
    gap:'0.3rem',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
    borderRadius:"1.5rem",
    height:{xs:'105px',sm:'130px',md:'150px'},
    width:{xs:'7rem',sm:'10rem',md:'12rem'},
    p:'1rem',
    backgroundColor:theme.palette.background.alt,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    }}
>
    <Poll/>
<Typography
sx={{fontSize: {
    md:15,sm: 12,xs: 9}}}
>
   Visually Analyze Your Finances
</Typography>
</Box>
</Box>
  );
};

export default AppFeatures;