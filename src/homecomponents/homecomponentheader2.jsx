import styles from "@/styles/ss.module.css";
import { motion } from "framer-motion";
import styles11 from "@/styles/header.module.css";
import { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";

function Homecomponentheader2(prop) {
  const [isDropdownVisible, setDropdownVisibility] = useState(false);
  const [index, setHoveredIndex] = useState("");
  const [isDesktop, setIsDesktop] = useState(null);
  const[isnavviewrequested,setviewrequestedornot]=useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleMouseEnter = (index) => {
    setDropdownVisibility(true);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setDropdownVisibility(false);
    setHoveredIndex("");
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const email = localStorage.getItem('userEmail');
    const nemail = email?.split('@')[0]; // Split the email at '@' and get the first part (username)
    
    setIsLoggedIn(loggedIn);
    setUserEmail(nemail);
  }, []);
  


  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const isDesktopView = windowWidth > 792; 
      setIsDesktop(isDesktopView);
    };

    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

const handlemobilenavigationviewheader=()=>{
  setviewrequestedornot(!isnavviewrequested)
}

  return (
    <nav className={`${styles.navbar2}`} style={prop.color && { backgroundColor: `${prop.color}` }}>
      {isDesktop && (<ul className={`${styles.ullist}`}>
        <li
          className={`${styles.selectWrapper}`}
          onMouseEnter={() => handleMouseEnter("1")}
          onMouseLeave={handleMouseLeave}
        >
          <h2><Link href='/cryptopage?cryptocurrency=BTC'>Trade</Link></h2>
          {isDropdownVisible && index === "1" && (
            <ul className={`${styles.ulinsidelist}`}>
              <Link href='/cryptopage?cryptocurrency=BTC'><motion.li  style={{width:"200px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>Spot</motion.li></Link>
              <Link href='/cryptopage?cryptocurrency=BTC'><motion.li style={{width:"200px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>Margin</motion.li></Link>
              <Link href='/cryptopage?cryptocurrency=BTC'> <motion.li style={{width:"200px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>p&l Calculator</motion.li></Link>
              <Link href='/cryptopage?cryptocurrency=BTC'><motion.li style={{width:"200px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>pair trading</motion.li></Link>

            </ul>
          )}
        </li>
        <li
          className={`${styles.selectWrapper}`}
          onMouseEnter={() => handleMouseEnter("2")}
          onMouseLeave={handleMouseLeave}
        >
          <h2> <Link href='/'>QuickBUy</Link> </h2>
          {isDropdownVisible && index === "2" && (
            <ul className={`${styles.ulinsidelist}`}>
              <Link href='/'><motion.li style={{width:"200px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>Spot Buy</motion.li></Link>
              <Link href='/'> <motion.li style={{width:"200px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>Futures buy</motion.li></Link>
              <Link href='/'> <motion.li style={{width:"200px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>calculate margin</motion.li></Link>
              <Link href='/'><motion.li style={{width:"200px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>limit orders</motion.li></Link>
              <Link href='/'><motion.li style={{width:"250px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>buy sell statergies</motion.li></Link>

            </ul>
          )}
        </li>
        <li
          className={`${styles.selectWrapper}`}
          onMouseEnter={() => handleMouseEnter("3")}
          onMouseLeave={handleMouseLeave}
        >
          <h2><Link href={`/miningearn`}>Earn</Link> </h2>
          {isDropdownVisible && index === "3" && (
            <ul className={`${styles.ulinsidelist}`}>
            <Link href={`/miningearn`}> <motion.li style={{width:"200px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>staking</motion.li></Link> 
              <Link href={`/miningearn`}> <motion.li style={{width:"200px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>Leasing crypto</motion.li></Link> 
               <Link href={`/miningearn`}><motion.li style={{width:"200px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>NFTs</motion.li></Link> 
                <Link href={`/miningearn`}><motion.li style={{width:"200px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>Mining cryptos</motion.li></Link> 
                  <Link href={`/miningearn`}><motion.li style={{width:"280px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>Mining p&l calculator</motion.li></Link> 

            </ul>
          )}
        </li>
        <li
          className={`${styles.selectWrapper}`}
          onMouseEnter={() => handleMouseEnter("4")}
          onMouseLeave={handleMouseLeave}
        >
          <h2> <Link href='/newsfeed'>TradeY News</Link></h2>
          {isDropdownVisible && index === "4" && (
            <ul className={`${styles.ulinsidelist}`}>
              <Link href='/newsfeed'><motion.li style={{width:"200px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>Top Stories</motion.li></Link>
              <Link href='/newsfeed'><motion.li style={{width:"200px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>Global News</motion.li></Link>
              <Link href='/newsfeed'> <motion.li style={{width:"200px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>Btc today</motion.li></Link>

            </ul>
          )}
        </li>
      </ul>
)}



{ !isDesktop && (<div className={`${styles.ullist}`}>

  <img src="/hamburger.svg" onClick={handlemobilenavigationviewheader} height={30} width={30} alt="/hamburger.svg" />
  {isnavviewrequested && (<div className={styles.mobileciewnavigation}>
   <div style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>  <img style={{marginTop:"5px",marginRight:"5px"}} src="/cancel2svg.svg" onClick={handlemobilenavigationviewheader} height={30} width={30} alt="/cancel2svg.svg" /></div>
    <ul style={{marginTop:"0px"}} className={styles.mobileciewnavigationul}>
      <h2><Link href="/">Trade</Link></h2>
               <Link href='/cryptopage?cryptocurrency=BTC'><motion.li  style={{width:"200px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>Spot</motion.li></Link>
              <Link href='/cryptopage?cryptocurrency=BTC'><motion.li style={{width:"200px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>Margin</motion.li></Link>
              <Link href='/cryptopage?cryptocurrency=BTC'> <motion.li style={{width:"200px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>p&l Calculator</motion.li></Link>
              <Link href='/cryptopage?cryptocurrency=BTC'><motion.li style={{width:"200px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>pair trading</motion.li></Link>

    </ul>
    <ul className={styles.mobileciewnavigationul}>
    <h2> <Link href='/'>QuickBUy</Link> </h2>
              <Link href='/'><motion.li style={{width:"200px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>Spot Buy</motion.li></Link>
              <Link href='/'> <motion.li style={{width:"200px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>Futures buy</motion.li></Link>
              <Link href='/'> <motion.li style={{width:"200px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>calculate margin</motion.li></Link>
              <Link href='/'><motion.li style={{width:"200px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>limit orders</motion.li></Link>
              <Link href='/'><motion.li style={{width:"250px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>buy sell statergies</motion.li></Link>

    </ul>
    <ul className={styles.mobileciewnavigationul}>
    <h2><Link href={`/miningearn`}>Earn</Link> </h2>

    <Link href={`/miningearn`}> <motion.li style={{width:"200px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>staking</motion.li></Link> 
    <Link href={`/miningearn`}> <motion.li style={{width:"200px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>Leasing crypto</motion.li></Link> 
    <Link href={`/miningearn`}><motion.li style={{width:"200px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>NFTs</motion.li></Link> 
    <Link href={`/miningearn`}><motion.li style={{width:"200px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>Mining cryptos</motion.li></Link> 
    <Link href={`/miningearn`}><motion.li style={{width:"280px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>Mining p&l calculator</motion.li></Link> 

    </ul>
    <ul className={styles.mobileciewnavigationul}>
    <h2> <Link href='/newsfeed'>TradeY News</Link></h2>
              <Link href='/newsfeed'><motion.li style={{width:"200px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>Top Stories</motion.li></Link>
              <Link href='/newsfeed'><motion.li style={{width:"200px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>Global News</motion.li></Link>
              <Link href='/newsfeed'> <motion.li style={{width:"200px"}} whileHover={{scale:1.1,color:"red",fontSize:"25px",fontWeight:"bold"}}>Btc today</motion.li></Link>


    </ul>
  </div>)}
  
  </div>)}

      <ul className={`${styles.ullist2}`}>
        <motion.img whileHover={{ cursor: "pointer" }} src={"/support.svg"} height={30} width={30} alt="" />
        <motion.img whileHover={{ cursor: "pointer" }} src={"/notification.svg"} height={30} width={30} alt="" />
       <Link href={isLoggedIn===false ? ('/login'):('/')}> <input className={`${styles11.bittonsignuplogin}`} style={{ backgroundColor: "brown" }} type="button" value={isLoggedIn?(userEmail):("Login")} /></Link>
      </ul>
    </nav>
  );
}

export default Homecomponentheader2;
