import Homecomponentheader2 from "../homecomponents/homecomponentheader2";
import styles from "@/styles/news.module.css";
import Footer from "@/headrfooter/footer";
import { useEffect, useState } from "react";
import  {Vortex}  from "react-loader-spinner";
import axios from "axios";
import Head from 'next/head';
const server=process.env.NEXT_PUBLIC_SERVER_URL;


function Newscard(props) {
  const { elemnt } = props;
  const str = `${elemnt.body}`;
  const limitedBody = str.slice(0, 200);
  const [timepublished, settimepublished] = useState(null);

  useEffect(() => {
    const date = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true, // Set to false if you want 24-hour format
    };
    const timeString = date.toLocaleTimeString(undefined, options);
    settimepublished(timeString);
  }, []);
  
  return (
    <div className={`${styles.newscard}`}>
      <div className={`${styles.imgndata}`}>
        {/* @jsxImportSource next/next/no-img-element */}
        <img src={elemnt.imageurl} className={`${styles.imageurl}`}  alt="" />
        <div className={`${styles.headingtitle}`}>{elemnt.source_info.name}</div>
        <h2>{elemnt.title}</h2>
        <p className={`${styles.timestamp}`}>{timepublished !== null && timepublished}</p>
      </div>

      <div className={`${styles.bodyandsrc}`}>
        <p className={`${styles.catefories}`}>{elemnt.categories}</p>
        <div className={`${styles.votes}`}>
          <p className={`${styles.likesdislikes}`}>
            {/* @jsxImportSource next/next/no-img-element */}
            <img src="/like2.png" height={30} alt="" />:{elemnt.downvotes}
          </p>
          <p className={`${styles.likesdislikes}`}>
            {/* @jsxImportSource next/next/no-img-element */}
            <img src="/dislike2.png" height={30} alt="" />:{elemnt.upvotes}
          </p>
        </div>
        <p className={`${styles.body}`}>{limitedBody}</p>
        <p className={`${styles.tags}`}>{elemnt.tags}</p>
        <a href={`${elemnt.url}`} className={`${styles.url}`}>
          {elemnt.url}
        </a>
      </div>
    </div>
  );
}


function Newsfeed() {

 const [newsdata,setnewsdata]=useState(null);
 const [isdataloaded, setdataloaded]=useState(null);
 useEffect( () =>{
   
  const newsdatahandlearrowfunc = async()=>{
    try {
      const res=await axios.get(`${server}/newsdatafeed`)
      setnewsdata(res.data)
      setdataloaded(true);
    }
    catch (error) {
      console.log(error);
    }
  }
  newsdatahandlearrowfunc();

 },[])




  return (
    <> <Head>
    <title>newsfeed</title>
    <meta name="TradeY is a trading platform for crypto currencies over 110+ cryptos are available for trading" content="TradeY" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/y.png" />
  </Head>
    <div className={`${styles.newsfeedhomediv}`}>
    <Homecomponentheader2 color={"black"}/>
    <div className={`${styles.heading}`}>
      <h1>TradeY news</h1>
    </div>
  <section className={`${styles.sectionnewsfeed}`}>
 <h2 style={{color:"blue"}}>Top stories 🢃</h2>

 {isdataloaded && Array.isArray(newsdata) ? (
  newsdata.map((elemnt, index) => (
    <Newscard elemnt={elemnt} key={index} />
  ))
) : (
  <div style={{width:"100%",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}><Vortex
        visible={true}
        height="80"
        width="80"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={['brown','black']}
      /></div>
)}


           
  </section>
<Footer/>
    </div></>
  )
}

export default Newsfeed
