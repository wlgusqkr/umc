import { useQuery } from "@tanstack/react-query"
import axiosInstance from "../apis/axios-instance"

const useTodoQurey = ({params}) => {
    const { data, isLoading, isError } = useQuery({
        queryKey : ['list', params],
        queryFn : async (skrrr) => {
            console.log(skrrr)
            return await axiosInstance.get();
        }
        
    })
    return { data, isLoading, isError }
}

export default useTodoQurey;