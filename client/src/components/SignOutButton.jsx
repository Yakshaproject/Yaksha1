import { useMutation, useQueryClient } from "react-query"
import * as apiClient from '../apiClient.js'
import { useAppContext } from "../context/AppContext.jsx"; 
const SignOutButton = () => {
    const queryClient = useQueryClient();

    const {showToast} = useAppContext();

    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken")
        },
        onError: (err )=> {
        }
    })

    const handleClick = () => {
        mutation.mutate();
    }
    return (
        <button className="text-blue-600 px-3 
            font-bold
            bg-white hover:bg-gray-100"
            onClick={handleClick}
        >
            Sign Out
        </button>
    )
}

export default SignOutButton;
