import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { apiKey } from "../config";

export const CoinContext = createContext([]);

const CoinContextProvider = ({ children }) => {
  const [coins, setCoins] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'https://api.swapspace.co/api/v2/currencies',
          headers: { 
            'Accept': 'application/json', 
            'Authorization': apiKey
          }
        };

        const response = await axios(config);
        setCoins(response.data);
        console.log("coins = ", response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return <CoinContext.Provider value={coins}>{children}</CoinContext.Provider>;
};

export default CoinContextProvider;