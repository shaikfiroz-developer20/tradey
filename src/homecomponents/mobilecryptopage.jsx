import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Homecomponentheader2 from "./homecomponentheader2";
import Footer from "@/headrfooter/footer";
import ChartData from "./chartscandlesticks";
import { Bidordercard, Askordercard, BuySell } from "@/homecomponents/usefun";
import style from "@/styles/homecryptopage.module.css";
import styles from "@/styles/cryptopage.module.css";

const server=process.env.NEXT_PUBLIC_SERVER_URL;


// Define Cryptopaircard component
function Cryptopaircard(props) {
  const { element } = props;
  return (
    <div style={{color:"white",marginBottom:"1vh"}}className={`${style.cryptopaircard}`}>
      <div className={`${styles.coinnamesandprices}`}>
        <div className={`${styles.cryptopairsnames}`}>
          <h4>{element.fromSymbol}</h4>
          <h4>--</h4>
          <h4>{element.toSymbol}</h4>
        </div>
        <div className={`${styles.busellbuttontradingpairs}`}>
          <p style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            {element.exchange}
          </p>
          <div style={{ display: "flex", gap: "5px" }}>
            <input
              type="button"
              value={"Buy"}
              style={{ backgroundColor: "rgb(86, 255, 74)", width: "50px", borderRadius: "5px", font: "16px", padding: "2px", border: "none" }}
            />
            <input
              type="button"
              value={"Sell"}
              style={{ backgroundColor: "rgb(255, 87, 87)", width: "50px", borderRadius: "5px", font: "16px", padding: "2px", border: "none" }}
            />
          </div>
        </div>
      </div>
      <div className={`${styles.price}`}>
        <p>{element.price}</p>
        <p>{element.volume24hTo}</p>
      </div>
    </div>
  );
}

