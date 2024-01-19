// PlusIcon.js
import React from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const AddButton = ({ onClick }) => {
  return (
    <IconButton color="primary" onClick={onClick}>
      <AddIcon />
    </IconButton>
  );
};

export default AddButton;
