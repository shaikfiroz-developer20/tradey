import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import styles from '@/styles/header.module.css';
import styles1 from '@/styles/Home.module.css';
import section2s from '@/styles/futureotions.module.css';
import Footer from '@/headrfooter/footer';
import faqData from '@/homecomponents/questionaries';
import Navheader from '@/headrfooter/headersearchsuggestions';
// Component for displaying individual questions and answers
function Questionscard(props) {
  const [isansrequested, setanswererequested] = useState(false);

  const handleansshow = () => {
    setanswererequested(!isansrequested);
  };

  return (
    <div className={`${styles1.questionscard}`}>
      <div
        onClick={handleansshow}
        style={{ width: 'fit-content', cursor: 'pointer', display: 'flex', justifyContent: 'flex-start', color: 'white', alignItems: 'center' }}
      >
        <h4>{props.element.question}</h4>
        <img src={`/downarr.png`} height={30} width={30} alt="" />
      </div>
      {isansrequested && <p style={{ color: 'white' }}>{props.element.answer}</p>}
    </div>
  );
}

// Component for displaying learning cards with animations
function Learncard(prop) {
  const cardStyle = {
    position: 'relative',
    display: 'inline-block',
    backgroundColor:"white",
    marginRight: '20px',
    padding:"10px",
    height:"auto",
    boxShadow: "0 0 10px 0px #000000",
    borderRadius:"8px"
    };

  const hoverStyle = {
    y: prop.y,
    x: prop.x,
  };

  const animateStyle = {
    x: prop.value,
    y: prop.y,
  };

  return (

    <motion.div whileHover={hoverStyle} animate={animateStyle} style={cardStyle}>
      <a href={prop.videourl} target='blank'>
        <img width={200} height={200} src={prop.imgurl} alt="" />
        <p style={{width:"200px",color:"black"}}>{prop.p}</p>
      </a>
    </motion.div>
  );
}

// Component for displaying a card with future options information
function Cardfno(props) {
  return (
    <div className={`${section2s.fnocard}`}>
      <img src={props.img} height={40} width={40} alt="" />
      <h3 style={{color:"#789838"}}>{props.infoh3}</h3>
      <p>{props.infop}</p>
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
        <motion.img whileInView={{ rotateX: [0, 360, 0] }} whileHover={{ rotateY: [0, 360, 0] }} src={`/rightarrow.svg`} height={50} width={100} alt="" />
        <input className={`${section2s.fnocardbutton}`} type="button" value="learn more" />
      </div>
    </div>
  );
}

