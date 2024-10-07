import { ref, onMounted } from 'vue';
import { BreedService } from '@/api/breedService';
import { SpeciesService } from '@/api/specieService';

export interface Breed {
    id: string;
    name: string;
    species: {
        id: string;
        name: string;
    };
}

export class BreedManager {
    private breedService: BreedService;
    private speciesService: SpeciesService;

    public species = ref<Breed[]>([]);
    public loading = ref(true);
    public error = ref<string | null>(null);

    constructor() {
        this.breedService = new BreedService();
        this.speciesService = new SpeciesService();
    }

    async getBreedsBySpecies(speciesIds: string[]) {
        try {
            return await this.breedService.fetchBreedsBySpecies(speciesIds);
        } catch (err) {
            throw err;
        }
    }
}

export function useBreed() {
    const manager = new BreedManager();

    return {
        loading: manager.loading,
        error: manager.error,
        getBreedsBySpecies: manager.getBreedsBySpecies.bind(manager)
    };
}
