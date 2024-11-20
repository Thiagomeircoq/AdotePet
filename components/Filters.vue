<template>
    <aside class="w-3/12">
        <h1 class="font-bold text-2xl text-stone-800">Filtros</h1>
        <form class="p-3 flex flex-col gap-2" @submit.prevent="handleSubmit">
            <UFormGroup label="Nome ou ID (opcional)">
                <UInput placeholder="" v-model="name" />
            </UFormGroup>

            <UFormGroup class="flex flex-col" label="Espécie">
                <div v-if="speciesLoading">
                    <Loader />
                </div>
                <div v-else-if="speciesError">{{ speciesError }}</div>
                <div v-else class="flex flex-col gap-2 justify-center">
                    <div v-for="specie in species" :key="specie.id" class="flex items-center space-x-2">
                        <UToggle size="lg" color="primary" v-model="selectedSpecies[specie.id]" :name="specie.name" />
                        <span>{{ specie.name }}</span>
                    </div>
                </div>
            </UFormGroup>

            <UFormGroup class="flex flex-col" label="Gênero">
                <div class="flex flex-col gap-2 justify-center">
                    <div v-for="g in gender" :key="g.value" class="flex items-center space-x-2">
                        <UToggle size="lg" color="primary" v-model="selectedGender[g.value]" />
                        <span>{{ g.label }}</span>
                    </div>
                </div>
            </UFormGroup>

            <UFormGroup class="flex flex-col" label="Porte">
                <USelectMenu v-model="selectedSizes" :options="sizes" multiple option-value="value"
                    placeholder="Selecione o tamanho" />
            </UFormGroup>

            <UFormGroup class="flex flex-col" label="Cor">
                <USelectMenu v-model="selectedColors" :options="colors" option-value="value" option-label="label"
                    multiple placeholder="Selecione a cor" />
            </UFormGroup>

            <UFormGroup class="flex flex-col" label="Raça">
                <USelectMenu v-model="selectedBreeds" :options="breeds" multiple placeholder="Selecione a raça" />
            </UFormGroup>

            <UButton type="submit" class="flex items-center justify-center w-max mt-4" size="lg" color="amber"
                variant="solid" label="Aplicar Filtros" trailing />
        </form>
    </aside>
</template>

<script setup lang="ts">
import { useBreed, type Breed } from '@/composables/useBreed';
import { useSpecie, type Specie } from '@/composables/useSpecie';
import { usePet } from '@/composables/usePet';
import { ref, watch, computed } from 'vue';
import { useConstants } from '@/composables/useConstants';
const { sizes, colors, gender } = useConstants();

const breeds = ref<{ value: string; label: string }[]>([]);

const name = ref('');
const selectedSpecies = ref<{ [key: string]: boolean }>({});
const selectedBreeds = ref<string[]>([]);
const selectedSizes = ref<string[]>([]);
const selectedColors = ref<string[]>([]);
const selectedGender = ref<{ [key: string]: boolean }>({});

const { species, loading: speciesLoading, error: speciesError } = useSpecie();
const { fetchBreedsBySpecies } = useBreed();
const { pets, loading, error, getPetsByFilters } = usePet();

watch(
    selectedSpecies,
    async (newSelectedSpecies) => {
        const selectedSpeciesIds = Object.keys(newSelectedSpecies).filter(id => newSelectedSpecies[id]);
        if (selectedSpeciesIds.length > 0) {
            const breedsData = await fetchBreedsBySpecies(selectedSpeciesIds);

            breeds.value = breedsData.map(breed => ({
                value: breed.id,
                label: breed.name
            }));
        } else {
            breeds.value = [];
            selectedBreeds.value = [];
        }
    },
    { deep: true }
);

const emit = defineEmits(['filteredPets']);

const handleSubmit = async () => {
    const selectedFilters = {
        name: name.value,
        species: Object.keys(selectedSpecies.value).filter(id => selectedSpecies.value[id]),
        breeds: selectedBreeds.value.map(breed => breed.value),
        sizes: selectedSizes.value.map(size => size.value),
        colors: selectedColors.value.map(color => color.value),
        gender: Object.keys(selectedGender.value).filter(key => selectedGender.value[key])
    };

    console.log(selectedFilters)

    await getPetsByFilters(selectedFilters);

    emit('filteredPets', pets.value);
}
</script>
