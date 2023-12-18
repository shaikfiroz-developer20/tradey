import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const NotFoundPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the home page when the user navigates back from the 404 page
    const handleRouteChange = () => {
      router.replace('/');
    };

    // Listen for route changes and redirect to the home page
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>Not Found</title>
        <meta name="TradeY is a trading platform for crypto currencies over 110+ cryptos are available for trading" content="TradeY" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/y.png" />
      </Head>
      <div style={{ width: "100%", height: "100vh", display: "grid", justifyContent: "center", alignItems: "center" }}>
        <div style={{ display: "grid", placeItems: "center" }}>
          <img src="/logoTt.png" alt='logo' />
          <h1>404 - Page Not Found</h1>
          <p>Sorry, the page you are looking for does not exist.</p>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
