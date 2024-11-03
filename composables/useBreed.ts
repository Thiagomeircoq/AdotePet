import { ref, onMounted } from "vue";
import { BreedService } from "@/api/breedService";

export interface Breed {
    id: string;
    name: string;
    species: {
        id: string;
        name: string;
    };
}

export function useBreed() {
    const breeds = ref<Breed[]>([]);
    const loading = ref(true);
    const error = ref<string | null>(null);

    const breedService = new BreedService();

    const fetchAllBreeds = async () => {
        loading.value = true;
        try {
            breeds.value = await breedService.getAllBreeds();
        } catch (err) {
            error.value = "Erro ao buscar as raças";
        } finally {
            loading.value = false;
        }
    };

    const fetchBreedsBySpecies = async (speciesIds: string[]) => {
        loading.value = true;
        try {
            return await breedService.fetchBreedsBySpecies(speciesIds);
        } catch (err) {
            error.value = "Erro ao buscar as raças pela espécie";
        } finally {
            loading.value = false;
        }
    };

    onMounted(() => {
        fetchAllBreeds();
    });

    return {
        breeds,
        loading,
        error,
        fetchBreedsBySpecies,
    };
}