// Define Mobilecryptopage component
function Mobilecryptopage() {
  const [timeframe, setTimeframe] = useState("histohour");
  const [orderbookdatabid, setOrderbookdata] = useState(null);
  const [buytrue, setBuyTrue] = useState(false);
  const [selltrue, setSellTrue] = useState(false);
  const [initialFetchCompleted, setInitialFetchCompleted] = useState(false);
  const [pairsAvailableData, setPairsAvailableData] = useState([]);
  const [inpresentsearchcoin, setInpresentsearchcoin] = useState(null);
  const [dataFullyLoaded, setDataFullyLoaded] = useState(false);
const [checkedoption,setcheckedoption]=useState("chart")
  const router = useRouter();
  const { cryptocurrency } = router.query;

  useEffect(() => {
    setInpresentsearchcoin(cryptocurrency);
  }, [cryptocurrency]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${server}/orderbookdataofpresentcrypto`);
        setOrderbookdata(res.data.Data.BID);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchPairsData = async (CC) => {
      try {
        const response = await axios.get(`${server}/toppairsbyvolume`, {
          params: { fysm: CC },
        });
        const re = await axios.get(`${server}/reqcrypto?crypto=${CC}`);
        setInpresentsearchcoin(re.data);
        setPairsAvailableData(response.data);
        setDataFullyLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchData = async () => {
      await fetchPairsData(cryptocurrency);
      setInitialFetchCompleted(true);
    };

    if (cryptocurrency && cryptocurrency.trim() !== '') {
      fetchData();

      const interval = setInterval(() => {
        if (initialFetchCompleted) {
          fetchData();
        }
      }, 300000); // Fetch data every 5 minutes after the initial load

      return () => clearInterval(interval);
    }
  }, [cryptocurrency, initialFetchCompleted]);

  const handleBuy = () => {
    setBuyTrue(!buytrue);
  };

  const handleSell = () => {
    setSellTrue(!selltrue);
  };

 const handlecheckedlist=(e)=>{
  setcheckedoption(e)
 }
  return (
    <div>
      <Homecomponentheader2 />
      <div className={style.selectingoption}>
        <ul className={style.selectingoptionul}>
          <li onClick={ () => {handlecheckedlist('pairs')}}>trading Pairs</li>
          <li onClick={ () => {handlecheckedlist('chart')}}>Chart</li>
          <li onClick={ () => {handlecheckedlist('orderbook')}}>Orderbook</li>
        </ul>
      </div>
      {checkedoption ==="chart" && ( <div className={style.tradecandles}>
        <div className={style.settingchartandtimframe}>
          <ul style={{ gap: "30px" }} className={style.settingchartandtimframeul1}>
            <li style={{ cursor: "pointer", color: "white", backgroundColor: "rgb(32, 33, 33)", padding: "5px", borderRadius: "5px", fontFamily: "revert-layer" }}>4hrs</li>
            <li style={{ cursor: "pointer", color: "white", backgroundColor: "rgb(32, 33, 33)", padding: "5px", borderRadius: "5px", fontFamily: "revert-layer" }}>1day</li>
          </ul>
          <ul style={{ gap: "20px" }} className={style.settingchartandtimframeul2}>
            <li><img style={{ cursor: "pointer" }} src="/fullscreen.png" height={20} width={20} alt="" /></li>
            <li><img style={{ cursor: "pointer" }} src="/settingsss.svg" height={30} width={30} alt="" /></li>
          </ul>
        </div>
        <div className={`${style.candlestickschartdiv}`}>
          <ChartData chartheight={70} crypto={inpresentsearchcoin} timef={timeframe} />
          <div style={{ display: "flex", backgroundColor: "rgb(32, 33, 33)", height: "10vh" }}>
            <ul className={`${style.charttimeframetime}`}>
              <li onClick={() => { setTimeframe("histominute") }}>1m</li>
              <li onClick={() => { setTimeframe("histohour") }}>1hr</li>
              <li onClick={() => { setTimeframe("histoday") }}>1day</li>
              <li onClick={() => { setTimeframe("histoday") }}>1year</li>
              <li onClick={() => { setTimeframe("histoday") }}>5years</li>
            </ul>
          </div>
        </div>
      </div>)}

     {checkedoption==="orderbook" && ( <div className={style.sidenavorderbook}>
        <div className={`${style.navinout}`}>
          <ul className={`${style.navinul}`}>
            <li>OrderBook</li>
            <li>Total Bids</li>
          </ul>
        </div>
        <div className={`${styles.orderbidshigh}`}>
          {orderbookdatabid?.map((element, index) => (
            <Bidordercard key={index} element={element} price={300} quantity={200} />
          ))}
        </div>
        <div className={`${styles.middledcurrentpriceorderbookdata}`}>
          <img src="/updown.svg" height={30} width={30} alt="" />
          <h2>
            {inpresentsearchcoin?.DISPLAY && inpresentsearchcoin.DISPLAY[cryptocurrency]?.USD
              ? inpresentsearchcoin.DISPLAY[cryptocurrency].USD.PRICE
              : "nothing to show"
            }
          </h2>
          <img src="/updown.svg" height={30} width={30} alt="" />
        </div>
        <div className={`${styles.orderbidslow}`}>
          {orderbookdatabid?.map((element, index) => (
            <Askordercard key={index} element={element} price={300} quantity={200} />
          ))}
        </div>
        {(buytrue || selltrue) && <BuySell buysell={buytrue ? "buy" : "sell"} />}
        <div className={`${style.buysellbuttonsdivs}`}>
          <motion.input
            initial={{ opacity: 1 }}
            whileHover={{ opacity: "0.5", cursor: "pointer" }}
            type="button"
            style={{ width: "55vw", borderRadius: "5px", fontSize: "19px", fontWeight: "bold", backgroundColor: "darkgreen" }}
            onClick={handleBuy}
            value="Buy Long"
          />
          <motion.input
            initial={{ opacity: 1 }}
            whileHover={{ opacity: "0.5", cursor: "pointer" }}
            type="button"
            style={{ width: "55vw", borderRadius: "5px", fontSize: "19px", fontWeight: "bold", backgroundColor: "red" }}
            onClick={handleSell}
            value="Sell Short"
          />
        </div>
      </div>)}
     

{checkedoption === "pairs" && (  <div className={style.sidenavbarwithrelatedcrypropairsdata} style={{height:"87vh"}}>
        <div className={styles.searchedresultquerycrypto}>
          <h2 style={{color:"white"}}>{cryptocurrency}</h2>
        </div>
        <input className={styles.searchcryptopairs} type="text" placeholder="search any crypto" />
        <div className={`${styles.allcryptopairsavailable}`}>
          {pairsAvailableData && pairsAvailableData.map((element, index) => (
            <Cryptopaircard element={element} key={index} />
          ))}
        </div>
      </div>)}
    

      <Footer />
    </div>
  );
}

export default Mobilecryptopage;
