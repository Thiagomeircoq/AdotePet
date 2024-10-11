import { ref } from 'vue';
import { PetService } from '@/api/petService';

export interface Pet {
    id: string;
    name: string;
    species: {
        id: string;
        name: string;
    };
    breed: {
        id: string;
        name: string;
    };
    size: string;
    color: string;
    gender: string;
}

export class PetManager {
    private petService: PetService;
    
    public pets = ref<Pet[]>([]);
    public loading = ref(true);
    public error = ref<string | null>(null);

    constructor() {
        this.petService = new PetService();
    }

    async getPetsByFilters(filters: Record<string, any>) {
        this.loading.value = true;
        this.error.value = null;
        try {
            const data = await this.petService.fetchPets(filters);
            this.pets.value = data;
        } catch (err) {
            this.error.value = 'Erro ao buscar pets.';
            throw err;
        } finally {
            this.loading.value = false;
        }
    }

    async getPetById(id: string) {
        if (!id || typeof id !== 'string') {
            throw new Error('ID inválido');
        }

        this.loading.value = true;
        this.error.value = null;
        try {
            const data = await this.petService.findById(id);
            return data;
        } catch (err) {
            this.error.value = 'Erro ao buscar pets.';
            throw err;
        } finally {
            this.loading.value = false;
        }
    }
}

export function usePet() {
    const manager = new PetManager();

    return {
        pets: manager.pets,
        loading: manager.loading,
        error: manager.error,
        getPetsByFilters: manager.getPetsByFilters.bind(manager),
        getPetById: manager.getPetById.bind(manager),
    };
}
