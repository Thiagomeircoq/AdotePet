import { defineStore } from "pinia";
import { AuthService } from "~/api/authService";

interface UserPayloadInterface {
    email: string;
    password: string;
}

interface UserRegistrationInterface {
    email: string;
    password: string;
    password_confirm: string;
    person: {
        first_name: string;
        last_name: string;
        cpf: string;
        birthdate: string;
        gender: string;
        about: string;
    }
}
export const useAuthStore = defineStore("auth", {
    state: () => ({
        authenticated: false,
        loading: false,
        error: ''
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
            } catch (error: any) {
                this.authenticated = false;
                this.error = error.response.data.message;
            } finally {
                this.loading = false;
            }
        },
        async registerUser(user: UserRegistrationInterface) {
            this.loading = true;
            
            try {
                const authService = new AuthService();
                const response = await authService.register(user);

                if (response) {
                    this.authenticated = true;
                }

            } catch (error: any) {
                this.authenticated = false;
                this.error = error.response.data.message;
            } finally {
                this.loading = false;
            }

        },
        logUserOut() {
            const token = useCookie("token");
            token.value = null;
            this.authenticated = false;
        },
        checkAuthentication() {
            const token = useCookie("token");
            this.authenticated = !!token.value;
        }
    },
});
