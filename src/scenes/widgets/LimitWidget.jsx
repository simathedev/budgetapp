import { Button,Typography,useTheme,Box } from "@mui/material";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useDispatch,useSelector } from "react-redux";
import {setBalance} from "../../state";


const LimitWidget=()=>{

return(
    <Box>
          <Typography
            variant="h4"
            padding="1rem"
            >
            No limit set...
            </Typography> 
    </Box>
)
}
export default LimitWidget;