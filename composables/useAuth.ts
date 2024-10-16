import { ref } from 'vue';
import { AuthService } from '@/api/authService';

export interface User {
    email: string;
    first_name: string;
    last_name: string;
    status: string;
    person: {
        gender: string;
        birthdate: string;
        profile_picture: string;
    };
}

export class AuthManager {
    private authService: AuthService;

    public user = ref<User | null>(null);
    public loading = ref(false);
    public error = ref<string | null>(null);

    constructor() {
        this.authService = new AuthService();
    }

    async register(userData: object) {
        this.loading.value = true;
        this.error.value = null;

        try {
            const response = await this.authService.register(userData);
            this.user.value = response.user;
        } catch (err) {
            this.error.value = 'Erro ao registrar o usuário';
            console.error(err);
        } finally {
            this.loading.value = false;
        }
    }

    // async login(credentials: { email: string; password: string }) {
    //     this.loading.value = true;
    //     this.error.value = null;

    //     try {
    //         const response = await this.authService.login(credentials);
    //         this.user.value = response.user;
    //     } catch (err) {
    //         this.error.value = 'Erro ao fazer login';
    //         console.error(err);
    //     } finally {
    //         this.loading.value = false;
    //     }
    // }

    logout() {
        this.user.value = null;
    }
}

export function useAuth() {
    const manager = new AuthManager();

    return {
        user: manager.user,
        loading: manager.loading,
        error: manager.error,
        register: manager.register.bind(manager),
        // login: manager.login.bind(manager),
        logout: manager.logout.bind(manager)
    };
}
