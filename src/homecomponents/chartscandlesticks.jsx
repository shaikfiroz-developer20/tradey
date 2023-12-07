import axios from "axios";
import { createChart } from "lightweight-charts";
import { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/router';

const server=process.env.NEXT_PUBLIC_SERVER_URL;


function ChartData(props) {
  const router = useRouter();
  const chartRef = useRef(null);
  const [datais, setdatais] = useState([]);
  const [isdataloaded, setdataloaded] = useState(false);
  const { timef } = props;

 

  const getRealTimeData = async (timef, cryptocurrency) => {
    try {
      const response = await axios.get(
        `${server}/datacandlestickdata?timef=${timef}&crypto=${cryptocurrency}`
      );
      setdatais(response.data.Data.Data);
      setdataloaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const parentContainer = document.getElementById("container");

    // Create the chart only if it hasn't been created yet
    if (!chartRef.current) {
      const chart = createChart(parentContainer, {
        layout: {
          textColor: "white",
          background: { color: "#122" },
        },
        grid: {
          vertLines: { color: "#001" },
          horzLines: { color: "#001" },
        },
      });

      // Create CandlestickSeries once
      const candlestickSeries = chart.addCandlestickSeries({
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      });

      chartRef.current = { chart, candlestickSeries }; // Save the chart and series instances in the ref

      // Fit the chart content to the available space
      chart.timeScale().fitContent();
    }

    const fetchData = () => {
      if (chartRef.current && isdataloaded && datais) {
        const { candlestickSeries } = chartRef.current;

        // Check if datais is an array and has a length property before setting the data
        if (Array.isArray(datais) && datais.length > 0) {
          candlestickSeries?.setData(datais);
        }
      }
    };

    fetchData();

    const handleResize = () => {
      chartRef.current?.chart?.applyOptions({
        width: parentContainer.clientWidth,
        height: parentContainer.clientHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isdataloaded, datais]);

  useEffect(() => {
    const fetchData = () => {
      const { cryptocurrency } = router.query;
      if (cryptocurrency) {
        getRealTimeData(timef, cryptocurrency);
      }
    };

    fetchData(); // Initial fetch

    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, [timef,router.query, router.query.cryptocurrency]);

  return (
    <div
      id="container"
      style={{
        width: "100%",
        height: props.chartheight ? `70vh` : "500px",
        overflow: "hidden",
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
}

export default ChartData;
