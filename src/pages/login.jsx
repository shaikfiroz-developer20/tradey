import React, { useEffect, useState } from 'react';
import GoogleButton from 'react-google-button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import styles from "@/styles/signuplogin.module.css"
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Head from 'next/head';

const server=process.env.NEXT_PUBLIC_SERVER_URL;


const buttonStyles = {
  width: '340px',
  height: '50px',
};

function Signuploginpage() {
  const date = new Date();
  const year = date.getFullYear();
  const router=useRouter();
  const [rqlogin, setRequest] = useState(false);
  const [loggedIn, setLoginStatus] = useState(false); // Renamed to improve clarity
  const [otpsent, setotpsentstatus] = useState(false); // Renamed to improve clarity
  const [email,setmail]=useState(null);

  const reqSignup = async (formData) => {
 
try {
  const res=await axios.post (`${server}/signup`,formData);
  setmail(formData.email);
 
   if(res.status===201){
    toast("Signup successful")
    router.push('/')
  }
  
} catch (error) {
  if (error.response && error.response.status === 400) {
    toast('User already exists');
  } 
  else if(res.status===500){
    toast("Internal server error")
  }

}
};


    



  const handleFormType = () => {
    setRequest(!rqlogin);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    reqSignup(formData);
  };

  
const reqLogin = async (formData) => {
  try {
    const response = await axios.post(`${server}/login`, formData);

    if (response.status === 200) {
      toast(response.data.msg);
      setLoginStatus(true); // Set login status to true on successful login
localStorage.setItem('isLoggedIn', 'true'); // Store login status
localStorage.setItem('userEmail', formData.email); // Store user's email
      router.push('/');
    } 
  } catch (error) {
  
  console.log(error)
  }
};
  const handleLoginForm = (e) => {
    e.preventDefault();

    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    reqLogin(formData);
  };

 
  return (<>
  <Head>
        <title>login</title>
        <meta name="TradeY is a trading platform for crypto currencies over 110+ cryptos are available for trading" content="TradeY" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/y.png" />
      </Head>
        <ToastContainer className={styles.toastcontainer} />

    <div className={`${styles.ovdiv}`}>
    {otpsent? (<div style={{backgroundColor:"white",position:"fixed", display:"flex",flexDirection:"column",justifyContent:"flex-end",alignItems:"center", height:"fit-content", padding:"20px"}}>
              <form action="submit" onSubmit={handleotpsubmit}>
             <div style={{border:"2px solid grey"}}> <input  style={{width:"150px",paddingLeft:"3px",borderWidth:"0px", outline:"none", height:"28px"}} type="text" name="otp" id="password" placeholder="enter Otp.." maxLength="6" pattern="^[0-9].*$" />
                <input  className={`${styles.buttonsignuplogin}`} id="signupbutton" type="submit" value="Submit Otp" /></div>
              </form>
              <motion.img whileHover={{cursor:"pointer"}} onClick={()=>{setotpsentstatus(false)}}  height={30} width={50} src="/backarr.png" alt="" />
            </div>):(
      <div className={`${styles.formout}`}>
        <div className={`${styles.form}`}>
          <div className="googleloginsignup">
            <GoogleButton style={buttonStyles} />
          </div>
          <div className="or">
            <div className="line"></div>
            <h2 className="ortext">or</h2>
            <div className="line"></div>
          </div>

          {rqlogin ? (
           <div> <div className={`${styles.signuploginmanual}`}>
              <form className={`${styles.signuploginmanual}`} action="submit" onSubmit={handleSignupSubmit}>
                <label className={`${styles.inputlablessignuplogin}`} htmlFor="email">Email</label>
                <input className={`${styles.inputboxessignuplogin}`} type="email" name="email" placeholder="email" id="email" required />
                <label className={`${styles.inputlablessignuplogin}`} htmlFor="password">Password</label>
                <input className={`${styles.inputboxessignuplogin}`} type="password" name="password" id="password" placeholder="Set Password" maxLength="18" pattern="^[A-Z].*$" />
                <input className={`${styles.buttonsignuplogin}`} id="signupbutton" type="submit" value="Signup" />
              </form>
              <div className="alreadyhaveaccount">
              <h3 style={{color:"blue"}}>
                  Already have an account? <button className={`${styles.buttonsignuplogin}`}  onClick={handleFormType} id="loginhaveaccount">Login</button>
                </h3>
              </div>
            </div>
            </div>
          ) : (
            <div className={`${styles.signuploginmanual}`}>
              <form className={`${styles.signuploginmanual}`} action="submit" onSubmit={handleLoginForm}>
                <label className={`${styles.inputlablessignuplogin}`} htmlFor="email">Email</label>
                <input className={`${styles.inputboxessignuplogin}`} type="email" name="email" placeholder="email" id="email" required />
                <label className={`${styles.inputlablessignuplogin}`} htmlFor="password">Password</label>
                <input className={`${styles.inputboxessignuplogin}`} type="password" name="password" id="password" placeholder="Password" maxLength="18" pattern="^[A-Z].*$" />
                <input className={`${styles.buttonsignuplogin}`} id="loginbutton" type="submit" value="Login" />
              </form>
              <div className="alreadyhaveaccount">
                <h3 style={{color:"blue"}}>
                 dont have a account ?<button className={`${styles.buttonsignuplogin}`} onClick={handleFormType} id="loginhaveaccount">Signup</button>
                </h3>
              </div>
            </div>
          )}
        </div>
      </div>

     

            )}</div>
    <footer style={{width:"100%",height:"5vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
  <h3 style={{color:"grey", fontWeight:"bolder"}}>TradeY @copyright {year}</h3>
     </footer>

    </>
  );
}

export default Signuploginpage;
