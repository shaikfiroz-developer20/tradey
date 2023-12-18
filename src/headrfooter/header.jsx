import styles from "@/styles/header.module.css";
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import { motion } from "framer-motion";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
const inter = Inter({ subsets: ['latin'] });

function Header() {
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const searchElement = e.target.searching.value; // Use e.target to access the form elements
    if(searchElement ===''){
        toast("it is empty");
    }
    else{
      const searchQuery = searchElement.toUpperCase(); // Convert to uppercase
      router.push(`/cryptopage?cryptocurrency=${searchQuery}`);
    }
    
  };

  return (
    <header >
      <ToastContainer style={{marginTop:"100px"}} 
      
      theme="dark"/>
      <nav  className={`${styles.nav}`}>
        <ul className={`${styles.navul}`} style={{ borderBottom: "none", marginTop: "10px" }}>
          <li className={`${styles.lisiitems} ${inter}`}>
            <img height={40} width={130} src='/logoTt.png' alt="" />
          </li>
          <li className={`${styles.listinputmiddleininput}`}>
            <form onSubmit={handleSearch}>
              <input
                placeholder="Search with crypto Symbol!   Which Crypto Are You looking today? "
                name="searching"
                id="searching"
                className={`${styles.listinputmiddleininputin}`}
                type="text"
                maxLength={5}
                pattern="^[a-zA-Z]+$"
                autoComplete="off" // Change autocomplete to autoComplete
                />
            </form>
          </li>
          <li className={`${styles.lisiitems}`}>
            <motion.img height={40} width={40} src={`/profilepic.svg`} />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
