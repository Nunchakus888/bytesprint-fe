import { toast, ToastOptions } from 'react-toastify';
import { MdHighlightOff, MdOutlineCheckCircleOutline, MdWarningAmber } from 'react-icons/md';

const toastConfig: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
  className: 'toast-message',
};

export const onErrorToast = (text: any) => {
  return toast.error(text, {
    ...toastConfig,
    icon: <MdHighlightOff color="#FF375F" fontSize={22} />,
  });
};

export const onSuccessToast = (text: any) => {
  return toast.success(text, {
    ...toastConfig,
    icon: <MdOutlineCheckCircleOutline color="#30D158" fontSize={22} />,
  });
};

export const onWarmToast = (text: any) => {
  return toast.warning(text, {
    ...toastConfig,
    icon: <MdWarningAmber color="#f1c40f" fontSize={22} />,
  });
};
