import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import CoinSelector from "../components/CoinSelector";
import { PairSwapIcon } from "../components/Svg";
import { CoinContext } from "../context/CoinContextProvider";
import axios from "axios";
import { apiKey } from "../config";

const Home = () => {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
  const quickExchangeOnClick = {};
  const viewOffersOnClick = () => {
    console.log("viewOffersOnClick");
    const settingsData = {
      sendCoin: selectedSendCoin,
      recvCoin: selectedRecvCoin,
      amount: sendAmount,
    };

    navigate("/exchange", { state: settingsData });
  };

  const [unableExchange, setUnableExchange] = useState(false);
  const coins = useContext(CoinContext);
  const [selectedSendCoin, setSelectedSendCoin] = useState({
    name: "Bitcoin",
    icon: "/static/font/src/btc.svg",
    deposit: true,
    withdrawal: true,
    code: "btc",
    network: "btc",
    id: "t2V9DrpVNf",
    popular: true,
    networkName: "Bitcoin",
    validationRegexp:
      "^[13][a-km-zA-HJ-NP-Z1-9]{25,80}$|^(bc1)[0-9A-Za-z]{25,80}$",
    hasExtraId: false,
    extraIdName: "",
  });
  const [selectedRecvCoin, setSelectedRecvCoin] = useState({
    name: "Ethereum",
    icon: "/static/font/src/eth.svg",
    deposit: true,
    withdrawal: true,
    code: "eth",
    network: "eth",
    id: "qfXXh1jpc2",
    popular: true,
    networkName: "Ethereum",
    validationRegexp: "/^(0x)[0-9A-Fa-f]{40}$/",
    hasExtraId: false,
    extraIdName: "",
  });
  const [sendAmount, setSendAmount] = useState(0.1);
  const [getAmount, setGetAmount] = useState(0);

  const handleSelectSendCoin = (option) => {
    setSelectedSendCoin(option);
  };

  const handleSelectRecvCoin = (option) => {
    setSelectedRecvCoin(option);
  };

  const handleSetSendAmount = (option) => {
    setSendAmount(option);
  };

  useEffect(() => {
    console.log('get amount');
    const fetchData = async () => {
      const url =
        "https://api.swapspace.co/api/v2/amounts/best?amount=" +
        sendAmount +
        "&fromCurrency=" +
        selectedSendCoin.code +
        "&toCurrency=" +
        selectedRecvCoin.code +
        "&fromNetwork=" +
        selectedSendCoin.network +
        "&toNetwork=" +
        selectedRecvCoin.network;
      try {
        const config = {
          method: "get",
          maxBodyLength: Infinity,
          url: url,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: apiKey,
          },
        };

        const response = await axios(config);
        console.log("getAmount = ", response.data);
        unableExchange(false);
      } catch (error) {
        console.log(error);
        setGetAmount(0);
        setUnableExchange(true);
      }
    };

    fetchData();
  }, [sendAmount, selectedRecvCoin, selectedSendCoin]);

  return (
    <div className="h-screen flex justify-center items-center bg-[#231f26] text-white gap-8">
      <div className="bg-[#36293B] flex flex-col w-[600px] p-[24px] gap-[10px] rounded-xl">
        <div className="w-full flex">
          <span
            className={`flex-1 ${
              tab == 0
                ? "text-white border-b-white"
                : "text-[#a0789c] border-b-[#a0789c]"
            } text-center border-b-[1px] h-[50px] flex justify-center items-center`}
            onClick={() => setTab(0)}
          >
            Exchange Crypto
          </span>
          <span
            className={`flex-1 ${
              tab == 1
                ? "text-white border-b-white"
                : "text-[#a0789c] border-b-[#a0789c]"
            } text-center border-b-[1px] h-[50px] flex justify-center items-center`}
            onClick={() => setTab(1)}
          >
            Buy/Sell Crypto
          </span>
        </div>
        <label>You send</label>
        <div className="relative bg-[#27212B] w-full h-[50px] flex">
          <input
            type="number"
            className="bg-transparent flex-1 outline-none px-2"
            value={sendAmount}
            onChange={(e) => handleSetSendAmount(e.target.value)}
          ></input>
          <CoinSelector
            options={coins}
            selected={selectedSendCoin}
            onSelect={handleSelectSendCoin}
          ></CoinSelector>
        </div>
        <div className="flex justify-between items-center">
          <label>You get</label>
          <div>
            <PairSwapIcon></PairSwapIcon>
          </div>
        </div>
        <div className="relative bg-[#27212B] w-full h-[50px] flex">
          <input
            type="number"
            value={getAmount}
            className="bg-transparent flex-1 outline-none px-2"
          ></input>
          <CoinSelector
            options={coins}
            selected={selectedRecvCoin}
            onSelect={handleSelectRecvCoin}
          ></CoinSelector>
        </div>
        { unableExchange && <div>This pair is not available for exchange</div>}
        <div className="flex gap-2">
          <Button
            type={0}
            label={"Quick exchange"}
            handleClick={quickExchangeOnClick}
            className={"flex-1"}
          ></Button>
          <Button
            type={1}
            label={"View offers"}
            handleClick={viewOffersOnClick}
            className={"flex-1"}
          ></Button>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-16">
        <label className="text-[3rem]">
          More than <br></br>a crypto exchange
        </label>
        <label className="text-[1.5rem]">
          We pick the best — you make a choice
        </label>
      </div>
    </div>
  );
};

export default Home;
