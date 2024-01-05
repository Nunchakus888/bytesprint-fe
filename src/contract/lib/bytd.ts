import { ethers, getDefaultProvider } from "ethers";
import USDT_ABI from '../ABI/udst_b.abi.json'
import getSigner from "./getSigner";
import BYTD_ABI from '../ABI/stake.abi.json'

// 质押合约
const BYTD_ADDRESS = '0x6123593d91c834a30634E3FD2A75d1A79dd4CB48'
const USDT_B_ADDRESS = '0xf6F9C2BB380b85b03aaE7f48547D9F0C07E3D388'

//获取USDT实例
const getUSDTInstance = async (address: string, readOnly = false) => {
  if (readOnly) {
    const provider = await getDefaultProvider();
    return new ethers.Contract(address, USDT_ABI, provider);
  }
  const signer = await getSigner();
  if (!signer) return;
  return new ethers.Contract(address, USDT_ABI, signer);
};

// BYTD
const getBYTDInstance = async (address: string, readOnly = false) => {
  if (readOnly) {
    const provider = await getDefaultProvider();
    return new ethers.Contract(address, BYTD_ABI, provider);
  }
  const signer = await getSigner();
  if (!signer) return;
  return new ethers.Contract(address, BYTD_ABI, signer);
};

// 发包方质押
export const stakeEmployer = async ({account, projectID, amount, lockDays, withdrawAddr}: any) => {
  // 授权
  let eth20Instance = await getUSDTInstance(USDT_B_ADDRESS)
  const eth20Approve = await eth20Instance.approve(
    BYTD_ADDRESS,
    amount,
  );
  if (!eth20Approve) {
    return false;
  }
  const bytdInstance = await getBYTDInstance(account)
  const result = await bytdInstance.stakeEmployer(projectID, amount, lockDays, withdrawAddr)
  if (result) {
    const receipt = await result.wait()
    return receipt?.status === 1 ? true : false
  }
  return false
}

// 接包方质押
export const stakeTasker = async ({account, projectID, amount, lockDays}: any) => {
  // 授权
  let eth20Instance = await getUSDTInstance(USDT_B_ADDRESS)
  const eth20Approve = await eth20Instance.approve(
    BYTD_ADDRESS,
    amount,
  );
  if (!eth20Approve) {
    return false;
  }
  const bytdInstance = await getBYTDInstance(account)
  const result = await bytdInstance.stakeTasker(projectID, amount, lockDays)
  if (result) {
    const receipt = await result.wait()
    return receipt?.status === 1 ? true : false
  }
  return false
}

// TODO _type 提款人的角色。发包方/接单方/运营商
export const withdraw = async({account, projectID, amountWithdraw, type}: any) => {
  const bytdInstance = await getBYTDInstance(account)
  const result = await bytdInstance.withdraw(projectID, amountWithdraw, type)
  if (result) {
    const receipt = await result.wait()
    return receipt?.status === 1 ? true : false
  }
  return false
}