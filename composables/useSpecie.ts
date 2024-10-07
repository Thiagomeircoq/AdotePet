import { ref, onMounted } from 'vue';
import { SpeciesService } from '@/api/specieService';

export interface Specie {
    id: string;
    name: string;
}

export class SpecieManager {
    private speciesService: SpeciesService;
    
    public species = ref<Specie[]>([]);
    public loading = ref(true);
    public error = ref<string | null>(null);

    constructor() {
        this.speciesService = new SpeciesService();
    }

    async getSpecies() {
        this.loading.value = true;
        try {
            const data = await this.speciesService.fetchSpecies();
            this.species.value = data;
        } catch (err) {
            if (err instanceof Error) {
                this.error.value = err.message;
            } else {
                this.error.value = String(err);
            }
        } finally {
            this.loading.value = false;
        }
    }
}

export function useSpecie() {
    const manager = new SpecieManager();

    onMounted(() => {
        manager.getSpecies();
    });

    return {
        species: manager.species,
        loading: manager.loading,
        error: manager.error
    };
}