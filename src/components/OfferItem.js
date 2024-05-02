import Button from "./Button";

const OfferItem = () => {
  const handleClick = () => {};
  return (
    <div className="bg-[#27212B] flex rounded-[20px] p-[20px]">
      <div className="flex-1 flex flex-col gap-2">
        <div>
          <img></img>
          <label>Mercuryo</label>
        </div>
        <div>
          <label>Rate:</label>
          <label>~0.01532BTC</label>
        </div>
        <div>
          <label>ETA:</label>
          <label>5-25min</label>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex-1 flex justify-end items-start">
          <label className="bg-green-400 p-1 rounded-xl text-[0.8rem]">Trusted partner</label>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <Button
            type={0}
            label={"exchange"}
            handleClick={handleClick}
            className={"w-[150px] h-[35px]"}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default OfferItem;
