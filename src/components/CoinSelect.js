import { useState } from "react";
import CoinSelector from "./CoinSelector";
import CoinSelectItem from "./CoinSeletItem";
import { Search } from "./Svg";

const CoinSelect = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="relative bg-[#27212B] w-full h-[50px] flex">
      <input
        type="number"
        className="bg-transparent flex-1 outline-none px-2"
      ></input>
      <CoinSelector onClick={() => setSearchOpen(false)}></CoinSelector>
      {searchOpen && (
        <div className="w-full absolute flex flex-col bg-[#27212B] px-4">
          <div className="flex w-full items-center">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none bg-transparent h-[50px]"
            ></input>
            <div className="w-[16px]">
              <Search></Search>
            </div>
          </div>
          <CoinSelectItem />
          <CoinSelectItem />
          <CoinSelectItem />
          <CoinSelectItem />
          <CoinSelectItem />
          <CoinSelectItem />
        </div>
      )}
    </div>
  );
};

export default CoinSelect;
