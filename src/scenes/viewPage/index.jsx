import { 
    Box,
    useMediaQuery, 
    Button,
    TextField,
    Typography,
    useTheme,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    LinearProgress,
    TableHead,
    TableRow,
    Paper

} from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../../scenes/navbar"; 
import { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isAction } from "@reduxjs/toolkit";
import { ConstructionOutlined, ContactSupportOutlined } from "@mui/icons-material";
import DeleteItem from "../../components/DeleteItem";
import { setBalance } from "../../state";
import UpdateBalance from "../../components/UpdateBalance";
import TopCategoryWidget from "../widgets/TopCategoryWidget";
import AddAmount from "../../components/AddGoalAmount";


const ViewPage=()=>{
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let {pageType}=useParams();
    //const [pageType, setPageType] = useState("expenses");
    const [responseData,setResponseData]=useState([]);
    const [categoryData,setCategoryData]=useState([]);
    const [deleteItemId,setDeleteItemId]=useState(null)
    const [selectedGoalId,setSelectedGoalId]=useState(null);
    const[currentBalance,setCurrentBalance]=useState(null);
    const [openAddAmount,setOpenAddAmount]=useState(false);

    const { palette } = useTheme();
    const user = useSelector((state) => state.user);
    const userId=`${user._id}`
   const token = useSelector((state) => state.token);
   const selectedCurrSymbol = useSelector((state) => state.selectedCurrSymbol);
   const selectedExchangeRate=useSelector((state)=>state.selectedExchangeRate);
   const balance=useSelector((state)=>state.balance);
    const isExpense=pageType==="expenses";
    const isSaving=pageType==="savings";
    const isGoal=pageType==="goals";
    const isTransaction=pageType==="transactions";
    const handleGoalAmount = () => {
      setOpenAddAmount((prevOpenAddAmount) => !prevOpenAddAmount);
      };
    let fetchURL="";

    const getData = async (pageType) => {
        let fetchOptions = {};
    
        switch (pageType) {
            case 'expenses':
                fetchOptions = {
                    fetchURL: `http://localhost:3001/expenses/getExpenses/${userId}`,
                };
                break;
            case 'savings':
                fetchOptions = {
                    fetchURL: `http://localhost:3001/savings/getSavings/${userId}`,
                };
                break;
            case 'goals':
                fetchOptions = {
                    fetchURL: `http://localhost:3001/goals/getGoals/${userId}`,
                };
                break;
            case 'transactions':
                fetchOptions = {
                    fetchURL: `http://localhost:3001/balance/getBalance/${userId}`,
                };
                break;
            default:
                break;
        }
    
        console.log("fetchURL: ", fetchOptions.fetchURL);
    
        if (fetchOptions.fetchURL) {
            const response = await fetch(fetchOptions.fetchURL, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
    
            const data = await response.json();
            console.log("check data fetched: ",data)
            console.log("data amount: ",data.amount);
            console.log("selected exchange rate: ",selectedExchangeRate);
            const finalAmount=parseFloat(data.amount*selectedExchangeRate).toFixed(2);
            setResponseData(data.data);
            console.log("final amount: ",finalAmount);
            console.log("response data from view page: ", data);
            
        }
    };
    const getGroupedCategories = async (pageType) => {
        let fetchOptions = {};
    
        switch (pageType) {
            case 'expenses':
                fetchOptions = {
                    fetchURL: `http://localhost:3001/expenses/groupExpenses/${userId}`,
                };
                break;
            case 'savings':
                fetchOptions = {
                    fetchURL: `http://localhost:3001/savings/groupSavings/${userId}`,
                };
            default:
                break;
        }
    
       
    
        if (fetchOptions.fetchURL) {
            const response = await fetch(fetchOptions.fetchURL, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
    
            const data = await response.json();
            console.log("check data fetched (categories): ",data)
           console.log("detailed categories",data.data.categoryTotals)
           setCategoryData(data.data.categoryTotals)
            
        }
    };
   useEffect(()=>{
    if (pageType)
    {
        getData(pageType);
        getGroupedCategories(pageType);
    }
       
    },[pageType,categoryData]);

    
    const handleDelete = async (pageType,responseData,itemId) => {
        if (deleteItemId) {
            const id=deleteItemId
          
          let fetchOptions = {};
            console.log("page type:",pageType)
          switch (pageType) {
              case 'expenses':
                  fetchOptions = {
                      fetchURL: `http://localhost:3001/expenses/deleteExpense/${id}`,
                  };
                  break;
              case 'savings':
                  fetchOptions = {
                      fetchURL: `http://localhost:3001/savings/deleteSaving/${id}`,
                  };
                  break;
              case 'goals':
                  fetchOptions = {
                      fetchURL: `http://localhost:3001/goals/deleteGoal/${id}`,
                  };
                  break;
                  case 'transactions':
                    const selectedItem = responseData.find(item => item._id === deleteItemId);
                    console.log("type: ",selectedItem.type);
                    if (selectedItem){
                        if (selectedItem.type === 'expense') {
                            fetchOptions = {
                                fetchURL: `http://localhost:3001/expenses/deleteExpense/${id}`,
                               
                            };
                        } else {
                            fetchOptions = {
                                fetchURL: `http://localhost:3001/savings/deleteSaving/${id}`,
                               
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
            setDeleteItemId(null); // Refresh the data
               getData(pageType)
            } else {
                // Handle error case
                console.log("Error deleting item:", response.statusText);
            }
        }
          // After successful deletion, update the responseData state
    
          // Close the delete confirmation popup
          console.log(deleteItemId);
         
        }
      }
 


return(
    <Box>
  <>
    <Navbar/>
    <Typography
      sx={{mb:"1.5rem" }}
      textAlign="center"
      fontSize="24px"
    >
    View {pageType}
    </Typography>

    {isGoal?(
<>
<Box padding="0rem 3rem">
    <TableContainer>
        <Table>
            <TableBody>
                {responseData.length === 0 ? (
                    <TableRow style={{ border: 'none' }}>
                        <TableCell colSpan={3} align="center" style={{ border: 'none' }}>
                            
                            <Typography
                            textAlign="center"
                            fontSize="16px"
                            >
                            No {pageType} found.
                            </Typography>
                            <Typography
       sx={{
        textDecoration: "underline",
       textAlign:"center",
       color: palette.primary.main,
        "&:hover": {
          cursor: "pointer",
          color:palette.primary.light,
        },
      }}
      textAlign="center"
      fontSize="16px"
      onClick={() => {
       navigate(`/add/${pageType}`);
      }}
    >
  Create {pageType}!
    </Typography>
                        </TableCell>
                    </TableRow>
                ) : (
                    responseData.map((data) => (
                        <TableRow key={data._id}>
                            <TableCell style={{ width: '40%' }}>
                                <div>
                                    <div><h2>{data.name} </h2></div>
                                    <div>{data.targetDate}</div>
                                </div>
                            </TableCell>
                            <TableCell style={{ textAlign: 'center' }}>
                                <div>{selectedCurrSymbol} {parseFloat(data.currentBalance*selectedExchangeRate).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2,  minimumIntegerDigits: 2, })} / {selectedCurrSymbol} {parseFloat(data.targetAmount).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2,  minimumIntegerDigits: 1, })}</div>
                                <div><LinearProgress
                                    variant="determinate"
                                    value={(data.currentBalance / data.targetAmount) * 100}
                                />
                                </div>
                            </TableCell>
                            <TableCell style={{ alignItems: 'right' }}>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <Button variant="outlined" 
                                      onClick={() => {
                                        navigate(`/edit/goal/${data._id}`);
                                       }}
                                    >Edit</Button>
                                    <Button variant="outlined" onClick={() => setDeleteItemId(data._id)}>Delete</Button>
                                       <Button variant="outlined"
                                      
                                       onClick={()=>{
                                        setSelectedGoalId(data._id)
                                        setCurrentBalance(data.currentBalance)
                                        handleGoalAmount()}}
                                       
                                       >
                                        Add Amount
                                       </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                       
                    ))
                  
                   
                )}
                
            </TableBody>
        </Table>
    </TableContainer>
    {openAddAmount&&<AddAmount goalId={selectedGoalId} currentAmount={currentBalance} onClose={handleGoalAmount}/>}
    <DeleteItem
        open={Boolean(deleteItemId)}
        onClose={() => setDeleteItemId(null)}
        onDelete={() => handleDelete(pageType,responseData,deleteItemId)}
        pageType={pageType}
        deleteItemId={deleteItemId}
    />
</Box>

    </>


    ):(
        <>
        <TopCategoryWidget categoryData={categoryData}/>
            <Box padding="0rem 3rem">
    <TableContainer>
        <Table>
            <TableBody>
            {responseData.length === 0 ? (
                    <TableRow style={{ border: 'none' }}>
                        <TableCell colSpan={3} align="center" style={{ border: 'none' }}>
                            
                            <Typography
                            textAlign="center"
                            fontSize="16px"
                            >
                            No {pageType} found.
                            </Typography>
                            <Typography
       sx={{
        textDecoration: "underline",
       textAlign:"center",
       color: palette.primary.main,
        "&:hover": {
          cursor: "pointer",
          color:palette.primary.light,
        },
      }}
      textAlign="center"
      fontSize="16px"
      onClick={() => {
       navigate(`/add/${pageType}`);
      }}
    >
  Create {pageType}!
    </Typography>
                        </TableCell>
                    </TableRow>
                ) : (
                responseData.map((data) => (
                    <TableRow key={data._id}>
                        <TableCell style={{ width: isTransaction ? '20%' : '40%',paddingLeft:isTransaction?'4rem':'2rem'}}>
                            <div>
                                <div><h2>{data.description} </h2>
                               <h4>{data.category}</h4>
                                </div>
                                <div>{data.date}</div>
                                
                            </div>
                        </TableCell >
                        <TableCell style={{ textAlign: 'center' }}>{data.type==='expense'?'-':'+'} {selectedCurrSymbol} {parseFloat(data.amount*selectedExchangeRate).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2,  minimumIntegerDigits: 2, })}</TableCell>

                        {pageType !== 'transactions' && (
                        <TableCell style={{ alignItems: 'right' }}>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                          
                                <>
                                <Button variant="outlined"
                                 onClick={() => {
                                    navigate(`/edit/${pageType}/${data._id}`);
                                   }}
                                >Edit</Button>
                                <Button variant="outlined" onClick={() => setDeleteItemId(data._id)}>Delete</Button>
                            </> 
                        
                                </div>
                        </TableCell>
                            )}
                    </TableRow>
                    
                ))
               
                )}
            </TableBody>
        </Table>
    </TableContainer>
    <DeleteItem
     open={Boolean(deleteItemId)}
     onClose={() => setDeleteItemId(null)}
     onDelete={() => handleDelete(pageType,responseData,deleteItemId)}
     pageType={pageType}
  deleteItemId={deleteItemId}
      />
</Box>
        </>
    )}


    </>
    </Box>
)

  
}
export default ViewPage;