import { motion } from "framer-motion";
import footerst from "@/styles/futureotions.module.css"
import styles from "@/styles/footer.module.css"
import Image from "next/image";
const footerStyle = {
  width: "100vw",
  minHeight: "20vh",
  height:"auto",
  backgroundColor: "black",
  color: "white",
  display: "grid",
  justifyContent: "center",
  alignItems: "center",
};


function Footer() {
  const listItemHoverStyle = {
    scale: 1.05
};

  return (
    <footer style={footerStyle}>
      <div className={styles.footername}>
        <ul className={styles.listItemStyle}>
              {[["Spot Buy","/"], ["Futures buy","/"], ["calculate margin","/"], ["limit orders","/"],["buy sell statergies","/"]].map((item, subIndex) => (
                <motion.li style={{width:"fit-content"}}  key={subIndex} whileHover={listItemHoverStyle}>
                  <a className={`${footerst.onhoverfooterlist}`} href={item[1]}>{item[0]}</a>
                </motion.li>
              ))}
            </ul>
            <ul className={styles.listItemStyle}>
              {[["staking","/cryptopage?cryptocurrency=BTC"], ["Leasing crypto","/cryptopage?cryptocurrency=BTC"], ["NFTs","/cryptopage?cryptocurrency=BTC"], ["Mining cryptos","/cryptopage?cryptocurrency=BTC"],["Mining p&l calculator","/cryptopage?cryptocurrency=BTC"]].map((item, subIndex) => (
                <motion.li style={{width:"fit-content"}}  key={subIndex} whileHover={listItemHoverStyle}>
                  <a className={`${footerst.onhoverfooterlist}`} href={item[1]}>{item[0]}</a>
                </motion.li>
              ))}
            </ul>
            <ul className={styles.listItemStyle}>
              {[["Top Stories","/miningearn"], ["Global News","/miningearn"], ["Btc today","/miningearn"]].map((item, subIndex) => (
                <motion.li style={{width:"fit-content"}}  key={subIndex} whileHover={listItemHoverStyle}>
                  <a className={`${footerst.onhoverfooterlist}`} href={item[1]}>{item[0]}</a>
                </motion.li>
              ))}
            </ul>
            <ul className={styles.listItemStyle}>
              {[["Spot","/"], ["Margin","/"], ["p&l Calculator","/"],[ "pair trading","/"]].map((item, subIndex) => (
                <motion.li style={{width:"fit-content"}}  key={subIndex} whileHover={listItemHoverStyle}>
                  <a className={`${footerst.onhoverfooterlist}`} href={item[1]}>{item[0]}</a>
                </motion.li>
              ))}
            </ul>
            </div>

        <div style={{ display: "flex",flexDirection:"column", justifyContent: "center", alignItems: "center", color: "white"}} className="developerinfo">
          <h2 style={{backgroundColor:"grey"}}><img src="/logoTt.png" width={100} height={40} alt="" /></h2>
          <p>All rights reserved @Copyright 2023</p>
        </div>
    </footer>
  );
}

export default Footer;
