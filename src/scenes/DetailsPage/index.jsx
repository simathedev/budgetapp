import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  useMediaQuery,
  Typography,
  IconButton,
  Collapse,
  Alert,
  useTheme,
  Card,
  } from "@mui/material";
  import { Formik } from "formik";
  import {Close } from '@mui/icons-material';
import * as yup from "yup";
import { useNavigate,useParams,Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { setBalance } from "../../state";
import FlexBetween from "../../components/FlexBetween";
import { Label } from "@mui/icons-material"; 
import { toast } from 'react-toastify'; 
import Navbar from "../navbar";
import BackButton from "../../components/BackButton";
import DeleteItem from "../../components/DeleteItem";
import UpdateBalance from "../../components/UpdateBalance";
import {
    DirectionsBus,Category,
    Fastfood,Restaurant,Construction,
    SelfImprovement,Flight,Movie
    ,ShoppingBag,School,Paid,AccountBalance,
    House,VolunteerActivism,Savings,
  } from '@mui/icons-material';
  import TopCategoryWidget from "../widgets/TopCategoryWidget";
import AddButton from "../../components/AddButton";
import LoadingWidget from "../widgets/LoadingWidget";

  const DetailsPage =() => {
   const [category,setCategory]=useState("");
   const [responseData,setResponseData]=useState([]);
   const [isLoading,setIsLoading]=useState(true);
   const { palette } = useTheme();
   const fontPrimary=palette.background.default;
   //change to get page
   let {pageType,id}=useParams();
    console.log("edit page + pageType editpage: ",pageType);
    console.log("id from useParams editpage: ",id);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const balance=useSelector((state)=>state.balance);
    const [deleteItemId,setDeleteItemId]=useState(null)
    const selectedCurrSymbol = useSelector((state) => state.selectedCurrSymbol);
    const selectedExchangeRate=useSelector((state)=>state.selectedExchangeRate);
    const userId=`${user._id}`
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isExpense = pageType === "expenses";
    const isSaving = pageType === "savings";
    const isGoal=pageType==="goals";
    let pageVariable=""
    if (pageType==="expenses")
    {
       pageVariable="expense"
    }
    else if (pageType==="savings")
    {
      pageVariable="saving"
    }
   else if(pageType==="goals")
    {
        pageVariable="goals"
    }
    
    const categoryIcons = {
        Transportation: <DirectionsBus/>,
        Other: <Category/>,
        Groceries: <Fastfood/>,
        DiningOut: <Restaurant/>,
        Utilities: <Construction />,
        PersonalCare: <SelfImprovement/>,
        Travel: <Flight/>,
        Entertainment: <Movie/>,
        Shopping: <ShoppingBag/>,
        Education: <School/>,
        Salary: <Paid/>,
        DebtPayments: <AccountBalance/>,
        Housing: <House/>,
        Charity: <VolunteerActivism/>,
        Investments: <Savings/>,
       
      };


    const getIdData = async (pageType, id) => {
        let fetchOptions = {};
        console.log("pagetype:", pageType);
        console.log("id:", id);
        const apiUrl =
            process.env.NODE_ENV === "production"
                ? `https://budget-app-api-ecru.vercel.app`
                : `http://localhost:3001`;
    
        switch (pageType) {
            case "expenses":
                fetchOptions = {
                    fetchURL: `${apiUrl}/expenses/getExpense/${id}`,
                };
                break;
            case "savings":
                fetchOptions = {
                    fetchURL: `${apiUrl}/savings/getSaving/${id}`,
                };
                break;
            case "goals":
                fetchOptions = {
                    fetchURL: `${apiUrl}/goals/getGoal/${id}`,
                };
                break;
            default:
                break;
        }
    
        console.log("fetchURL for get Id: ", fetchOptions.fetchURL);
    
        if (fetchOptions.fetchURL) {
            try {
                const response = await fetch(fetchOptions.fetchURL, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                if (response.ok)
                {
                const data = await response.json();
                   if(pageType==='goals')
                   {
                    setResponseData(data.data); // Assuming data is an array or object
                    console.log("goald data from view details Page: ", data.data);

                   }
                   else if(pageType==='savings')
                   {
                    setResponseData(data.data[0]); // Assuming data is an array or object
                    console.log("saving data from view details Page: ", data.data[0]);
                    console.log("category: ", data.data[0].category)
                    setCategory(data.data[0].category)
                   }
                   else
                {
                   setResponseData(data.data); // Assuming data is an array or object
                    console.log("expense data from view details Page: ", data.data);
                    console.log("category: ", data.data.category)
                    setCategory(data.data.category)
                }
                setIsLoading(false);
            }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    };
    
    
    useEffect(() => {
    getIdData(pageType, id);
    }, [pageType, id]);
    
              
              const handleDelete = async (pageType,responseData,itemId) => {
                const apiUrl=process.env.NODE_ENV === 'production' ?
                    `https://budget-app-api-ecru.vercel.app`
                    :
                    `http://localhost:3001`
                if (deleteItemId) {
                    const id=deleteItemId
                  let fetchOptions = {};
                    console.log("page type:",pageType)
                  switch (pageType) {
                      case 'expenses':
                          fetchOptions = {
                              fetchURL: `${apiUrl}/expenses/deleteExpense/${id}`,
                          };
                          break;
                      case 'savings':
                          fetchOptions = {
                              fetchURL: `${apiUrl}/savings/deleteSaving/${id}`,
                          };
                          break;
                      case 'goals':
                          fetchOptions = {
                              fetchURL: `${apiUrl}/goals/deleteGoal/${id}`,
                          };
                          break;
                          case 'transactions':
                            const selectedItem = responseData.find(item => item._id === deleteItemId);
                            console.log("type: ",selectedItem.type);
                           /* const apiUrl=process.env.NODE_ENV === 'production' ?
                            `https://budget-app-api-ecru.vercel.app`
                            :
                            `http://localhost:3001`*/
                            if (selectedItem){
                                if (selectedItem.type === 'expense') {
                                    fetchOptions = {
                                        fetchURL: `${apiUrl}/expenses/deleteExpense/${id}`,
                                       
                                    };
                                } else {
                                    fetchOptions = {
                                        fetchURL: `${apiUrl}/savings/deleteSaving/${id}`,
                                       
                                    };
                            }
                        }
                            else{
                                console.log("Selected item not found in responseData.")
                            }
                                                
                            break;
                        
                      default:
                          break;
                  }
                  if (fetchOptions.fetchURL) {
                   
                    const selectedItem = responseData.find(item => item._id === deleteItemId);
                    console.log("inside fetch options ,type: ",selectedItem.type);
                    const deletedAmount= selectedItem.amount;
                    console.log("deleted amount: ",deletedAmount);
                    const response = await fetch(fetchOptions.fetchURL, {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    });
                
                    if (response.ok) {
                        // Delete was successful, update the responseData state
                       if(selectedItem.type==='expense'){
                        const updateBalance=parseFloat(balance)+ parseFloat(deletedAmount);
                        await UpdateBalance(updateBalance,token,userId);
                        console.log("updated balance:", updateBalance);
        
                        dispatch(setBalance({balance:updateBalance}));
                       }
                       else if(selectedItem.type==='saving'){
                        const updateBalance=parseFloat(balance)- parseFloat(deletedAmount);
                        await UpdateBalance(updateBalance,token,userId);
                        console.log("updated balance:", updateBalance);
                        dispatch(setBalance({balance:updateBalance}));
                       }
                       else{
                        console.log("data type is not expense or saving in delete function")
                       }
                    setDeleteItemId(null);
                       getIdData(pageType)
                      // getGroupedCategories(pageType);
                    
                    } else {
                        // Handle error case
                        console.log("Error deleting item:", response.statusText);
                    }
                }
                  console.log(deleteItemId);
                 
                }
              }

    if (isLoading)
    {
        return <LoadingWidget/>
    }
return(
<Box sx={{ width: '100%',display:'flex',flexDirection:'column' }}>
    <Navbar/>
    <Link to='/home' style={{textDecoration:'none'}}>
    <BackButton/>
</Link>

    <Box sx={{ml:2}}>
    <AddButton
    onClick={() => {
        navigate(pageType!='goals'?`/add/${pageType}`:`/add/goal`);
       }}
    
    />
    </Box>

    <Card sx={{width:'80%',py:2, pl:6,borderRadius:4,mx:4,my:2,height:'50vh', display:'flex',flexDirection:'column',alignItems:'left',justifyContent:'center'}}>
{pageType==='goals'&&(
    <>
    <Typography variant={isNonMobile?"h3":"h4"} color="primary" fontWeight="bold">{responseData?.name} </Typography>
    <Box sx={{display:'flex'}}>
<Typography variant={isNonMobile?"h4":"h5"} fontWeight='500'>Amount: {selectedCurrSymbol} {responseData?.currentBalance} / {selectedCurrSymbol} {responseData?.targetAmount}</Typography>
</Box>
<Typography>Target Date: {responseData?.targetDate}</Typography>



    </>

)}
{pageType==='savings'&&(
    <>
    <Grid item sx={{ paddingY:'2rem',}}>
    <Box
      sx={{
        border: `1px solid ${palette.primary.main}`,
        backgroundColor: `${palette.primary.main}`,
        borderRadius: 4,
        padding: { xs: 1, md: 3 },
        m: { xs: 0.2, md: 1 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        height: { xs: '105px', md: '150px' },
        width: { xs: '7rem', md: '10rem' },
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
       
      }}
    >
      {/* Display the icon */}
      {categoryIcons[category.replace(/\s/g, '')]}
      <Typography sx={{ fontWeight: '700', fontSize: { md: 15, sm: 12, xs: 9 }, my: 1 }}>
        {/* Display the category name */}
        {category}
      </Typography>
    </Box>
  </Grid>
<Box>
<Typography variant={isNonMobile?"h3":"h4"} color="primary" fontWeight="bold" marginBottom="1rem">{responseData?.description}</Typography>
    <Typography variant={isNonMobile?"h4":"h5"} fontWeight='500'>Amount: {selectedCurrSymbol} {responseData?.amount}</Typography>
    <Typography>Date: {responseData?.date}</Typography>

</Box>


</>

)}
{pageType==='expenses'&&(
    <>
 <Grid item>
    <Box
      sx={{
        border: `1px solid ${palette.primary.main}`,
        backgroundColor: `${palette.primary.main}`,
        borderRadius: 4,
        padding: { xs: 1, md: 3 },
        m: { xs: 0.2, md: 1 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        height: { xs: '105px', md: '150px' },
        width: { xs: '7rem', md: '10rem' },
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Display the icon */}
      {categoryIcons[category.replace(/\s/g, '')]}
      <Typography sx={{ fontWeight: '700', fontSize: { md: 15, sm: 12, xs: 9 }, my: 1 }}>
        {/* Display the category name */}
        {category}
      </Typography>
    </Box>
  </Grid>
<Box sx={{my:2}}>
<Typography variant={isNonMobile?"h3":"h4"} marginBottom="1rem" color="primary" fontWeight="bold">{responseData?.description}</Typography>
<Typography variant={isNonMobile?"h4":"h5"} fontWeight='500'>Amount: {selectedCurrSymbol} {responseData?.amount}</Typography>
<Typography>Date: {responseData?.date}</Typography>
</Box>

    </>

)}
<Box sx={{my:2}}>
<Button variant="contained"
 sx={{ color: fontPrimary }}
 onClick={() => {
    pageType==='goals'?
    navigate(`/edit/goal/${responseData._id}`):
    navigate(`/edit/${pageType}/${responseData._id}`);
   }}
>Edit
</Button>   
</Box>
                             

{/*<Button variant="outlined" onClick={() => setDeleteItemId(responseData._id)}>Delete</Button>*/}
</Card>
<DeleteItem
        open={Boolean(deleteItemId)}
        onClose={() => setDeleteItemId(null)}
        onDelete={() => handleDelete(pageType,responseData,deleteItemId)}
        pageType={pageType}
        deleteItemId={deleteItemId}
    />
</Box>
)
}

export default DetailsPage;