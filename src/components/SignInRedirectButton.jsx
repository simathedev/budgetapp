import React from 'react';
import IconButton from '@mui/material/IconButton';
import { Typography,useTheme,Button} from '@mui/material';
import EastIcon from '@mui/icons-material/East';

const SignInButton = () => {
  const { palette } = useTheme();
  return (
    <IconButton variant="outlined" color="primary" >
     <Typography
     sx={{
      color:'white',
      padding:'0rem 0.2rem',
      fontSize:{xs:'16px',sm:'18px'},
     }}
     >
     Sign In 
      </Typography> 
      <EastIcon
        sx={{
          color:'white',
         }}
      />
    </IconButton>
  );
};

export default SignInButton;
