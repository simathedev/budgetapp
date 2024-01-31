import {Navigate,Routes,Route} from 'react-router-dom';
import LoginPage from './scenes/loginPage';
import HomePage from './scenes/homePage';
import AddExpenseSavingPage from './scenes/AddExpenseSavingPage';
import {useMemo} from "react";
import{useSelector} from "react-redux";
import {CssBaseline,ThemeProvider} from "@mui/material";
import { createTheme } from '@mui/material';
import { themeSettings } from './theme';
import state from './state';
import ViewPage from './scenes/viewPage';
import GoalPage from './scenes/goalsPage';
import EditGoalPage from './scenes/EditGoalPage';
import EditPage from './scenes/EditPage';
import DeleteItem from './components/DeleteItem';
import SplashPage from './scenes/SplashScreenPage';
import CalculateCurrency from './components/CalculateCurrency';
function App() {
  const mode=useSelector ((state)=>state.mode);
  const theme=useMemo(()=>createTheme(themeSettings(mode)),[mode]);
  const isAuth= Boolean(useSelector((state)=>state.token));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
   <Routes>
   <Route path="/" element={<SplashPage/>}/>
    <Route path="/signIn" element={<LoginPage/>}/>
    <Route path="/home" element={<HomePage/>}/>
    <Route path="/add/:pageType?" element={<AddExpenseSavingPage/>}/>
    <Route path="/view/:pageType?" element={<ViewPage/>}/>
    <Route path="/edit/:pageType?/:id" element={<EditPage/>}/>
    <Route path="/add/goal" element={<GoalPage/>}/>
    <Route path="/edit/goal/:id" element={<EditGoalPage/>}/>
    <Route path="/delete" element={<DeleteItem/>}/>
    <Route path="/calculate" element={<CalculateCurrency/>}/>

    <Route path="*" element={<h1>Page not found</h1>}/>
    </Routes>
    </ThemeProvider>
  );
}

export default App;
