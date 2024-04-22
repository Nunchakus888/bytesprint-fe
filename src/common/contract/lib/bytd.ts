import { ethers, getDefaultProvider } from 'ethers';
import USDT_ABI from '../ABI/udst_b.abi.json';
import getSigner from './getSigner';
import BYTD_ABI from '../ABI/stake.abi.json';
import { onErrorToast } from 'common/utils/toast';
import BN from 'bignumber.js';

// 质押合约
const BYTD_ADDRESS = '0xb19C40e44B6a56Ef0C98F248B6AC31aE948CbaFf';
const USDT_B_ADDRESS = '0xD8d76d720b0250207fDa709ad59aBa164099d323';

const str = `Error: cannot estimate gas; transaction may fail or may require manual gas limit [ See: https://links.ethers.org/v5-errors-UNPREDICTABLE_GAS_LIMIT ] (reason="execution reverted: task status should be signed", method="estimateGas", transaction={"from":"0x25CE7C385300576d94f2620b7AB7B449be7cF4D9","to":"0xb19C40e44B6a56Ef0C98F248B6AC31aE948CbaFf","data":"0x5f944326000000000000000000000000000000000000000000000000000000000000000e","accessList":null}, error={"code":-32603,"message":"execution reverted: task status should be signed","data":{"originalError":{"code":3,"data":"0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001c7461736b207374617475732073686f756c64206265207369676e656400000000","message":"execution reverted: task status should be signed"}}}, code=UNPREDICTABLE_GAS_LIMIT, version=providers/5.7.2)
at Logger.makeError (index.js:231:23)
at Logger.throwError (index.js:240:20)
at checkError (json-rpc-provider.js:92:20)
at Web3Provider.eval (json-rpc-provider.js:591:24)
at Generator.throw (<anonymous>)
at rejected (json-rpc-provider.js:22:65)`;

// const errorInfo =
//   '0xba2d6ef800000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000008696e7075743d3d32000000000000000000000000000000000000000000000000';
// function decodeErrorData(data: any, abi: any) {
//   const iface = new ethers.utils.Interface(abi);
//   debugger;
//   const decoded = iface.decodeErrorResult('NoPermission', data);
//   console.log('Decoded Data:', decoded);
//   return decoded;
// }

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
    return String(projectId);
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
    return false;
  }
};

// 评估质押 接包方质押
export const evaluateTask = async ({ account, projectId, amount }: any) => {
  try {
    // 授权
    let eth20Instance = await getUSDTInstance(USDT_B_ADDRESS);
    const approve_ammounts = new BN(amount / 10).times(Math.pow(10, 18)).toFixed(0);
    const evaluate_ammounts = new BN(amount).times(Math.pow(10, 18)).toFixed(0);
    console.log('eva>>>', approve_ammounts, evaluate_ammounts);
    const eth20Approve = await eth20Instance.approve(BYTD_ADDRESS, approve_ammounts);
    let approveRes = true;
    if (eth20Approve) {
      const receipt = await eth20Approve.wait();
      approveRes = receipt?.status === 1;
    }
    if (!approveRes) {
      return false;
    }
    const bytdInstance = await getBYTDInstance(BYTD_ADDRESS);
    const result = await bytdInstance.evaluateTask(String(projectId), evaluate_ammounts);
    console.log('result>>>', result);
    if (result) {
      const receipt = await result.wait();
      console.log('rees>>>', receipt?.status);
      return receipt?.status === 1 ? true : false;
    }
    return false;
  } catch (e: any) {
    console.log(e.message);
    // 检测是否已经存在，若存在，继续流程
    try {
      const iface = new ethers.utils.Interface(BYTD_ABI);
      const data = getCustomCodeError(e.message);
      const decoded = iface.decodeErrorResult('TaskerAlreadyExists', data);
      console.log(decoded);
      return true;
    } catch (err) {
      console.log('err>>>', err);
      onErrorToast(getErrorMessage(e.message) || 'Pledge failed');
      console.log(e.message);
      return false;
    }
  }
};

// 签约任务
export const signTask = async ({ account, projectId, taskerAddress, totalCost }: any) => {
  try {
    // 授权
    let eth20Instance = await getUSDTInstance(USDT_B_ADDRESS);
    const approve_ammounts = new BN(totalCost).times(Math.pow(10, 18)).toFixed(0);
    const eth20Approve = await eth20Instance.approve(BYTD_ADDRESS, approve_ammounts);
    let approveRes = true;
    if (eth20Approve) {
      const receipt = await eth20Approve.wait();
      approveRes = receipt?.status === 1;
    }
    if (!approveRes) {
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
    return false;
  }
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
    console.log(e.message);
    debugger;
    // 检测是否已经存在，若存在，继续流程
    try {
      const iface = new ethers.utils.Interface(BYTD_ABI);
      const data = getCustomCodeError(e.message);
      debugger;
      const decoded = iface.decodeErrorResult('TaskAlreadyInProgress', data);
      console.log(decoded);
      return true;
    } catch (err) {
      onErrorToast(getErrorMessage(e.message) || 'Failed to start task');
      console.log(err);
      return false;
    }
  }
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
    return false;
  }
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
    return false;
  }
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
    return false;
  }
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
    return false;
  }
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
    return false;
  }
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

// evaluteTask Error
/*
Error: cannot estimate gas; transaction may fail or may require manual gas limit [ See: https://links.ethers.org/v5-errors-UNPREDICTABLE_GAS_LIMIT ] (reason="execution reverted", method="estimateGas", transaction={"from":"0x25CE7C385300576d94f2620b7AB7B449be7cF4D9","to":"0xb19C40e44B6a56Ef0C98F248B6AC31aE948CbaFf","data":"0xe630911d00000000000000000000000000000000000000000000000000000000000000190000000000000000000000000000000000000000000000000000000000000000","accessList":null}, error={"code":-32603,"message":"execution reverted","data":{"originalError":{"code":3,"data":"0x6236b1d100000000000000000000000025ce7c385300576d94f2620b7ab7b449be7cf4d90000000000000000000000000000000000000000000000000000000000000019","message":"execution reverted"}}}, code=UNPREDICTABLE_GAS_LIMIT, version=providers/5.7.2)
at Logger.makeError (index.js:231:23)
at Logger.throwError (index.js:240:20)
at checkError (json-rpc-provider.js:92:20)
at Web3Provider.eval (json-rpc-provider.js:591:24)
at Generator.throw (<anonymous>)
at rejected (json-rpc-provider.js:22:65)
*/
// 自定义错误
function getCustomCodeError(message: string) {
  let error = '';
  const d = `${message}`.match(/\"code\"\:3,\"data\"\:(.*)"/);
  console.log(d);
  if (d) {
    // @ts-ignore
    return d[1].split(',')[0]?.replaceAll('"', '');
  }
  return null;
}

// function getTransactionErrorMessage(message: string) {
//   // const d = `${message}`.match(/\"transaction=\"(.*)"/);
//   const start = message.indexOf('transaction=');
//   const end = message.indexOf('}');
//   debugger;
//   console.log(start + 12, end);
//   const err = message.slice(start + 12, end + 1);
//   console.log(err);
//   debugger;
//   if (err) {
//     // @ts-ignore
//     return JSON.parse(err).data;
//   }
//   return null;
// }
