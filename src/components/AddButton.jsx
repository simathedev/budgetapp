// PlusIcon.js
import React from 'react';
import {Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddButton = ({ onClick }) => {
  return (
    <Button variant="outlined" color="primary" onClick={onClick}>
      <AddIcon />Add
    </Button>
  );
};

export default AddButton;
