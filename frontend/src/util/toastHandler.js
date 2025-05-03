import { toast } from "react-hot-toast";

export const toastHandler = async (
    promise,
    loadingMessage,
    successMessage,
    errorMessage
) => {
    const loadingToast = toast.loading(loadingMessage);
    try {
        const response = await promise;
        toast.success(successMessage);
        return response;
    } catch (error) {
        if (error.response && error.response.data)
            toast.error(error?.response?.data?.message || errorMessage);
        else if (error.message === 'Network Error')
            toast.error('Network issue detected. Please check your connection.');
        console.log("Error occurred :: ", error);
        return error.response;
    }
    finally
    {
        toast.dismiss(loadingToast);
    }
};
