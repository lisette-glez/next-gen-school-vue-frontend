import type { LoginPayload, RegisterPayload, User } from "@/types";
const user = ref<User | null>(null);

export const useAuth = () => {
    const { $customFetch } = useNuxtApp()    
    async function getUser(): Promise<User | null> {
        if (user.value) return user.value;      
        try {
            const fetchedUser = await $customFetch<User>('/user');                    
            user.value = {
                ...fetchedUser,
                created_at: new Date(fetchedUser.created_at),
            };
            return user.value;
        } catch (err) {
            console.log("Error fetching user data", err)
            user.value = null;
            return null;
        }
    }
    
    async function initUser() {
        user.value = await getUser();
    }
    
    async function login(payload: LoginPayload) {
        try {
            await $customFetch("/login", {
                method: "POST",
                body: payload,
            });
            await initUser();
            useRouter().push("/dashboard");
        } catch (err) {
            console.error('Login failed:', err);
        }        
    }
    
    async function logout() {
        try {
            await $customFetch("/logout", {
                method: "POST",
            });
            user.value = null;
            useRouter().replace("/login");
        } catch (err) {
            console.error('Logout failed:', err);
        }
    }   
    
    async function register(payload: RegisterPayload) {
        try {
            await $customFetch('/register', {
                method: 'POST',
                body: payload,
            });
            await login({ email: payload.email, password: payload.password });
            useRouter().push("/profile");
        } catch (err) {
            console.error('Registration failed:', err);
        }
    }
    
    return {
        getUser,
        initUser,
        login,
        logout,
        register,
        user,
    };
}