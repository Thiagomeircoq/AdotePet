import { defineStore } from "pinia";
import { AuthService } from "~/api/authService";

interface UserPayloadInterface {
    email: string;
    password: string;
}

export const useAuthStore = defineStore("auth", {
    state: () => ({
        authenticated: false,
        loading: false,
    }),
    actions: {
        async authenticateUser({ email, password }: UserPayloadInterface) {
            this.loading = true;

            try {
                const authService = new AuthService();
                const response = await authService.login({ email, password });

                if (response) {
                    this.authenticated = true;
                }
            } catch (error) {
                this.authenticated = false;
            } finally {
                this.loading = false;
            }
        },
        logUserOut() {
            const token = useCookie("token");
            token.value = null;
            this.authenticated = false;
        },
    },
});
