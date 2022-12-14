import axios, { AxiosRequestConfig } from "axios";
import { toast } from "react-hot-toast";
import { IData } from "types/data";

const resolveTxn = async (url: string): Promise<IData> => {
  if (!url.startsWith("solana:")) {
    toast.error("Invalid URL");
    return;
  }

  const REQ_URL = decodeURIComponent(url.substring(7));

  const options: AxiosRequestConfig = {
    method: "POST",
    url: REQ_URL,
    data: {
      account: "FqYAWuqRb8QxwBgvhbuRPtou4zhWtg361axogVUeP222",
    },
  };

  const { data } = await axios(options);

  return data;
};

export { resolveTxn };
