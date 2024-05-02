import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import CoinSelector from "../components/CoinSelector";
import { PairSwapIcon } from "../components/Svg";
import OfferItem from "../components/OfferItem";
import { CoinContext } from "../context/CoinContextProvider";
import axios from "axios";
import { apiKey } from "../config";
import {
  estimateExchangeAmounts,
  estimateExchangeAmounts_new,
  getListOfPartners,
} from "../api";

const Exchange = () => {
  const { state } = useLocation();
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
  const coins = useContext(CoinContext);
  const quickExchangeOnClick = {};
  const viewOffersOnClick = () => {
    console.log("viewOffersOnClick");
    navigate("/exchange");
  };
  const [unableExchange, setUnableExchange] = useState(false);
  const [sendAmount, setSendAmount] = useState(state.amount);
  const [selectedSendCoin, setSelectedSendCoin] = useState(state.sendCoin);
  const [selectedRecvCoin, setSelectedRecvCoin] = useState(state.recvCoin);
  const [getAmount, setGetAmount] = useState(0);
  const [exchangablePartner, setExchangablePartner] = useState([]); 

  const getAllPartners = async () => {
    const partners = await getListOfPartners();
    console.log("partners = ", partners);
    return partners;
  };

  useEffect(() => {
    const getAmounts = async () => {
      const amount = sendAmount;
      const fromCurrency = selectedSendCoin.code;
      const toCurrency = selectedRecvCoin.code;
      const fromNetwork = selectedSendCoin.network;
      const toNetwork = selectedRecvCoin.network;
      let partners = await getAllPartners();
      let exchangablePartner = [];
      for (let i = 0; i < partners.length; i++) {
        console.log("partnerr = ", partners[i]);
        const response = await estimateExchangeAmounts_new(
          amount,
          fromCurrency,
          toCurrency,
          fromNetwork,
          toNetwork,
          partners[i].path,
          partners[i].fixed,
          partners[i].float
        );
        console.log("amount one result = ", response);
        for (let i = 0; i < response.length; i++)
          if (response[i].toAmount > 0) exchangablePartner.push(response[i]);
      }
      console.log("exchangablePartner = ", exchangablePartner);
      setExchangablePartner(exchangablePartner);

    };
    getAmounts();
  }, [sendAmount, selectedRecvCoin, selectedSendCoin]);

  const handleSetSendAmount = (option) => {
    setSendAmount(option);
  };

  const handleSelectSendCoin = (option) => {
    setSelectedSendCoin(option);
  };

  const handleSelectRecvCoin = (option) => {
    setSelectedRecvCoin(option);
  };

  const [offerTab, setOfferTab] = useState(0);

  return (
    <div className="min-h-screen bg-[#231f26] text-white px-[20%] pt-[150px]">
      <div className="text-[4rem] pb-[50px]">Select amount and offer</div>
      <div className="flex">
        <div className="bg-[#36293B] w-[50%] flex flex-col p-[24px] gap-[10px] rounded-xl self-start">
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
              value={sendAmount}
              onChange={(e) => handleSetSendAmount(e.target.value)}
              className="bg-transparent flex-1 outline-none px-2"
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
          {unableExchange && <div>This pair is not available for exchange</div>}
        </div>
        <div className="w-[50%] px-[40px] ">
          <div className="flex h-[40px]">
            <div
              className={`flex-1 text-center ${
                offerTab == 0
                  ? "text-white border-b-white"
                  : "text-[#a0789c] border-b-[#a0789c]"
              } border-b-[1px]`}
              onClick={() => setOfferTab(0)}
            >
              Sort by relevance
            </div>
            <div
              className={`flex-1 text-center ${
                offerTab == 1
                  ? "text-white border-b-white"
                  : "text-[#a0789c] border-b-[#a0789c]"
              } border-b-[1px]`}
              onClick={() => setOfferTab(1)}
            >
              Sort by rate
            </div>
            <div
              className={`flex-1 text-center ${
                offerTab == 2
                  ? "text-white border-b-white"
                  : "text-[#a0789c] border-b-[#a0789c]"
              } border-b-[1px]`}
              onClick={() => setOfferTab(2)}
            >
              Sort by ETA
            </div>
          </div>
          <div className=" flex flex-col gap-4 pt-4">
            <OfferItem />
            <OfferItem />
            <OfferItem />
            <OfferItem />
            <OfferItem />
            <OfferItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
