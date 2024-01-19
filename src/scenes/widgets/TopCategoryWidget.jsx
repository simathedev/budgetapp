import React, {useEffect, useState} from 'react';
import { Box, Typography, Paper, useTheme, Grid, IconButton } from "@mui/material";
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
  const selectedCurrSymbol = useSelector((state) => state.selectedCurrSymbol);
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
        alignContent: 'center',
        p: 2,
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        {Object.entries(categoryData).map(([category, total]) => (
          <Grid item key={category} xs={6} sm={3}>
            <Box
              sx={{
                border: `1px solid ${palette.primary.main}`,
                backgroundColor: `${palette.primary.main}`,
                borderRadius: 4,
                p: 3,
                m:2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height:'100%',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              {categoryIcons[category.replace(/\s/g, '')]}
              <Typography sx={{fontWeight:'700',fontSize:'1rem',my:1}}>{category}</Typography>
              <Typography>{`${selectedCurrSymbol} ${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2,  minimumIntegerDigits: 2, })}`}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TopCategoryWidget;
