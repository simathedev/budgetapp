import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";

const AddAmount = ({ currentAmount, onClose, goalId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette } = useTheme();
//console.log("add amount Id:",goalId);
  const [amountToAdd, setAmountToAdd] = useState('');
  const token = useSelector((state) => state.token);
  const handleAmountChange = (event) => {
    setAmountToAdd(event.target.value);
  };

  const handleAddAmount = async () => {
    //console.log("id:",id)
    const parsedAmount = parseFloat(amountToAdd)+parseFloat(currentAmount);
    console.log('amount to add in goal:', parsedAmount);
    if (!isNaN(parsedAmount) && parsedAmount >= 0) {
      try {
        const response = await fetch(`http://localhost:3001/goals/addGoalAmount/${goalId}`, {
          method:"PUT",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                   },
          body: JSON.stringify({
            goalId,
            currentBalance: parsedAmount,
          }),
        });

        if (response.ok) {
          console.log('Amount updated successfully!');
          //refreshData();
        } else {
          console.error('Failed to update amount:', response.statusText);
        }
      } catch (error) {

        console.error('Fetch error:', error.message);
      }
      onClose();
    } else {

    }
  };

  return (
    <Grid container justifyContent="center" >
      <Grid item xs={4} md={4} sx={{ zIndex:1000,backgroundColor: 'white',boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius:'10px'}}>
        <Box px={6} py={3}>
          <Typography variant="h6" gutterBottom>
            Add Amount
          </Typography>
          <TextField
            label="Amount"
            type="number"
            fullWidth
            value={amountToAdd}
            onChange={handleAmountChange}
            margin="normal"
          />
          <Box mt={2} display="flex" justifyContent="flex-end">
  <Button variant="contained" color="primary" onClick={handleAddAmount}>
    Add Amount
  </Button>
  <Box ml={1}> {/* Adjust the margin-left as needed */}
    <Button variant="outlined" color="primary" onClick={onClose}>
      Cancel
    </Button>
  </Box>
</Box>

        </Box>
      </Grid>
    </Grid>
  );
};

export default AddAmount;
