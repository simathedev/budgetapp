import { Box, Grid, useTheme, useMediaQuery } from "@mui/material"
import Navbar from "../navbar"
import BalanceWidget from "../widgets/BalanceWidget";
import ExpenseWidget from "../widgets/ExpenseWidget";
import SavingsWidget from "../widgets/SavingsWidget";
import FlexBetween from "../../components/FlexBetween";
import GoalWidget from "../widgets/GoalWidget";

const HomePage=()=>{
  const isNonMobileScreens = useMediaQuery("(min-width:600px)");

    return(
        <Box>
            <Navbar/>
            <Box padding={isNonMobileScreens?"2rem":"2rem 2rem 0rem 2rem"}>
            <BalanceWidget/>
            </Box>
            <Box padding="2rem">
            <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <ExpenseWidget />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SavingsWidget />
          </Grid>
        </Grid>
            <Box padding={isNonMobileScreens?"4rem 0rem":"2rem 0rem 0rem 0rem"}>
                <GoalWidget/>
            </Box>
            </Box>
          
        </Box>
    )
}
export default HomePage;