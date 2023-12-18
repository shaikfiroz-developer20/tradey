import { useState, React, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/cryptopage.module.css';
import Homecomponentheader2 from '@/homecomponents/homecomponentheader2';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Askordercard,Bidordercard } from '../homecomponents/usefun';
import ChartData from '@/homecomponents/chartscandlesticks';
import { BuySell } from '../homecomponents/usefun';
import Mobilecryptopage from '@/homecomponents/mobilecryptopage';
import { Vortex } from 'react-loader-spinner';
import Head from 'next/head';

const server=process.env.NEXT_PUBLIC_SERVER_URL;

function Cryptopaircard(props) {
  const { element } = props;

  return (
    <div className={`${styles.cryptopaircard}`}>
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
            <input type='button' value={"Buy"} style={{ backgroundColor: "rgb(86, 255, 74)", width: "50px", borderRadius: "5px", font: "16px", padding: "2px", border: "none" }} />
            <input type='button' value={"Sell"} style={{ backgroundColor: "rgb(255, 87, 87)", width: "50px", borderRadius: "5px", font: "16px", padding: "2px", border: "none" }} />
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

function Cryptopage() {
  const router = useRouter();
  const { cryptocurrency } = router.query;
  const [pairsAvailableData, setPairsAvailableData] = useState([]);
  const [initialFetchCompleted, setInitialFetchCompleted] = useState(false);
  const [inpresentsearchcoin, setinpresentsearchcoin] = useState(null);
  const [orderbookdatabid, setorderbookdata] = useState(null);
  const [orderbookdataask, setorderbookdataask] = useState(null);
  const [timeframe, settimeframe] = useState("histohour");
  const [buorsell, setbuyorsell] = useState(null);
  const [buytrue, setbutrue] = useState(false);
  const [selltrue, setsellrue] = useState(false);
  const [datfullloaded, setfulldataloaded] = useState(false);
  const [desktop, setisdesktop] = useState(null);
  const [coinsexist,setcoinexist]=useState(false);

  useEffect(() => {
    const ordedata = async () => {
      try {
        const res = await axios.get(`${server}/orderbookdataofpresentcrypto`);
        setorderbookdata(res.data.Data.BID);
        setorderbookdataask(res.data.Data.ASK);
      } catch (error) {
        console.log(error);
      }
    };
 
    ordedata();
    const intervalId = setInterval(() => {
      ordedata();
    }, 10000);
  
    return () => clearInterval(intervalId); 

  }, []);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      // Adjust the threshold value based on your design considerations
      const isDesktopView = windowWidth > 792; // Example threshold for desktop view

      setisdesktop(isDesktopView);
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

  useEffect(() => {
    const fetchPairsData = async (CC) => {
      try {
        const response = await axios.get(`${server}/toppairsbyvolume`, {
          params: { fysm: CC }
        });
        const re = await axios.get(`${server}/reqcrypto?crypto=${CC}`);
        setinpresentsearchcoin(re.data);
        setPairsAvailableData(response.data);
        if(re.data.Response===(null || undefined || "Error")){
          setcoinexist(false)
        }
        else{
          setcoinexist(true);
        }
        setfulldataloaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    

    const fetchData = async () => {
      await fetchPairsData(cryptocurrency);
      setInitialFetchCompleted(true);
    };

    if (cryptocurrency && cryptocurrency.trim() !== '') {
      fetchData(); // Initial fetch

      const interval = setInterval(() => {
        if (initialFetchCompleted) {
          fetchData(); // Fetch data every 5 minutes after the initial load
        }
      }, 1000); // 5 minutes in milliseconds

      // Clear interval on component unmount or if cryptocurrency changes
      return () => clearInterval(interval);
    }
  }, [cryptocurrency, initialFetchCompleted]);

  const handlebuy = () => {
    setbuyorsell("buy");
    setbutrue(true);
  };
  const handecanelbuy=()=>{
setbutrue(false);
setsellrue(false)
  }

  const handlesell = () => {
    setbuyorsell("sell");
    setsellrue(true);
  };
const handecanelsell=()=>{
    setsellrue(false);
    setbutrue(false);
  }
  return (
    <> <Head>
    <title>{cryptocurrency && coinsexist && (`${cryptocurrency} : ${inpresentsearchcoin ?(inpresentsearchcoin?.DISPLAY[cryptocurrency]?.USD?.PRICE):("...")}`)}</title>
    <meta name="TradeY is a trading platform for crypto currencies over 110+ cryptos are available for trading" content="TradeY" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/y.png" />
  </Head>

    <div>
    {datfullloaded && (coinsexist === false || coinsexist === undefined) && (
  <div style={{width:"100%",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
   <h3> The requested crypto doesnt exist</h3>
  </div>
)}







      {desktop  && datfullloaded && coinsexist  && (<div>
          <Homecomponentheader2 />
          <div className={styles.cryptopage}>
            <div className={styles.sidenavbarwithrelatedcrypropairsdata}>
              <div className={styles.searchedresultquerycrypto}>
                <h2>{cryptocurrency}</h2>
                <img src={`https://www.cryptocompare.com/${inpresentsearchcoin?.DISPLAY[cryptocurrency]?.USD.IMAGEURL}`} height={30} width={30} alt={cryptocurrency} />
              </div>
              <input className={styles.searchcryptopairs} type="text" placeholder='search any crypto' />
              <div className={`${styles.allcryptopairsavailable}`}>
                {pairsAvailableData?.map((element, index) => {
                  return <Cryptopaircard key={index} element={element} />;
                })}
              </div>
            </div>
            <div className={styles.charandorderbook}>
              <div className={styles.tadebusellandorderbookouterdiv}>
                <div style={{ height: '8vh', backgroundColor: '#0f1527', border: "0.5px solid black" }}>
                  <ul className={`${styles.coinsuldataontradechart}`}>
                    <li>{inpresentsearchcoin?.RAW[cryptocurrency]?.USD.FROMSYMBOL}</li>
                    <li style={{ color: "gold", fontSize: "22px" }}>{inpresentsearchcoin?.DISPLAY[cryptocurrency]?.USD.PRICE}</li>
                    <li>{inpresentsearchcoin?.RAW[cryptocurrency]?.USD.TOTALVOLUME24H}</li>
                    <li>{inpresentsearchcoin?.RAW[cryptocurrency]?.USD.HIGH24HOUR}</li>
                    <li>{inpresentsearchcoin?.RAW[cryptocurrency]?.USD.MKTCAP}</li>
                    <li>{inpresentsearchcoin?.RAW[cryptocurrency]?.USD.CIRCULATINGSUPPLY}</li>
                  </ul>
                </div>
                <div className={styles.tradecandles}>
                  <div className={styles.settingchartandtimframe}>
                    <ul style={{ gap: "30px" }} className={styles.settingchartandtimframeul}>
                      <li style={{ cursor: "pointer", backgroundColor: "rgb(32, 33, 33)", padding: "5px", borderRadius: "5px", fontFamily: "revert-layer" }}>4hrs</li>
                      <li style={{ cursor: "pointer", backgroundColor: "rgb(32, 33, 33)", padding: "5px", borderRadius: "5px", fontFamily: "revert-layer" }}>1day</li>
                    </ul>
                    <ul style={{ gap: "20px" }} className={styles.settingchartandtimframeul}>
                      <li><img style={{ cursor: "pointer" }} src="/fullscreen.png" height={20} width={20} alt="" /></li>
                      <li><img style={{ cursor: "pointer" }} src="/settingsss.svg" height={30} width={30} alt="" /></li>
                    </ul>
                  </div>
                  <div className={`${styles.candlestickschartdiv}`}>
                    <ChartData crypto={inpresentsearchcoin} timef={timeframe} />
                  </div>
                  <div style={{ display: "flex" }}>
                    <ul className={`${styles.charttimeframetime}`}>
                      <li onClick={() => { settimeframe("histominute") }}>1m</li>
                      <li onClick={() => { settimeframe("histohour") }}>1hr</li>
                      <li onClick={() => { settimeframe("histohour") }}>1day</li>
                      <li onClick={() => { settimeframe("histoday") }}>1year</li>
                      <li onClick={() => { settimeframe("histoday") }}>5years</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className={styles.sidenavorderbook}>
                <div className={`${styles.navinout}`}>
                  <ul className={`${styles.navinul}`}>
                    <li>OrderBook</li>
                    <li>Total Bids</li>
                  </ul>
                </div>
                <div className={`${styles.orderbidshigh}`}>
                  {orderbookdatabid?.map((element, index) => {
                    return <Bidordercard key={index} element={element} price={300} quantity={200} />;
                  })}
                </div>
                <div className={`${styles.middledcurrentpriceorderbookdata}`}>
                  <img src="/updown.svg" height={30} width={30} alt="" />
                  <h2>{inpresentsearchcoin?.DISPLAY[cryptocurrency]?.USD.PRICE}</h2>
                  <img src="/updown.svg" height={30} width={30} alt="" />
                </div>
                <div className={`${styles.orderbidslow}`}>
                  {orderbookdatabid?.map((element, index) => {
                    return <Askordercard key={index} element={element} price={300} quantity={200} />;
                  })}
                </div>
                {(buytrue || selltrue) && <BuySell buysell={buorsell} sellfal={handecanelsell} buyfall={handecanelbuy} />}
                <div className={`${styles.buysellbuttonsdivs}`}>
                  <motion.input initial={{ opacity: 1 }} whileHover={{ opacity: "0.5", cursor: "pointer" }} type="button" style={{ width: "15vw", borderRadius: "5px", fontSize: "19px", fontWeight: "bold", backgroundColor: "darkgreen" }} onClick={handlebuy} value="Buy Long" />
                  <motion.input initial={{ opacity: 1 }} whileHover={{ opacity: "0.5", cursor: "pointer" }} type="button" style={{ width: "15vw", borderRadius: "5px", fontSize: "19px", fontWeight: "bold", backgroundColor: "red" }} onClick={handlesell} value="Sell Short" />
                </div>
              </div>
            </div>
          </div>
        </div>)}
        
     

    
    {!desktop && coinsexist && datfullloaded && ( <div style={{ width: "100%", height: "100vh" }}>
      <Mobilecryptopage />
    </div>)}
      {!datfullloaded && (<div style={{width:"100%",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}><Vortex
        visible={true}
        height="80"
        width="80"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={['brown','black']}
      /></div>)}


    </div>
    </>
  );
}

export default Cryptopage;