import Homecomponentheader2 from "@/homecomponents/homecomponentheader2";
import style from "@/styles/miningearn.module.css";
import Footer from "@/headrfooter/footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Head from 'next/head';
import { Vortex } from "react-loader-spinner";
import { motion } from "framer-motion";

const server = process.env.NEXT_PUBLIC_SERVER_URL;

function Miningpoolsinfocard({ element, onMoreInfoClick }) {
  const [serverexist, setServerExist] = useState(null);

  useEffect(() => {
    if (element.ServerLocations[0] != null) {
      setServerExist(true);
    }
  }, [element.ServerLocations]);

  return (
    <div className={`${style.card}`}>
      <div className={`${style.logo}`}>
        <img src={`https://www.cryptocompare.com${element.LogoUrl}`} height={100} width={100} alt="" />
      </div>
      <div className={`${style.details}`}>
        <h2>{element.Name}</h2>
        <div>
          <b style={{ color: "darkkhaki", fontSize: "17px" }}>Pool features:-</b>
          <ul style={{ display: "grid", listStyleType: "none", minHeight: "30px", height: "auto", gridTemplateColumns: "repeat(auto-fill,minmax(80px,1fr))", alignItems: 'center', gap: "10px" }}>
            {element.PoolFeatures?.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <div style={{ cursor: 'pointer', display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <h3 style={{ display: 'flex', color: "GrayText", justifyContent: 'flex-start', alignItems: 'center' }}>Server: {serverexist ? element.ServerLocations[0] : "N/A"}</h3>
          <button onClick={() => onMoreInfoClick(element)} style={{ cursor: "pointer", color: "blue", backgroundColor: 'transparent', border: 'none' }}>More Info..</button>
        </div>
      </div>
    </div>
  );
}

const Miningearn = () => {
  const [poolsdata, setPoolsData] = useState(null);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [selectedPool, setSelectedPool] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${server}/miningearnpools`);
        const data = response.data;
        setPoolsData(data);
        setDataLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleMoreInfoClick = (selectedElement) => {
    setSelectedPool(selectedElement);
  };

  return (
    <>
      <Head>
        <title>miningearn</title>
        <meta name="TradeY is a trading platform for cryptocurrencies over 110+ cryptos are available for trading" content="TradeY" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/y.png" />
      </Head>
      {isDataLoaded ? (
        <div className={`${style.minnerearn}`}>
          <Homecomponentheader2 />
          <section className={`${style.sectioninfodivoutersec}`}>
            <div className={`${style.infodivouter}`}>
              <p style={{ display: "grid", gap: "10px" }}>
                Hello! Hope You have a good day. Earning from crypto mining is not an easy task nowadays. So be cautious before planning to do it. If you are not familiar with this mining stuff, I recommend you go through this article once.
                <a style={{ color: "blue", textDecoration: "underline" }} href="https://www.gemini.com/cryptopedia/crypto-mining-rig-bitcoin-mining-calculator-asic-miner">crypto-mining-rig-bitcoin-mining</a>
              </p>
              <div>
                <h1>
                  ⚠️ Understand Blockchain fundamentals before proceeding. <br />
                  <b style={{ color: "blue" }}>like ↓ </b>
                </h1>
                <ul className={`${style.infomainpointsul}`}>
                  <li>proof of work →</li>
                  <li>Consensus protocol →</li>
                  <li>Stacking →</li>
                  <li>Securing the wallet</li>
                </ul>
                {selectedPool && (
                  <div className={`${style.detailedView}`}>
                    <div className={`${style.infodivonselectedcard}`}>
                      <div className={`${style.closingtab}`}>
                        <motion.button whileHover={{ backgroundColor: "red", cursor: "pointer" }} onClick={() => setSelectedPool(null)}>
                          <motion.img
                            src="/cancelsvg.svg"
                            alt="Cancel"
                            width={20}
                            height={20}
                          />
                        </motion.button>
                      </div>
                      <div className={`${style.infodata}`}>
                        <img src={`https://cryptocompare.com${selectedPool.LogoUrl}`} width={250} height={150} alt="" />
                        <h2 style={{ fontFamily: "monospace", fontSize: "25px", color: "brown" }}>{selectedPool.Name}</h2>
                        <p className={`${style.displayabledata}`}>
                          <h2>Pool features</h2>
                          <ul style={{ display: "grid", listStyleType: "none", minHeight: "30px", width: "70vw", height: "auto", gridTemplateColumns: "repeat(auto-fill,minmax(100px,1fr))", alignItems: 'center', gap: "10px" }}>
                            {selectedPool.PoolFeatures?.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </p>
                        <p className={`${style.displayabledata}`}>
                          <h2>Coins Mineable</h2>
                          <ul style={{ display: "grid", listStyleType: "none", minHeight: "30px", width: "70vw%", height: "auto", gridTemplateColumns: "repeat(auto-fill,minmax(100px,1fr))", alignItems: 'center', gap: "10px" }}>
                            {selectedPool.Coins?.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </p>
                        <p className={`${style.displayabledata}`}>
                          <h2>Server location</h2>
                          <ul style={{ display: "grid", listStyleType: "none", minHeight: "30px", width: "70vw%", height: "auto", gridTemplateColumns: "repeat(auto-fill, minmax(250px,1fr))", alignItems: 'center', gap: "10px" }}>
                            {selectedPool.ServerLocations?.length > 0 ? (
                              selectedPool.ServerLocations.map((location, index) => (
                                <li key={index}>{location}</li>
                              ))
                            ) : (
                              <li>N/A</li>
                            )}
                          </ul>
                        </p>
                        <p className={`${style.displayabledata}`}>
                          <h2>Payment methods</h2>
                          <ul style={{ display: "grid", listStyleType: "none", minHeight: "30px", width: "70vw", height: "auto", gridTemplateColumns: "repeat(auto-fill,minmax(100px,1fr))", alignItems: 'center', gap: "10px" }}>
                            {selectedPool.PaymentType?.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </p>
                        <p className={`${style.displayabledata}`}>
                          <h2>Merged Mining</h2>
                          <ul style={{ display: "grid", listStyleType: "none", minHeight: "30px", width: "70vw%", height: "auto", gridTemplateColumns: "repeat(auto-fill,minmax(100px,1fr))", alignItems: 'center', gap: "10px" }}>
                            {!selectedPool.MergedMiningCoins ? (
                              selectedPool.MergedMiningCoins.map((feature, index) => (
                                <li key={index}>{feature}</li>
                              ))
                            ) : (
                              <li>N/A</li>
                            )}
                          </ul>
                        </p>

                        <div className={`${style.displayabledata}`} style={{ display: "flex", gap: "20px" }}>
                          <img height={50} width={50} src="/twitter.png" alt="" />
                          <a href="#" style={{ color: "blue", textDecoration: "underline" }}>{selectedPool.Twitter ? (selectedPool.Twitter) : ("N/A")}</a>
                        </div>
                        <div className={`${style.displayabledata}`}>
                          <h2>Minimum Payout</h2>
                          <p>{selectedPool.MinimumPayout}</p>
                        </div>
                        <div className={`${style.displayabledata}`}>
                          <h3>Link to website ↓</h3>
                          <a className={`${style.payoutpara}`} href={selectedPool.AffiliateURL}>{selectedPool.AffiliateURL}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
          <section className={`${style.poolsinfoouterdivsection}`}>
            <h2 style={{ color: "green", fontSize: "40px" }}>Mining Pools</h2>
            <div className={`${style.poolsinfoouterdiv}`}>
              {isDataLoaded && Object.keys(poolsdata).map((key, index) => {
                const element = poolsdata[key];
                return <Miningpoolsinfocard key={index} element={element} onMoreInfoClick={handleMoreInfoClick} />;
              })}
            </div>
          </section>
          <Footer />
        </div>
      ) : (
        <div style={{ width: "100%", height: "100vh", position: "absolute", display: "flex", justifyContent: "center", alignItems: "center" }}>
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
    </>
  );
};

export default Miningearn;
