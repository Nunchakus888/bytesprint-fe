import { BigNumber, ethers, getDefaultProvider } from 'ethers';
import USDT_ABI from '../ABI/udst_b.abi.json';
import getSigner from './getSigner';
import BYTD_ABI from '../ABI/stake.abi.json';

// 质押合约
const BYTD_ADDRESS = '0x6123593d91c834a30634E3FD2A75d1A79dd4CB48';
const USDT_B_ADDRESS = '0xf6F9C2BB380b85b03aaE7f48547D9F0C07E3D388';

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

// 发布任务
export const publishTask = async ({ account, projectId }: any) => {
  const bytdInstance = await getBYTDInstance(BYTD_ADDRESS);
  console.log('bytdInstance>>>>', bytdInstance);
  const result = await bytdInstance.publishTask(projectId);
  if (result) {
    console.log('result>>>>', result);
    const receipt = await result.wait();
    return receipt?.status === 1 ? true : false;
  }
  return false;
};

// 评估质押 接包方质押
export const evaluateTask = async ({ account, projectId, amount }: any) => {
  // 授权
  let eth20Instance = await getUSDTInstance(USDT_B_ADDRESS);
  const eth20Approve = await eth20Instance.approve(BYTD_ADDRESS, amount);
  if (!eth20Approve) {
    return false;
  }
  const bytdInstance = await getBYTDInstance(BYTD_ADDRESS);
  const result = await bytdInstance.evaluateTask(projectId, amount);
  console.log('result>>>', result);
  if (result) {
    const receipt = await result.wait();
    console.log('rees>>>', receipt?.status);
    return receipt?.status === 1 ? true : false;
  }
  return false;
};

// 发包方质押
// export const stakeEmployer = async ({
//   account,
//   projectId,
//   amount,
//   lockDays,
//   withdrawAddr,
// }: any) => {
//   amount = String(BigNumber.from(amount));
//   // 授权
//   let eth20Instance = await getUSDTInstance(USDT_B_ADDRESS);
//   console.log('eth20Instance>>>', eth20Instance, BYTD_ADDRESS, String(BigNumber.from(amount)));
//   const eth20Approve = await eth20Instance.approve(BYTD_ADDRESS, amount);
//   console.log('eth20Approve>>>>', eth20Approve);
//   if (!eth20Approve) {
//     return false;
//   }
//   const bytdInstance = await getBYTDInstance(BYTD_ADDRESS);
//   console.log('bytdInstance>>>>', bytdInstance);
//   const result = await bytdInstance.stakeEmployer(projectId, amount, lockDays, withdrawAddr);
//   if (result) {
//     console.log('result>>>>', result);
//     const receipt = await result.wait();
//     return receipt?.status === 1 ? true : false;
//   }
//   return false;
// };

// 签约任务
export const signTask = async ({ account, projectId, taskerAddress, totalCost }: any) => {
  // 授权
  let eth20Instance = await getUSDTInstance(USDT_B_ADDRESS);
  const eth20Approve = await eth20Instance.approve(BYTD_ADDRESS, totalCost);
  if (!eth20Approve) {
    return false;
  }
  const bytdInstance = await getBYTDInstance(BYTD_ADDRESS);
  console.log('bytdInstance>>>>', bytdInstance);
  const result = await bytdInstance.signTask(projectId, taskerAddress);
  if (result) {
    console.log('result>>>>', result);
    const receipt = await result.wait();
    return receipt?.status === 1 ? true : false;
  }
  return false;
};

// 开始任务
export const startTask = async ({ projectId }: any) => {
  const bytdInstance = await getBYTDInstance(BYTD_ADDRESS);
  console.log('bytdInstance>>>>', bytdInstance);
  const result = await bytdInstance.startTask(projectId);
  if (result) {
    console.log('result>>>>', result);
    const receipt = await result.wait();
    return receipt?.status === 1 ? true : false;
  }
  return false;
};

// 提交任务
export const submitTask = async ({ projectId }: any) => {
  const bytdInstance = await getBYTDInstance(BYTD_ADDRESS);
  console.log('bytdInstance>>>>', bytdInstance);
  const result = await bytdInstance.submitTask(projectId);
  if (result) {
    console.log('result>>>>', result);
    const receipt = await result.wait();
    return receipt?.status === 1 ? true : false;
  }
  return false;
};

// 验收任务
export const acceptTask = async ({ projectId }: any) => {
  const bytdInstance = await getBYTDInstance(BYTD_ADDRESS);
  console.log('bytdInstance>>>>', bytdInstance);
  const result = await bytdInstance.acceptTask(projectId);
  if (result) {
    console.log('result>>>>', result);
    const receipt = await result.wait();
    return receipt?.status === 1 ? true : false;
  }
  return false;
};

// 关闭任务
export const closeTask = async ({ projectId }: any) => {
  const bytdInstance = await getBYTDInstance(BYTD_ADDRESS);
  console.log('bytdInstance>>>>', bytdInstance);
  const result = await bytdInstance.closeTask(projectId);
  if (result) {
    console.log('result>>>>', result);
    const receipt = await result.wait();
    return receipt?.status === 1 ? true : false;
  }
  return false;
};

// 提取质押金，只有tasker才能提取质押金。
export const withdrawStakedToken = async ({ account, projectId }: any) => {
  const bytdInstance = await getBYTDInstance(BYTD_ADDRESS);
  const result = await bytdInstance.withdrawStakedToken(projectId);
  if (result) {
    const receipt = await result.wait();
    return receipt?.status === 1 ? true : false;
  }
  return false;
};

// 提取奖励，只有tasker才能提取奖励。
export const withdrawReward = async ({ account, projectId }: any) => {
  const bytdInstance = await getBYTDInstance(BYTD_ADDRESS);
  const result = await bytdInstance.withdrawReward(projectId);
  if (result) {
    const receipt = await result.wait();
    return receipt?.status === 1 ? true : false;
  }
  return false;
};

// _type 提款人的角色。发包方/接单方/运营商
// export const withdraw = async ({ account, projectId, amountWithdraw, type }: any) => {
//   const bytdInstance = await getBYTDInstance(BYTD_ADDRESS);
//   const result = await bytdInstance.withdraw(projectId, amountWithdraw, type);
//   if (result) {
//     const receipt = await result.wait();
//     return receipt?.status === 1 ? true : false;
//   }
//   return false;
// };
