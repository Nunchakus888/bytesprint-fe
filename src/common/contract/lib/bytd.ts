import { BigNumber, ethers, getDefaultProvider } from 'ethers';
import USDT_ABI from '../ABI/udst_b.abi.json';
import getSigner from './getSigner';
import BYTD_ABI from '../ABI/stake.abi.json';
import { onErrorToast } from 'common/utils/toast';

// 质押合约
const BYTD_ADDRESS = '0xb19C40e44B6a56Ef0C98F248B6AC31aE948CbaFf';
const USDT_B_ADDRESS = '0xD8d76d720b0250207fDa709ad59aBa164099d323';

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

export const getNextTaskId = async () => {
  try {
    const bytdInstance = await getBYTDInstance(BYTD_ADDRESS);
    const projectId = await bytdInstance.getNextTaskId();
    console.log('BigNumber.from(projectId).toNumber()', BigNumber.from(projectId).toNumber());
    return BigNumber.from(projectId).toNumber();
  } catch (e: any) {
    onErrorToast(getErrorMessage(e.message) || 'Operation error');
    console.log(e);
  }
  return false;
};

// 发布任务
export const publishTask = async ({ account, projectId }: any) => {
  try {
    const bytdInstance = await getBYTDInstance(BYTD_ADDRESS);
    console.log('bytdInstance>>>>', bytdInstance);
    const result = await bytdInstance.publishTask(String(projectId));
    if (result) {
      console.log('result>>>>', result);
      const receipt = await result.wait();
      return receipt?.status === 1 ? true : false;
    }
    return false;
  } catch (e) {
    onErrorToast('Publishing task failed');
    console.log(e);
  }
  return false;
};

// 评估质押 接包方质押
export const evaluateTask = async ({ account, projectId, amount }: any) => {
  try {
    // 授权
    let eth20Instance = await getUSDTInstance(USDT_B_ADDRESS);
    const eth20Approve = await eth20Instance.approve(BYTD_ADDRESS, amount);
    if (!eth20Approve) {
      return false;
    }
    const bytdInstance = await getBYTDInstance(BYTD_ADDRESS);
    const result = await bytdInstance.evaluateTask(String(projectId), amount);
    console.log('result>>>', result);
    if (result) {
      const receipt = await result.wait();
      console.log('rees>>>', receipt?.status);
      return receipt?.status === 1 ? true : false;
    }
    return false;
  } catch (e: any) {
    onErrorToast(getErrorMessage(e.message) || 'Pledge failed');
    console.log(e);
  }
  return false;
};

// 签约任务
export const signTask = async ({ account, projectId, taskerAddress, totalCost }: any) => {
  try {
    // 授权
    let eth20Instance = await getUSDTInstance(USDT_B_ADDRESS);
    const eth20Approve = await eth20Instance.approve(BYTD_ADDRESS, totalCost);
    if (!eth20Approve) {
      return false;
    }
    const bytdInstance = await getBYTDInstance(BYTD_ADDRESS);
    console.log('bytdInstance>>>>', bytdInstance);

    const result = await bytdInstance.signTask(String(projectId), taskerAddress);
    if (result) {
      console.log('result>>>>', result);
      const receipt = await result.wait();
      return receipt?.status === 1 ? true : false;
    }
    return false;
  } catch (e: any) {
    onErrorToast(getErrorMessage(e.message) || 'Signing task failed');
    console.log(e);
  }
  return false;
};

// 开始任务
export const startTask = async ({ projectId }: any) => {
  try {
    const bytdInstance = await getBYTDInstance(BYTD_ADDRESS);
    console.log('bytdInstance>>>>', bytdInstance);
    const result = await bytdInstance.startTask(String(projectId));
    if (result) {
      console.log('result>>>>', result);
      const receipt = await result.wait();
      return receipt?.status === 1 ? true : false;
    }
    return false;
  } catch (e: any) {
    onErrorToast(getErrorMessage(e.message) || 'Failed to start task');
    console.log(e);
  }
  return false;
};

// 提交任务
export const submitTask = async ({ projectId }: any) => {
  try {
    const bytdInstance = await getBYTDInstance(BYTD_ADDRESS);
    console.log('bytdInstance>>>>', bytdInstance);
    const result = await bytdInstance.submitTask(String(projectId));
    if (result) {
      console.log('result>>>>', result);
      const receipt = await result.wait();
      return receipt?.status === 1 ? true : false;
    }
    return false;
  } catch (e: any) {
    onErrorToast(getErrorMessage(e.message) || 'Failed to submit task');
    console.log(e);
  }
  return false;
};

// 验收任务
export const acceptTask = async ({ projectId }: any) => {
  try {
    const bytdInstance = await getBYTDInstance(BYTD_ADDRESS);
    console.log('bytdInstance>>>>', bytdInstance);
    const result = await bytdInstance.acceptTask(String(projectId));
    if (result) {
      console.log('result>>>>', result);
      const receipt = await result.wait();
      return receipt?.status === 1 ? true : false;
    }
    return false;
  } catch (e: any) {
    onErrorToast(getErrorMessage(e.message) || 'Acceptance task failed');
    console.log(e);
  }
  return false;
};

// 关闭任务
export const closeTask = async ({ projectId }: any) => {
  try {
    const bytdInstance = await getBYTDInstance(BYTD_ADDRESS);
    console.log('bytdInstance>>>>', bytdInstance);
    const result = await bytdInstance.closeTask(String(projectId));
    if (result) {
      console.log('result>>>>', result);
      const receipt = await result.wait();
      return receipt?.status === 1 ? true : false;
    }
    return false;
  } catch (e: any) {
    onErrorToast(getErrorMessage(e.message) || 'Failed to close task');
    console.log(e.message);
  }
  return false;
};

// 提取质押金，只有tasker才能提取质押金。
export const withdrawStakedToken = async ({ account, projectId }: any) => {
  try {
    const bytdInstance = await getBYTDInstance(BYTD_ADDRESS);
    const result = await bytdInstance.withdrawStakedToken(String(projectId));
    if (result) {
      const receipt = await result.wait();
      return receipt?.status === 1 ? true : false;
    }
    return false;
  } catch (e: any) {
    onErrorToast(getErrorMessage(e.message) || 'Failed to withdraw pledged funds');
    console.log(e);
  }
  return false;
};

// 提取奖励，只有tasker才能提取奖励。
export const withdrawReward = async ({ account, projectId }: any) => {
  try {
    const bytdInstance = await getBYTDInstance(BYTD_ADDRESS);
    const result = await bytdInstance.withdrawReward(String(projectId));
    if (result) {
      const receipt = await result.wait();
      return receipt?.status === 1 ? true : false;
    }
    return false;
  } catch (e: any) {
    onErrorToast(getErrorMessage(e.message) || 'Failed to withdraw reward funds');
    console.log(e);
  }
  return false;
};

function getErrorMessage(message: string) {
  let error = '';
  const d = `${message}`.match(/\"message\"\:(.*)"/);
  console.log(d);
  if (d) {
    // @ts-ignore
    return d[1].split(',')[0];
  }
  return null;
}
