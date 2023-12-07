import Head from 'next/head';


const NotFoundPage = () => {
    return (

      <> <Head>
      <title>error 404</title>
      <meta name="TradeY is a trading platform for crypto currencies over 110+ cryptos are available for trading" content="TradeY" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/y.png" />
    </Head>
      <div style={{width:"100%",height:"100vh",display:"grid",justifyContent:"center", alignItems:"center"}}>
       <div style={{display:"grid",placeItems:"center"}}>
        <img src="/logoTt.png" alt='logo'/>
       <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
       </div>
       
      </div>
      </>
    );
  };
  
  export default NotFoundPage;
  