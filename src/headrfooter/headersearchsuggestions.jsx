import styles from "@/styles/header.module.css"
import { Inter } from 'next/font/google'
import {motion} from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react";
import Image from "next/image";
const inter = Inter({ subsets: ['latin'] })

const Navheader = () => {
  const [isdesktop, setIsMobile] = useState(null);

  const handleResize = () => {
    if(window.innerWidth <= 768){
      setIsMobile(false);
    }
    else{
      setIsMobile(true);

    }
  };

  useEffect(() => {
    // Initial setup
    handleResize();

    // Add event listener to update dimensions on window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  // State to keep track of the active section
  const [activeSection, setActiveSection] = useState(null);

  // Function to handle smooth scrolling to sections
  const handleNavigation = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);

    // Animate scrolling using motion
    if (element) {
      const offset = element.offsetTop; // Adjust the offset based on your layout
      window.scrollTo({
        top: offset,
        behavior: 'smooth',
      });
    }
  };




  // Your return statement with JSX
  return (
    <header>
      <motion.nav initial={{opacity:0}} animate={{opacity:1, y: [-100, 0] }} className={`${styles.nav} ${styles.sticky}`}>
        <ul className={`${styles.navul}`}>
          <li  className={`${styles.lisiitems} ${inter}`}>
            <a className={`${styles.lisiitems} `}href="/Tinfo">
            <motion.img whileHover={{rotate:[0,360,0]}} src="/logoT.png" height={75} width={75} alt="" />
            <h3><img src={`/logoTt.png`} width={130} height={40} alt=""  /></h3></a>
          </li>
          {isdesktop?(<ul className={`${styles.navulinul }  ${inter}`}>
            {/* Use Link for smooth scrolling */}
            <motion.li  whileHover={{ scale: 1.1 }} >
                <a 
                  className={`${styles.navigationbarsitema} `} onClick={() => handleNavigation('section1')}>Trade</a>
            </motion.li>
            <motion.li  whileHover={{ scale: 1.1 }} >
                <a className={`${styles.navigationbarsitema}`} onClick={() => handleNavigation('futurenoptions')}>Future N Options</a>
            </motion.li>
            <motion.li  whileHover={{ scale: 1.1 }} >
                <a className={`${styles.navigationbarsitema}`} onClick={() => handleNavigation('section3')}>Learn</a>
            </motion.li>

            <motion.li  whileHover={{ scale: 1.1 }} >
                <a className={`${styles.navigationbarsitema}`} onClick={() => handleNavigation('section4')}>Contact Support</a>
            </motion.li>         
             </ul>):(<div ><img height={30} width={30} src={`/hamburger.svg`} alt="" /></div>)}



          <li className={`${styles.lisiitems}`}>
            {/* Use motion.button for animations */}
            <Link href={`/login`}>
             <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.21 }}
              className={`${styles.bittonsignuplogin}`}
            >
              Login/Register
            </motion.button></Link>
           
          </li>
        </ul>
      </motion.nav>

    
    </header>
  );
};



export default Navheader
