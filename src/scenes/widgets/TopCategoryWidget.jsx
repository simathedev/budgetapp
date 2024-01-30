import React, {useEffect, useState} from 'react';
import { Box, Typography, Paper, useTheme, Grid, useMediaQuery, IconButton } from "@mui/material";
import { useSelector,useDispatch } from "react-redux";
//import {Square} from '@mui/icons-material';
import {
  DirectionsBus,Category,
  Fastfood,Restaurant,Construction,
  SelfImprovement,Flight,Movie
  ,ShoppingBag,School,Paid,AccountBalance,
  House,VolunteerActivism,Savings,
} from '@mui/icons-material';

const TopCategoryWidget = ({ categoryData }) => {
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const selectedCurrSymbol = useSelector((state) => state.selectedCurrSymbol);
  const selectedExchangeRate=useSelector((state)=>state.selectedExchangeRate);
  const categoryIcons = {
    Transportation: <DirectionsBus/>,
    Other: <Category/>,
    Groceries: <Fastfood/>,
    DiningOut: <Restaurant/>,
    Utilities: <Construction />,
    PersonalCare: <SelfImprovement/>,
    Travel: <Flight/>,
    Entertainment: <Movie/>,
    Shopping: <ShoppingBag/>,
    Education: <School/>,
    Salary: <Paid/>,
    DebtPayments: <AccountBalance/>,
    Housing: <House/>,
    Charity: <VolunteerActivism/>,
    Investments: <Savings/>,
   
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
       
      }}
    >
      <Grid container spacing={2} display='flex' justifyContent="center" alignItems='center' width={isNonMobile?'80%':'100%'} sx={{width:{xs:'95%',sm:'60%'}}}>
        {Object.entries(categoryData).map(([category, total]) => (
         <Grid item key={category}  >
            <Box
              sx={{
               border: `1px solid ${palette.primary.main}`,
               // border:`1px solid green`,
               backgroundColor: `${palette.primary.main}`,
                borderRadius: 4,
                padding:{xs:1,md:3},
                m:{xs:0.2,md:1},
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'center',
                height:{xs:'105px',md:'150px'},
                width:{xs:'7rem',md:'10rem'},
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              {categoryIcons[category.replace(/\s/g, '')]}
              <Typography sx={{fontWeight:'700',fontSize: {
                md:15,sm: 12,xs: 9},my:1}}>{category}</Typography>
              <Typography sx={{fontSize: {
                md:15,sm: 12,xs: 9}}}>{`${selectedCurrSymbol} ${(total*selectedExchangeRate).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2,  minimumIntegerDigits: 2, })}`}</Typography>
            </Box>
         </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TopCategoryWidget;
