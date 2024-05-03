import axios from "axios";
import { apiKey } from "./config";

export const getListOfCurrencies = async () => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://api.swapspace.co/api/v2/currencies",
      headers: {
        Accept: "application/json",
        Authorization: apiKey,
      },
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const estimateExchangeAmounts = async (
  amount,
  fromCurrency,
  toCurrency,
  fromNetwork,
  toNetwork
) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url:
        "https://api.swapspace.co/api/v2/amounts?amount=" +
        amount +
        "&fromCurrency=" +
        fromCurrency +
        "&toCurrency=" +
        toCurrency +
        "&fromNetwork=" +
        fromNetwork +
        "&toNetwork=" +
        toNetwork,
      // url: "https://api.swapspace.co/api/v2/amounts?amount=0.1&fromCurrency=btc&toCurrency=eth&fromNetwork=btc&toNetwork=eth",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log("error = ", error);
    return null;
  }
};

export const estimateExchangeAmounts_new = async (
  amount,
  fromCurrency,
  toCurrency,
  fromNetwork,
  toNetwork,
  partner,
  fixed,
  float
) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url:
        "https://api.swapspace.co/api/v2/amounts?amount=" +
        amount +
        "&fromCurrency=" +
        fromCurrency +
        "&toCurrency=" +
        toCurrency +
        "&fromNetwork=" +
        fromNetwork +
        "&toNetwork=" +
        toNetwork + 
        "&partner=" + 
        partner +
        "&fixed=" + 
        fixed + 
        "&float=" + 
        float + 
        "&estimated=true&isContentPage=false",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log("error = ", error);
    return null;
  }
};

export const getBestAmount = async (
  amount,
  fromCurrency,
  fromNetwork,
  toCurrency,
  toNetwork
) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url:
        "https://api.swapspace.co/api/v2/amounts/best?amount=" +
        amount +
        "&fromCurrency=" +
        fromCurrency +
        "&toCurrency=" +
        toCurrency +
        "&fromNetwork=" +
        fromNetwork +
        " &toNetwork=" +
        toNetwork,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log("error = ", error);
    return null;
  }
};

export const getListOfPartners = async () => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://api.swapspace.co/api/v2/partners",
      headers: {
        Accept: "application/json",
        Authorization: apiKey,
      },
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log("error = ", error);
    return null;
  }
};

export const createNewExchange = async (
  partner,
  fromCurrency,
  fromNetwork,
  toCurrency,
  toNetwork,
  address,
  amount,
  fixed,
  extraId,
  rateId,
  userIp,
  refund
) => {
  try {
    const data = JSON.stringify({
      partner: partner,
      fromCurrency: fromCurrency,
      fromNetwork: fromNetwork,
      toCurrency: toCurrency,
      toNetwork: toNetwork,
      address: address,
      amount: amount,
      fixed: fixed,
      extraId: extraId,
      rateId: rateId,
      userIp: userIp,
      refund: refund,
    });

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.swapspace.co/api/v2/exchange",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "{{apiKey}}",
      },
      data: data,
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log("error = ", error);
    return null;
  }
};

const getExchangeStatus = async (exchange_id) => {
  try {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://api.swapspace.co/api/v2/exchange/" + exchange_id,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
    };
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
