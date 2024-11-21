import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../apis/axios-instance";

const useCustomFetch = (url) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState();
  const [isError, setIsError] = useState();

  const fetchData = useCallback(async (params) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await axiosInstance.get(url, params);
      console.log(response)
      setData(response);

    } catch (err) {
      console.log(err);
      setIsError(true);
    }
    setIsLoading(false);
  }, [url])

  useEffect(() => {
    fetchData();
  }, [fetchData])
  return { data, isLoading, isError, refetch : fetchData }
}

export default useCustomFetch;