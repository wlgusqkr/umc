import { useMutation } from "@tanstack/react-query";

const useCustomMutation = () => {
    const mutation = useMutation({
        onMutate : () => {
            
        },
        mutationFn : () => {

        },
        onSuccess : () =>{ 

        },
        onError : () =>{  

        },
        onSettled : () => {

        }
    })
    return mutation
}


export default useCustomMutation;