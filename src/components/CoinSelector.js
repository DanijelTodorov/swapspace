import { SelectImage } from "./Svg";

const CoinSelector = ({onClick}) => {
  return (
    <div className="w-[140px] flex items-center justify-evenly" onClick={onClick}>
      <img
        style={{ width: "20px", height: "20px", filter: "invert(1)" }}
        src="https://storage.swapspace.co/static/font/src/btc.svg"
      ></img>
      <span>BTC</span>
      <div className="w-[10px]">
        <SelectImage></SelectImage>
      </div>
    </div>
  );
};

export default CoinSelector;
