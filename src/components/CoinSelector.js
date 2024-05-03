import React, { useState, useRef, useEffect, useContext } from "react";
import { icon_prefix } from "../config";

const CoinSelector = ({ options, selected, onSelect }) => {
  const [searchCoin, setSearchCoin] = useState(selected.code);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const filteredOptions = options?.filter((option) =>
    option.code?.toLowerCase().includes(searchCoin?.toLowerCase())
  );

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleClearSearch = () => {
    console.log("delete search");
    setSearchCoin("");
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSelectOption = (option) => {
    onSelect(option);
    setSearchCoin(option.code);
    setIsOpen(false);
  };

  return (
    <div className="searchable-select relative" ref={selectRef}>
      <div className="h-[50px] flex justify-center items-center border-l-[#a0789c] border-l-[1px]  relative px-4">
        <input
          className="h-[40px] outline-none  bg-[#27212B] uppercase"
          type="text"
          placeholder="Select"
          value={searchCoin}
          onChange={(e) => setSearchCoin(e.target.value)}
          onFocus={() => {
            setIsOpen(true);
            handleInputFocus();
          }}
          onBlur={() => handleInputBlur()}
        />
        {isInputFocused && searchCoin.length > 0 && (
          <button
            className="clear-search absolute right-4"
            onClick={handleClearSearch}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-x"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>

      {isOpen && (
        <div className="options absolute w-full max-h-[300px] bg-[#27212B] z-30 overflow-auto overflow-x-hidden">
          {filteredOptions?.map((option, index) => (
            <div
              key={index}
              className="option z-10 h-[50px] flex items-center hover:bg-purple-800 hover:bg-opacity-50 pl-4 gap-2"
              onClick={() => handleSelectOption(option)}
            >
              <img
                src={icon_prefix + option.icon}
                className="w-[17px] h-[17px] invert"
              ></img>
              <div className="flex flex-col">
                <label className="uppercase">{option.code}</label>
                {/* <label className="text-blue-400 ">{option.name}</label> */}
                <span className="text-[0.8rem] text-red-400 overflow-hidden">
                  {option.network}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoinSelector;
