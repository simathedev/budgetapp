// PlusIcon.js
import React from 'react';
import {Button,useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddButton = ({ onClick }) => {
  const {palette}=useTheme();
  const fontPrimary=palette.background.default;
  return (

    <Button variant="contained"  color="primary" sx={{ color: fontPrimary }} onClick={onClick}>
      <AddIcon sx={{ color: fontPrimary }} />Add
    </Button>
  );
};

export default AddButton;
