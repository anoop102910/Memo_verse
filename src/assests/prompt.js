import { toast } from "react-toastify";

export const promptError = (error) => {
  toast.error(error, {
    pauseOnHover: false,
    progress: false,
    position: "bottom-center",
    hideProgressBar: true,
    autoClose: 1000,
  });
};

export const promptSuccess = (message) => {
  toast.error(message, {
    pauseOnHover: false,
    progress: false,
    position: "bottom-center",
    hideProgressBar: true,
    autoClose: 1000,
  });
};
