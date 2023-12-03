import { ethers, BigNumber } from "ethers";
// import placeholderImg from "../../public/img/img-placeholder.png";
// import placeholderImgBig from "../../public/img/img-placeholder-big.png";

export const isProduction = () => process.env.NODE_ENV === "production";

export function shortAddress(address: string | any, start = 6, end = 4) {
  if (!address) return "";
  if (address.length <= start * 2) return address;
  return address.slice(0, start) + "..." + address.slice(address.length - end);
}

export function shortAddress2(address: string | any, end = 6) {
  if (!address) return "";
  return address.slice(address.length - end);
}

export const formatNumber = (num: string | number) => {
  return Number(num).toLocaleString();
};

//转成eth单位（乘以10e18）
export const parseEther = (value: string) => {
  try {
    return ethers.utils.parseEther(value);
  } catch (error) {
    return BigNumber.from("0");
  }
};

//转成字符串（除以10e18）
export const formatEther = (value: BigNumber | string) => {
  if (Number(value) === 0) return "0";

  try {
    return ethers.utils.formatEther(value);
  } catch (error) {
    return "";
  }
};

// AccountSlice.ts, AppSlice.ts
export function setAll(state: any, properties: any) {
  if (properties) {
    const props = Object.keys(properties);
    props.forEach((key) => {
      state[key] = properties[key];
    });
  }
}

export const maxDecimal = (number: number | string, decimal = 4) => {
  // if (Number(number) < 0.01 && Number(number) > 0 && decimal === 2) {
  //   return "<0.01";
  // }

  if (Number(number) < 0.0001 && Number(number) > 0) {
    return "<0.0001";
  }
  const regex = new RegExp(`^(.*\\..{${decimal}}).*`);
  return String(number).replace(regex, "$1");
};

const isClient = typeof window !== "undefined";

export function setItem(key: string, val: string) {
  isClient && localStorage.setItem(key, JSON.stringify(val) || "{}");
}

export function getItem(key: string): any {
  let storageContent: string;
  try {
    const localStorageItem = localStorage.getItem(key);
    if (isClient && localStorageItem !== null) {
      storageContent = JSON.parse(localStorageItem);
    } else {
      storageContent = "";
    }
  } catch (error) {
    storageContent = "";
  }
  return storageContent;
}

export function removeItem(key: string) {
  localStorage?.removeItem(key);
}

export const parseJson = (data: string, type = "{}") => {
  let result = "";
  try {
    result = JSON.parse(data);
  } catch (error) {
    console.log(error, "====JSON.parse===");
    result = JSON.parse(type);
  }
  return result;
};

export const imgOnError = (e: any) => {
  e.currentTarget.onerror = null;
//   e.currentTarget.src = placeholderImg.src;
  e.currentTarget.className = "error";
  return;
};

export const imgOnError2 = (e: any) => {
  e.currentTarget.onerror = null;
//   e.currentTarget.src = placeholderImgBig.src;
  e.currentTarget.className = "error";
  return;
};

export function tranNumber(num: any, point = ",") {
  if (num === 0) return "-";
  const numStr = num.toString().split(".")[0];
  if (numStr.length < 4) {
    return numStr;
  } else if (numStr.length >= 4 && numStr.length <= 6) {
    const decimal = numStr.substring(numStr.length - 3, numStr.length - 3 + point);
    //@ts-ignore
    return `${parseFloat(`${parseInt(num / 1000)}.${decimal}`)}K`;
  } else if (numStr.length > 6 && numStr.length < 10) {
    const decimal = numStr.substring(numStr.length - 6, numStr.length - 6 + point);
    //@ts-ignore
    return `${parseFloat(`${parseInt(num / 1000000)}.${decimal}`)}M`;
  } else {
    // 10亿 = 1b 10，0000，0000
    const decimal = numStr.substring(numStr.length - 9, numStr.length - 9 + point);
    //@ts-ignore
    return `${parseFloat(`${parseInt(num / 1000000000)}.${decimal}`)}B`;
  }
}

export function tranNumber2(num: any, point = ",") {
  const numStr = num.toString().split(".")[0];
  if (numStr.length <= 4) {
    return numStr;
  } else if (numStr.length > 4 && numStr.length <= 7) {
    const decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point);
    //@ts-ignore
    return `${parseFloat(`${parseInt(num / 1000)}.${decimal}`)}K`;
  } else if (numStr.length > 7 && numStr.length <= 10) {
    const decimal = numStr.substring(numStr.length - 7, numStr.length - 7 + point);
    //@ts-ignore
    return `${parseFloat(`${parseInt(num / 1000000)}.${decimal}`)}M`;
  } else {
    // 10亿 = 1b 10，0000，0000
    const decimal = numStr.substring(numStr.length - 10, numStr.length - 10 + point);
    //@ts-ignore
    return `${parseFloat(`${parseInt(num / 1000000000)}.${decimal}`)}B`;
  }
}

export const transferNum = (num: any, decimal = 2) => {
  if (!num && num !== 0) {
    return "";
  }
  // 粉丝数为0，展示-
  if (num <= 0) {
    return "-";
  }
  // 大于9999，换成k为单位, K为单位的情况保留1位小数
  if (num <= 9999) {
    return num;
  } else if (num > 9999 && num <= 9999999) {
    return `${(num / 1000).toFixed(decimal)}K`;
  } else if (num > 9999999 && num <= 1000000000) {
    return `${(num / 1000000).toFixed(decimal)}M`;
  }
  return `${(num / 1000000000).toFixed(decimal)}B`;
};
