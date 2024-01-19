import React, {useState} from 'react';
import { Box, Typography, Paper, useTheme, Grid, IconButton } from "@mui/material";
import {GitHub,Email,LinkedIn,Close} from '@mui/icons-material';
import { Link } from "react-router-dom";

import FlexBetween from './FlexBetween';

const CreditsWidget = ({handleHelpClicked}) => {
  const { palette } = useTheme();
  const [helpClick, setHelpClicked] = useState(false);

  const handleCloseClick = () => {
    setHelpClicked(false);
  };
  return (
      <Grid container sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        p: 2,
        position:'absolute',
        top:'40%',
        zIndex: '1000'
      }}>
       
    
          <Grid item xs={12} sm={12} >
     
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
                position:'relative',
              }}
            >
                   <IconButton
        sx={{
          position: 'absolute',
          top: '0',
          right: '4px',
          color: 'black',
        }}
        onClick={handleHelpClicked}
      >
        <Close />
      </IconButton>
              <Typography sx={{fontWeight:'700',fontSize:'1rem',my:1}}>BudgetBuddy</Typography>
              <Typography sx={{my:2, width:'70%',textAlign:'center'}}>I have created an expense tracker app. I hope you had a great user experience.
                Feel free to reach out to me.
              </Typography>

              <FlexBetween>
            <Link to="https://github.com/simathedev">
            <GitHub/>
            </Link>
              
              <Link to="mailto:simathedev@gmail.com">
              <Email/>
              </Link>
              <Link to="https://www.linkedin.com/in/simanye-m-b2118a221">
              <LinkedIn/>
              </Link>
              
              </FlexBetween>
            </Box>
          </Grid>
        
      </Grid>

  );
};

export default CreditsWidget;
