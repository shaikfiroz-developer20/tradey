import styles from "@/styles/ss.module.css";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Link from "next/link";
import Image from "next/image";
const server=process.env.NEXT_PUBLIC_SERVER_URL;


function Card(props) {
  // Use destructuring to get the filter and data props
  const { filter, data } = props;

  // Use a switch statement to render different content based on the filter
  switch (filter) {
    case "topgainers":
      return (
      <Link href={`/cryptopage?cryptocurrency=${data.CoinInfo.Name}`}> <div className={`${styles.carddatadiv}`}>
<div style={{display:"grid"}}><h3>{data.CoinInfo.FullName}</h3> <img className={`${styles.imagesdimen}`} src={`${`https://cryptocompare.com/${data.CoinInfo.ImageUrl}`}`} alt="" /> </div>        
 
 <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"20px"}}>
  <div>
<p>price:{data.DISPLAY.USD.PRICE}</p> 
<p>volume:{data.DISPLAY.USD.TOPTIERVOLUME24HOURTO}</p>
</div>
<div>
<button style={{backgroundColor:"darkgreen",borderWidth:"0" ,borderRadius:"5px",padding:"5px",fontSize:"17px",color:"white"}}>
    {data.DISPLAY.USD.CHANGEPCT24HOUR}
  </button>
</div>
</div>
        </div>
        </Link> 
      );

    case "toploosers":
      return (
        <Link href={`/cryptopage?cryptocurrency=${data.CoinInfo.Name}`}> <div className={`${styles.carddatadiv}`}>
          <div style={{display:"grid"}}><h3>{data.CoinInfo.FullName}</h3> <img className={styles.imagesdimen} src={`${`https://cryptocompare.com/${data.CoinInfo.ImageUrl}`}`} alt="" /> </div>        
 
 <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"20px"}}>
  <div>
<p>price:{data.DISPLAY.USD.PRICE}</p> 
<p>volume:{data.DISPLAY.USD.TOPTIERVOLUME24HOURTO}</p>
</div>
<div>
<button style={{backgroundColor:"red" ,borderWidth:"0",borderRadius:"5px",padding:"5px",fontSize:"17px",color:"white"}}>
    {data.DISPLAY.USD.CHANGEPCT24HOUR}
  </button>
</div>
</div>
        </div>
        </Link>
      );

    case "trendingcoin":
      return (
        <Link href={`/cryptopage?cryptocurrency=${data.CoinInfo.Name}`}> <div className={`${styles.carddatadiv}`}>
         <div style={{display:"grid"}}><h3>{data.CoinInfo.FullName}</h3> <img className={styles.imagesdimen} src={`${`https://cryptocompare.com/${data.CoinInfo.ImageUrl}`}`} alt="" /> </div>        
 
 <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"20px"}}>
  <div>
<p>price:{data.DISPLAY.USD.PRICE}</p> 
<p>volume:{data.DISPLAY.USD.TOPTIERVOLUME24HOURTO}</p>
</div>
<div>
<button style={{backgroundColor:"grey",borderWidth:"0" ,borderRadius:"5px",padding:"5px",fontSize:"17px",color:"white"}}>
    {data.DISPLAY.USD.CHANGEPCT24HOUR}
  </button>
</div>
</div>
        </div></Link>
      );

    case "topvolume":
      return (
        <Link href={`/cryptopage?cryptocurrency=${data.CoinInfo.Name}`}> <div className={`${styles.carddatadiv}`}>
          <div style={{display:"grid"}}><h3>{data.CoinInfo.FullName}</h3>  <img className={styles.imagesdimen} src={`${`https://cryptocompare.com/${data.CoinInfo.ImageUrl}`}`} alt="" /> </div>        
 
 <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"20px"}}>
  <div>
<p>price:{data.DISPLAY.USD.PRICE}</p> 
<p>volume:{data.DISPLAY.USD.TOPTIERVOLUME24HOURTO}</p>
</div>
<div>
  <button style={{backgroundColor:"blue" ,borderWidth:"0",borderRadius:"5px",padding:"5px",fontSize:"17px",color:"white"}}>
    {data.DISPLAY.USD.CHANGEPCT24HOUR}
  </button>
</div>
</div>
        </div></Link>
      );

    default:
      return null;
  }
}

function Toptrndindcryptos() {
  const [filtertype, setfiltertype] = useState("topgainers");
  const [data, setData] = useState([]);
  const [isDesktop, setIsDesktop] = useState(null);

  // Use a single function to fetch data based on the filter type
  const fetchData = async (filter) => {
    try {
      // Use a template literal to construct the URL
      const res = await axios.get(`${server}/${filter}`);
      // Set the data state with the response data
      setData(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Use an array to store the filter types
  const filters = ["topgainers", "toploosers", "trendingcoin", "topvolume"];

  // Use a single useEffect hook to fetch data when the filter type changes
  useEffect(() => {
    fetchData(filtertype);
  }, [filtertype]);


  
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      // Adjust the threshold value based on your design considerations
      const isDesktopView = windowWidth > 792; // Example threshold for desktop view

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

  return (
    <div className={`${styles.topcryptosdiv}`}>
      <div className={`${styles.topcryptosdivindivnavtab}`}>
        <ul
          style={{
            display: "flex",
            listStyleType: "none",
            gap: "10px",      
            width:"89vw",
             alignItems:'center',
             overflow:'scroll',
             scrollBehavior:'smooth'
          }}
        >
          {filters.map((type) => (
            <motion.li
              key={type}
              onClick={() => setfiltertype(type)}
              style={{
                borderBottom: filtertype === type ? "2px solid black" : "none",
                cursor: "pointer",
              }}
              whileHover={{ scale: 1.1, color: "brown" }}
            >
              {type}
            </motion.li>
          ))}
        </ul>
      </div>

{isDesktop?( <div className={`${styles.datacardsholderdivdisplay}`}>
        {data.map( (element,Index)=> {
          return <Card filter={filtertype} key={Index} data={element} />
        })}
      </div>):( <div className={`${styles.datacardsholderdivdisplay}`}>
       
      <Carousel
  width="350px"
  showArrows={false}
  showStatus={false}
  showThumbs={false}
  autoPlay
  interval={5000}
  stopOnHover
  infiniteLoop
  swipeable={true}
  renderThumbs={() => null} 

>
  {data.map((element, Index) => {
    return (
      <div key={Index} style={{display:"grid",placeItems:'center'}}>
        <Card filter={filtertype} data={element} />
      </div>
    );
  })}
</Carousel>

      </div>)}
     

    </div>
  );
}

export default Toptrndindcryptos;
