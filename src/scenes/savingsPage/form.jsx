const registerSchema=yup.object().shape({

});
const loginSchema=yup.object().shape({

})

const initialValuesRegister={
firstName:"",
lastName:"",
email:"",
password:"",
}
const initialValuesLogin={
   email:"" ,
   password:"",
}

const Form=()=>{
   const [pageType, setPageType] = useState("login");
   const isLogin=pageType==="login";
   const isRegister=pageType==="register";
   
}
export default Form;