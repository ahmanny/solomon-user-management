import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../axios.instance";
import { User } from "@/types/user.types";
import { useUserStore } from "@/store/user.store";



// sign up hook 
export const useCreateUser = () => {
    const queryClient = useQueryClient();
    const { resetUser } = useUserStore();

    return useMutation({
        mutationFn: async (credential: FormData) => {
            const res = await API.post("/user/signup", credential, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res.data;
        },
        // on success refresh tanstack query cache and reset user store
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            resetUser();
        },
        onError: (error) => {
            console.log("Sign up failed:", error);
        },
    });
};


// update user hook
export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    // reset user store after api calls
    const { resetUser } = useUserStore()
    return useMutation({
        mutationFn: async ({ id, user }: { id: string; user: User }) => {
            const res = await API.patch(`/user/update/${id}`, user);
            return res.data;
        },
        // on success refresh tanstack query cache and reset user store
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            resetUser()
        },
        onError: (error) => {
            console.log("update failed:", error);
        }
    })
}


// delete user hook
export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    // reset user store after api calls
    const { resetUser } = useUserStore()
    return useMutation({
        mutationFn: async (id: string) => {
            const res = await API.delete(`/user/delete/${id}`);
        },
        // on success refresh tanstack query cache and reset user store
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            resetUser()
        },
        onError: (error) => {
            console.log("sign up failed:", error);
        }
    })
}