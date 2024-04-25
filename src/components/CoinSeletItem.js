const CoinSelectItem = () => {
  return (
    <div className="flex items-center h-[50px] gap-2">
      <img style={{ width: "15px", height: "15px", filter: "invert(1)" }}
      src="https://storage.swapspace.co/static/font/src/btc.svg"/>
      <label className="">ETH</label>
      <label className="text-[#a0789c]">Ethereum</label>
    </div>
  );
};

export default CoinSelectItem;