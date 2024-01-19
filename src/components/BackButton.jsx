// BackIcon.js
import React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackIcon = ({ onClick }) => {
  return (
    <IconButton color="primary" onClick={onClick}>
      <ArrowBackIcon />
    </IconButton>
  );
};

export default BackIcon;
