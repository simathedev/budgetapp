import {useState} from "react";
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery,
  } from "@mui/material";
  import{
    DarkMode,
    LightMode,
    Help,
    Menu,
    Close,
    CenterFocusStrong
  } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "../../components/FlexBetween";
import { setMode, setLogout } from "../../state/index";
import { useNavigate } from "react-router-dom";
import CurrencyConvert from "../../components/CurrencyConvert";
import CreditsWidget from "../../components/Credits";

  
  const Navbar=()=>{
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
   const[helpClick,setHelpClicked]=useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const selectedCurrency = useSelector(state => state.selectedCurrency);
    const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  
  const handleHelpClicked = () => {
    setHelpClicked(!helpClick);
  };
  
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const fullName = `${capitalizeFirstLetter(user.firstName)} ${capitalizeFirstLetter(user.lastName)}`;
  const handleLogout = () => {
   // dispatch(setLogout());
    navigate("/signIn");
  };
    return(
      <>
        <FlexBetween padding="1rem 6%">
            <FlexBetween gap="1.75rem">
            <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="primary"
            onClick={() => navigate("/home")}
            sx={{
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
            >
        BudgetBuddy
        </Typography>
        </FlexBetween> 
        {/*DESKTOP NAV*/}
        {isNonMobileScreens? (
         <FlexBetween gap="2rem">
            <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Help sx={{ fontSize: "25px" }} onClick={handleHelpClicked} />
          <CurrencyConvert/>
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Select>
          </FormControl>

        </FlexBetween>
        ):(
            <IconButton
            onClick={()=>setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
                <Menu/>
            </IconButton>
        )}   

        {/*MOBILE NAV*/}
        {!isNonMobileScreens && isMobileMenuToggled && (
            <Box
            position="fixed"
            right="0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth="500px"
            minWidth="300px"
            backgroundColor={background}
          >
            {/* CLOSE ICON */}
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <Close />
              </IconButton>
            </Box>
  

                {/*MENU ITEMS */}
                <FlexBetween
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap="3rem"
                >
                    <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton> 
            <Help sx={{ fontSize: "25px" }} onClick={handleHelpClicked}/>
           
            <CurrencyConvert/>
                <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  textAlign:"center",
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl> 
                </FlexBetween>
            </Box>
        )}
        </FlexBetween>
        {helpClick&&<CreditsWidget handleHelpClicked={handleHelpClicked}/>}
        </>
    )
  }

  export default Navbar;