// Main component for the home page
export default function Homem() {
  // State for tracking whether the page is viewed on a desktop
  const [isdesktop, setIsMobile] = useState(null);

  // Function to handle window resize and update the state
  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  };

  // useEffect to set up initial dimensions and add event listener for window resize
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // State for tracking OTP status
  const [isotpsent, setisotpsent] = useState(false);

  // Array of images for animation
  const images = [
    { src: '/doge.png', y: 40 },
    { src: '/trx.png', y:80 },
    { src: '/usdt.png', y: 120 },
    { src: '/ada.png', y: 170 },
    { src: '/sol.png', y: 220 },
    { src: '/xrp.png', y: 280 },
    { src: '/eth.png', y: 300 },
    { src: '/btc.png', y: 330 },
  ];


  // Animation variants for images
  const animateVariants = (image, index) => ({
    normal: {
      rotate: [0, 360, 0],
      y: [0, -image.y, 0],
      transition: { repeat: Infinity, duration: 3 + index * 0.5, ease: 'linear' },
    },
    onfocus: {
      rotate: [0, 180, 0],
    },
  });

  // Function to handle form submission for email
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email: e.target.email.value };
    toast("otp sent to this mailid: " + data.email);
    setisotpsent(true);
  };

  // Function to handle OTP submission
  const handelotpsubmission = async (e) => {
    e.preventDefault();
    const data = { otp: e.target.text.value };
    toast("otp sent to this mailid: " + data.otp);
  };

  // State for tracking hovered image in the array
  const [hoveredImage, setHoveredImage] = useState(null);




  // Render
  return (
    <>
    <Head>
        <title>intro</title>
        <meta name="TradeY is a trading platform for crypto currencies over 110+ cryptos are available for trading" content="TradeY" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/y.png" />
      </Head>
      <main >
        <Navheader/>
    <div>
      <ToastContainer style={{ position: 'fixed', marginTop: '10vh' }} />

      {/* Section 1 */}
      <div className={`${styles.sectionsset}`}>
        <section className={`${styles1.section1div}`} id="section1">
          <div className={`${styles1.sssss}`}>
            <div style={{ width: 'fit-content' }}>
              <h1 style={{ marginTop: '30%', width: 'fit-content' }} className={`${styles1.titileofapp}`}>
                TradeY
              </h1>
              <p style={{ display: 'flex', fontSize: '30px', width: 'fit-content', fontFamily: 'sans-serif', fontWeight: '600' }}>
                <b style={{ color: 'red' }}>100+</b> Cryptos ready for you!
              </p>
              {isotpsent ? (
                <form onSubmit={handelotpsubmission} style={{ border: '2px solid grey', width: 'fit-content' }}>
                  <input
                    style={{ width: '250px', height: '28px', fontFamily: 'inherit', padding: '3px', borderWidth: '0px', outline: 'none' }}
                    name="text"
                    type="text"
                    placeholder="Enter otp..."
                  />
                  <input
                    style={{ backgroundColor: 'yellow', padding: '6px', height: '28px', cursor: 'pointer', border: 'none', fontWeight: '600' }}
                    type="submit"
                    value="Activate account"
                  />
                </form>
              ) : (
                <form onSubmit={handleSubmit} style={{ width: 'fit-content' }}>
                  <motion.div animate={{ x: [0, 30, -30, 0] }} style={{ marginTop: '15px', border: '2px solid grey', borderBottom: '2px solid grey', height: 'auto' }}>
                    <input
                      id="a34"
                      name="email"
                      style={{
                        width: '250px',
                        height: '28px',
                        fontFamily: 'inherit',
                        padding: '3px',
                        borderWidth: '0px',
                        outline: 'none',
                      }}
                      autocomplete="off"
                      placeholder="Email.."
                      type="email"
                      required
                      pattern="^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ rotateY: 360 }}
                      style={{ backgroundColor: 'yellow', padding: '6px', height: '28px', cursor: 'pointer', border: 'none', fontWeight: '600' }}
                    >
                      Get Started
                    </motion.button>
                  </motion.div>
                </form>
              )}
            </div>
          </div>

          <div className={`${styles1.sectiondivoneandtwo}`} style={{ display: 'grid' }}>
            <div style={{ marginTop: '15vh' }}>
              <p style={{ fontFamily: 'inherit', fontWeight: '600', fontSize: '30px', color: ' rgb(61, 61, 61)' }}>
                Buy And sell All cryptos at one place <br />
                <b>bitcoins all time growth
             <b style={{color:"green"}}>14,213.50%</b>
                </b>
              </p>
            </div>
            <div style={{ flexDirection: 'row' }}>
              <div className={`${styles1.classnameimagesboncer}`}>
                {images.map((image, index) => (
                  <a
                    key={index}
                    href={`https://tradeY.com${image.src.replace('.png', '')}`}
                    onMouseEnter={() => setHoveredImage(index)}
                    onMouseLeave={() => setHoveredImage(null)}
                  >
                    <motion.img
                      key={index}
                      whileHover={{ scale: 1.1, transition: { repeat: 0, duration: 1 } }}
                      animate={hoveredImage === index ? 'onhover' : 'normal'}
                      variants={(animateVariants(image, index))}
                      style={{ cursor: 'pointer' }}
                      src={image.src}
                      height={50}
                      width={50}
                      alt=""
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className={`${section2s.section2}`} id="futurenoptions">

          <div className={`${section2s.imagesandcontentdivinfutureandoptions}`}>
            <motion.div style={{ backgroundColor: 'grey', borderRadius: '50%', marginTop: '120px' }}>
              <motion.img whileHover={{ scale: 1.1 }} style={{ borderRadius: '50%' }} src={`/tradingimggirl.jpeg`} height={300} width={300} alt="" />
            </motion.div>
            <motion.div
              whileInView={isdesktop && { opacity: 1, x: [200, 0], transition: { delay: 0.1 } }}


              className={section2s.sidecardsinfodivin}>
              <Cardfno  img={`/futures.png`}  infoh3={"Futres contracts."} infop={"Futres contracts in no time Just a click away. Hurray!"} />
              <Cardfno  img={`/options.png`}  infoh3={"Options Trading available"} infop={"Options trading is availbale in more than 5 cryptocurrency pairs"} />
              <Cardfno  img={`/buy.png`}  infoh3={"Buy and Sell"} infop={"Buy and sell almost 110 cryptos and also swap the cryptos at lowest industry charges almost zero!"} />
            </motion.div>
          </div>
        </section>

        {/* Section 3 */}
        <section className={`${section2s.section3}`} id="section3">
          <div className={`${section2s.section3in}`}>
            <div className="oneimg">
              <div style={{ marginTop: '100px' }}>
                <img  src={`/learn.svg`} alt="" />
                <h3 style={{ color:"gold",  fontSize: 'bolder', fontFamily: 'initial', fontSmooth: '2em' }}>LearningHub</h3>
              </div>

              <div style={{ backgroundColor: 'grey', boxShadow: 'inset  0.3em 0.3em 1em rgba(0, 0, 0, 0.7)', borderTop: 'none', padding: '25px' }}>
                {isdesktop ? (
                  <div className={`${section2s.learncardsdiv}`}>
                    <Learncard p={"What is Bitcoin? The start of crypto! complete in just one video."} videourl={"https://youtu.be/ojdEP61l3M0?si=vUWWdpbN7mwsTLBd"} imgurl={`/whatisbtc.jpeg`} y={5} x={-10} />
                    <Learncard  p={"Crypto currencies the face of future and the everlasting economy. here are top 10."}  videourl={`https://www.cfr.org/backgrounder/cryptocurrencies-digital-dollars-and-future-money`} imgurl={`/top10cryptos.jpeg`} y={10} x={-40} />
                    <Learncard  p={"Best crypto Trading statergies for the  year 2023 and 2024."}  videourl={"https://youtu.be/ojdEP61l3M0?si=vUWWdpbN7mwsTLBd"} imgurl={`/tradingstatergies.jpeg`} y={15} x={-60} />
                  </div>
                ) : (
                  <div className={`${section2s.learncardsdiv}`}>
                    <Learncard  p={"What is Bitcoin? The start of crypto! complete in just one video."}  videourl={"https://youtu.be/ojdEP61l3M0?si=vUWWdpbN7mwsTLBd"} imgurl={`/whatisbtc.jpeg`}y={0} x={0} />
                    <Learncard p={"Crypto currencies the face of future and the everlasting economy. here are top 10."}   videourl={"https://youtu.be/ojdEP61l3M0?si=vUWWdpbN7mwsTLBd"} imgurl={`/top10cryptos.jpeg`} y={0} x={0} />
                    <Learncard   p={"Best crypto Trading statergies for the  year 2023 and 2024."}   videourl={"https://youtu.be/ojdEP61l3M0?si=vUWWdpbN7mwsTLBd"} imgurl={`/tradingstatergies.jpeg`}  y={0} x={0} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section id="section4" className={`${section2s.section4}`}>
          <div style={{ marginTop: '15vh', paddingBottom: '70px', minHeight: '65vh', height: 'auto', display: 'grid', justifyContent: 'center', alignItems: 'center' }} className="contact">
            {Object.keys(faqData).map((element, index) => {
              const faqItem = faqData[element];
              return <Questionscard element={faqItem} key={index} />;
            })}
          </div>
          <Footer />
        </section>
      </div>
    </div>
    </main>

    </>
  );
}
