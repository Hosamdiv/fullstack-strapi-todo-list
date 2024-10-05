import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axios.config";
import {  AxiosRequestConfig } from "axios";

interface IAuthenticatedQuery {
  queryKey: string[];
  url: string;
  config?: AxiosRequestConfig;
}
const useAuthenticatedQuery = ({
  queryKey,
  url,
  config,
}: IAuthenticatedQuery) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await axiosInstance.get(url, config);

      console.log({ data });

      return data;
    },
  });
};

export default useAuthenticatedQuery;
