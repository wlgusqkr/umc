import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../apis/axios-instance";

const useCustomQuery = (url, key) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [key],
    queryFn: async () => (await axiosInstance.get(url)),
    staleTime: 1000 * 10,
    placeholderData: keepPreviousData
  })
  return { data, isLoading, isError }
}

export default useCustomQuery;