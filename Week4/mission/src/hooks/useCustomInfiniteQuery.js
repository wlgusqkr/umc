import { useInfiniteQuery } from "@tanstack/react-query"
import { axiosInstance } from "../apis/axios-instance"

const useCustomInfiniteQuery = (url, key) => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: [key],
    queryFn: async ({ pageParam = 1 }) => {
      return (await axiosInstance.get(url, {
        params: {
          page: pageParam
        }
      }))
    },
    getNextPageParam: (lastPage, allPage) => {
      return lastPage.data.page + 1;
    },
    
    staleTime: 1000 * 10,
  })
  return { data, isLoading, isError, fetchNextPage, hasNextPage, isFetching }
}

export default useCustomInfiniteQuery