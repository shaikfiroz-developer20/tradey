import styles from '@/styles/cryptopage.module.css';
import { useState, useEffect } from 'react';
import sty from '@/styles/useful.module.css';

function Askordercard(props) {
  const {element}=props;
  return (
    <div className={`${styles.Askorders}`}>
      <h4>Ask</h4>
      <p style={{width:"70px"}}>{element.P}</p>
      <p style={{width:"70px"}}>{element.Q}</p>
    </div>
  );
}

  function Bidordercard(props){
    
    const {element}=props;

    return (
      <div className={`${styles.bidorders}`}>
        <h4>Bid</h4>
        <p style={{width:"70px"}}>{element.P}</p>
      <p style={{width:"70px"}}>{element.Q}</p>
      </div>
    );
  }
  
  
  function BuySell(prop) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [walletbalance,setwalletbalance]=useState(20000)
    const { buysell } = prop;

  
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };
  
    const handleQuantityChange = (event) => {
      setQuantity(event.target.value);
      setSelectedOption(event.target.value);

    };

    const handleSubmit = (event) => {
      event.preventDefault();
      const quantity1 = event.target.quant.value;
      if (prop.buysell === 'buy') {
        setwalletbalance(parseFloat(walletbalance) + parseFloat(quantity1));
      } else if (prop.buysell === 'sell') {
        setwalletbalance(parseFloat(walletbalance) - parseFloat(quantity1));
      }
    };
    

    const handleClose = () => {
      if (prop.buysell === 'buy') {
        prop.buyfall(); // Use prop.buyfall() instead of props.buyfall()
      } else if (prop.buysell === 'sell') {
        prop.sellfal(); // Use prop.sellfal() instead of props.sellfal()
      }
    };
  
    return (
      <div className={`${sty.trasactionbuysellcard}`}>
        <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
        <div className={`${sty.lablebuttonsradio}`} style={{width:"70%",color:"white"}}>
          <label>
            <input
              type="radio"
              value="usd"
              checked={selectedOption === 'usd'}
              onChange={handleOptionChange}
            />
            USD
          </label>
  
          <label>
            <input
              type="radio"
              value="usdt"
              checked={selectedOption === 'usdt'}
              onChange={handleOptionChange}
            />
            USDT
          </label>
  
          <label>
            <input
              type="radio"
              value="usbd"
              checked={selectedOption === 'usbd'}
              onChange={handleOptionChange}
            />
            USBD
          </label>
        </div>
        <div style={{display:"flex",width:"30%",justifyContent:"flex-end"}}><img  onClick={handleClose} src="/cancel2svg.svg" height={30} width={30} style={{cursor:'pointer'}} alt="" /></div>
        </div>
        <form onSubmit={handleSubmit}>
          <section className={`${sty.sectioninputandbalance}`}>
            <div className={`${sty.inputquant}`}>
              <input
                className={`${sty.quantityinput}`}
                type="text"
                placeholder="Quantity"
                name='quant'
                id='quant'
                value={quantity}
                onChange={handleQuantityChange}
              />
              <button className={`${sty.quantityinputbutton}`} style={buysell==='buy'?({backgroundColor:"darkgreen",cursor:"pointer"}):({backgroundColor:"red",cursor:"pointer"})} type="submit">{buysell}</button>
            </div>
            <div className={`${sty.walletbalance}`} style={{color:"white"}}>
              <img src="/wallet.png" height={30} width={30} alt="" />: ${walletbalance}
            </div>
          </section>
        </form>
      </div>
    );
  }
  
  



  export   {Askordercard,Bidordercard,BuySell}