import styles from "@/styles/coinsstatdiv.module.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import axios from "axios";
import Toptrndindcryptos from "./toptrndindcryptos";
import { Vortex } from "react-loader-spinner";
import Image from "next/image";
const server=process.env.NEXT_PUBLIC_SERVER_URL;


function HeaderCurrencyPairTypes({ onSearchCoins }) {
 
   return (
    <div className={styles.headerCurrencyPairTypesDiv}>
      <ul style={{ display: "flex", listStyleType: "none", marginLeft: "10px", width: "50%", justifyContent: "flex-start", gap: "30px", alignItems: "center" }}>
        <motion.li  style={{borderBottom:"2px solid blue"}}  whileHover={{borderBottom:"2px solid black",cursor:"pointer",scale:1.2}}>All</motion.li>
        <motion.li  whileHover={{borderBottom:"2px solid black",cursor:"pointer",scale:1.2}}>Inr</motion.li>
        <motion.li  whileHover={{borderBottom:"2px solid black",cursor:"pointer",scale:1.2}}>Eth</motion.li>
        <motion.li  whileHover={{borderBottom:"2px solid black",cursor:"pointer",scale:1.2}}>Btc</motion.li>
      </ul>
      <div style={{ width: "50%", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <input
          style={{ width: "60%", height: "25px", borderWidth: "0px", outline: "none", marginRight: "10px", paddingLeft: "5px" }}
          onChange={onSearchCoins}
          type="text"
          name="textsearch"
          id="textsearch"
          placeholder="Search Crypto.."
        />
      </div>

    </div>
  );
}

function HeaderCurrencyPairTypesInfo() {
  return (
    <div className={styles.headerCurrencyPairTypesDiv1} style={{width:"90%",marginLeft:"5%"}}>
      <ul className={styles.headerList}>
        <li className={styles.headerlistli}>Crypto Coin</li>
        <li className={styles.headerlistli}>Price <img src="/updown.svg" height={13} width={13} alt="" /></li>
        <li className={styles.headerlistli}>24 % <img src="/updown.svg" height={13} width={13} alt="" /></li>
        <li className={styles.headerlistli}>Volume (All)<img src="/updown.svg" height={13} width={13} alt="" /></li>
        <li className={styles.headerlistli}>24 hrs (High)<img src="/updown.svg" height={13} width={13} alt="" /></li>
        <li className={styles.headerlistli}>Action</li>
      </ul>
    </div>
  );
}

function HeaderCurrencyPairDetails(props) {
  const { CoinInfo, DISPLAY } = props.element;
  const a=`${DISPLAY?.USD?.CHANGE24HOUR}`;
  var a1=false;
  if(a.charAt(2)=="-"){
    a1=true;
  }

  return (
    <div style={{ backgroundColor: "rgb(243, 243, 243)" }} className={styles.headerCurrencyPairTypesDiv1}>
      <ul className={styles.headerList}>
        <li style={{ display: "grid", justifyContent: "center", alignItems: "center",marginRight:"2%" ,width:"100px" }}>
          <p style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{props.index}</p>
          <img src={`https://www.cryptocompare.com/${CoinInfo?.ImageUrl}`} height={35} width={35} alt={CoinInfo?.Name} />
          <h5 style={{display:"flex",justifyContent:"center",alignItems:"center"}}>{CoinInfo?.Name || 'N/A'}</h5>
        </li>
        <li style={{width:"100px"}}>{DISPLAY?.USD?.PRICE || 'N/A'}</li>
        <li style={a1?({backgroundColor:"rgba(255, 130, 153)",width:"100px"}):({backgroundColor:"rgba(120, 194, 146)",width:"100px"})} className={styles.percent}>{DISPLAY?.USD?.CHANGE24HOUR || 'N/A'}</li>
        <li style={{width:"120px"}}>{DISPLAY?.USD?.VOLUME24HOURTO || 'N/A'}</li>
        <li style={{width:"100px"}}><h4>{DISPLAY?.USD?.HIGHDAY || 'N/A'}</h4></li>
        <li style={{width:"100px"}} className={styles.tradeButtons}>
        <Link href={`/cryptopage?cryptocurrency=${CoinInfo?.Name}`}><button style={{ cursor:"pointer", height: "fit-content",width:"100px" ,borderRadius: "5px", border: "2px solid brown", padding: "2px" }}>Trade</button></Link> 
        <Link href={`/cryptopage?cryptocurrency=${CoinInfo?.Name}`}> <button style={{cursor:"pointer",  height: "fit-content",width:"100px", borderRadius: "5px", border: "2px solid brown", padding: "2px" }}>Margin</button></Link> 
        </li>
      </ul>
    </div>
  );
}




function CoinsStatDiv() {
  const [data, setData] = useState([]);
  const [dataloaded, setDataloaded] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState(""); 

  useEffect(() => {
    const handleInitialDataLoad = async (e) => {
      try {
        const res = await axios.get(`${server}/topcryptosprices?count=${e}`);
        setData(res?.data?.data);
        setDataloaded(true);
      } catch (error) {
        console.log(error);
      }
    };

    handleInitialDataLoad(100);
  }, []);

  useEffect(() => {
    const filtered = data?.filter((element) =>
      element.CoinInfo.Name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchInput, data]);

  const handleSearchCoins = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div>
      {dataloaded ? (
        <div style={{ marginBottom: "5vh" }}>
          <Toptrndindcryptos />
          <HeaderCurrencyPairTypes onSearchCoins={handleSearchCoins} />
          <HeaderCurrencyPairTypesInfo />
          <div className="outerdatadiv" style={{ display: "grid", overflow: "scroll", scrollBehavior: "smooth", width: "90%", marginLeft: "5%", gap: "5px", backgroundColor: "rgb(240, 240, 240)" }}>
            {filteredData?.map((element, index) => (
              <HeaderCurrencyPairDetails key={index} element={element} index={index} />
            ))}
          </div>
        </div>
      ) : (
        <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Vortex
            visible={true}
            height="80"
            width="80"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={['brown', 'black']}
          />
        </div>
      )}
    </div>
  );
}

export default CoinsStatDiv;