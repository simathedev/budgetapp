// UpdateBalance.js
const UpdateBalance = async (currentBalance, token, userId) => {
  try {
    const values={balance: currentBalance} 
    const balanceResponse = await fetch(
      `https://budget-app-api-ecru.vercel.app/balance/updateBalance/${userId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

    if (balanceResponse.ok) {
      // The balance was updated successfully
      return true; // Indicate success
    } else {
      const errorData = await balanceResponse.json(); // Try to get more details about the error
      console.log("Failed to update balance:", errorData);
      return false; // Indicate failure
    }
  } catch (error) {
    console.error("Error updating balance: ", error);
    return false; // Indicate failure
  }
};

export default UpdateBalance;

  