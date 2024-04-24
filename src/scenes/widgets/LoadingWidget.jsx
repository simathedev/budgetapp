import { Button,Typography,useTheme,Box } from "@mui/material";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useDispatch,useSelector } from "react-redux";
import {setBalance} from "../../state";
import {CurrencyExchange,Poll,Savings,QuestionMark} from '@mui/icons-material';



const LoadingWidget=()=>{
const theme=useTheme();
const primary=theme.palette.primary.main
return(
    <Box sx={{height:"100vh",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            }}>
            <Savings style={{fontSize:'3rem'}}  color='primary'/>
          <Typography
            variant="h2"
            padding="1rem"
            color="primary"
            fontWeight="bold"
            >
           Loading...
            </Typography> 
    </Box>
)
}
export default LoadingWidget;