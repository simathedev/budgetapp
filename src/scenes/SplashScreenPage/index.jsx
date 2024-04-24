import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import AppFeatures from "../../components/AppFeatures";
import SignInButton from "../../components/SignInRedirectButton";
import { Link } from "react-router-dom";

const SplashPage = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width:600px)");

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                marginBottom:'4rem',
                //borderRadius:"1.5rem",
                //backgroundColor:theme.palette.background.alt
                backgroundColor:theme.palette.primary.main
            }}
        >
            <Box
                width="100%"
                padding="0rem"
            >
                <Typography
                sx={{
                    fontSize:{xs:"44px",sm:"55px"},
                    fontWeight:"bold",
                    color:"white"
                }}   
                >
                    BudgetBuddy
                </Typography>
            </Box>

            <Box
                p="2rem"
                m="1rem auto"
                borderRadius="1.5rem"
                //backgroundColor={theme.palette.background.alt}

            >
                <Typography
                    sx={{ mb: "1.5rem", color:'white',fontSize:{xs:'16px',sm:'18px'} }}
                >
                    Your Personal Finance Companion
                </Typography>
            </Box>
            <AppFeatures/>
            <Box sx={{mt:'1rem'}}>
            <Link to='/signIn' >   
            <SignInButton />
            </Link>
            </Box>
           
        </Box>
    );
};

export default SplashPage;
