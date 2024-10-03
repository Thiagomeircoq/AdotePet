import { ref, onMounted } from 'vue';
import { fetchSpecies } from '@/api/specieService';

interface Specie {
    id: string;
    name: string;
}

export function useSpecies() {
    const species = ref<Specie[]>([]);
    const loading = ref(true);
    const error = ref<string | null>(null);

    const getSpecies = async () => {
        loading.value = true;
        try {
            const data = await fetchSpecies();
            species.value = data;
        } catch (err) {
            if (err instanceof Error) {
                error.value = err.message;
            } else {
                error.value = String(err);
            }
        } finally {
            loading.value = false;
        }
    };

    onMounted(getSpecies);

    return { species, loading, error };
}
