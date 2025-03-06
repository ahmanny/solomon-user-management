import { useQuery } from "@tanstack/react-query";
import API from "../axios.instance";
import { User } from "@/types/user.types";



// fetch all users
export const useGetAllUsers = () =>
    useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await API.get<User[]>("/user/users");
            return res.data
        }
    })


// fetch a single user by ID
export const useGetUser = (id: string) =>
    useQuery({
        queryKey: ['user', id],
        queryFn: async () => {
            const res = await API.get<User>(`/user/get/${id}`)
            return res
        },
        // only run if id exists
        enabled: !!id
    })