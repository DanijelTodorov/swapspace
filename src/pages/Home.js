import { useState } from "react";
import Button from "../components/Button";
import CoinSelect from "../components/CoinSelect";
import { PairSwap, Search } from "../components/Svg";

const Home = () => {
  const [tab, setTab] = useState(0);

  const quickExchangeOnClick = {};
  const viewOffersOnClick = {};
  return (
    <div className="h-screen flex justify-center items-center bg-[#231f26] text-white ">
      <div className="bg-[#36293B] flex flex-col w-[600px] p-[24px] gap-[10px] rounded-xl">
        <div className="w-full flex">
          <span className={`flex-1 ${tab == 0 ? "text-white border-b-white":"text-[#a0789c] border-b-[#a0789c]"} text-center border-b-[1px] h-[50px] flex justify-center items-center`} onClick={()=>setTab(0)}>
            Exchange Crypto
          </span>
          <span className={`flex-1 ${tab == 1 ? "text-white border-b-white":"text-[#a0789c] border-b-[#a0789c]"} text-center border-b-[1px] h-[50px] flex justify-center items-center`} onClick={()=>setTab(1)}>
            Buy/Sell Crypto
          </span>
        </div>
        <label>You send</label>
        <CoinSelect/>
        <div className="flex justify-between items-center">
          <label>You get</label>
          <div>
            <PairSwap></PairSwap>
          </div>
        </div>
        <div className="bg-[#27212B] w-full h-[50px]"></div>
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
    </div>
  );
};

export default Home;
