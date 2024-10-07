<template>
    <div class="bg-cover bg-center h-screen bg-stone-100">
        <div class="container max-w-7xl mx-auto flex flex-col">
            <AppHeader />
            <section v-if="!isLoading" class="flex space-x-5 mt-5">
                <aside class="w-3/12">
                    <h1 class="font-bold text-2xl text-stone-800">Filtros</h1>
                    <form class="p-3 flex flex-col gap-2" @submit.prevent="handleSubmit">
                        <UFormGroup label="Nome ou ID (opcional)">
                            <UInput placeholder="" v-model="name" />
                        </UFormGroup>

                        <UFormGroup class="flex flex-col" label="Espécie">
                            <div v-if="speciesLoading">Carregando...</div>
                            <div v-else-if="speciesError">{{ speciesError }}</div>
                            <div v-else class="flex flex-col gap-2 justify-center">
                                <div v-for="specie in species" :key="specie.id" class="flex items-center space-x-2">
                                    <UToggle size="lg" color="primary" v-model="selectedSpecies[specie.id]"
                                        :name="specie.name" />
                                    <span>{{ specie.name }}</span>
                                </div>
                            </div>
                        </UFormGroup>

                        <UFormGroup class="flex flex-col" label="Gênero">
                            <div class="flex flex-col gap-2 justify-center">
                                <div v-for="g in gender" :key="g.value" class="flex items-center space-x-2">
                                    <UToggle size="lg" color="primary" v-model="selectedGender[g.value]"/>
                                    <span>{{ g.label }}</span>
                                </div>
                            </div>
                        </UFormGroup>

                        <UFormGroup class="flex flex-col" label="Porte">
                            <USelectMenu v-model="selectedSizes" :options="sizes" multiple option-value="value"
                                placeholder="Selecione o tamanho" />
                        </UFormGroup>

                        <UFormGroup class="flex flex-col" label="Cor">
                            <USelectMenu v-model="selectedColors" :options="colors" option-value="value"
                                option-label="label" multiple placeholder="Selecione a cor" />
                        </UFormGroup>

                        <UFormGroup class="flex flex-col" label="Raça">
                            <USelectMenu v-model="selectedBreeds" :options="breeds" multiple
                                placeholder="Selecione a raça" />
                        </UFormGroup>

                        <UButton type="submit" class="flex items-center justify-center w-max mt-4" size="lg"
                            color="amber" variant="solid" label="Aplicar Filtros" trailing />
                    </form>
                </aside>
                <UDivider orientation="vertical" />
                <main class="relative flex flex-col gap-5 w-full">
                    <div class="">
                        <h1 class="font-bold text-2xl text-stone-800">Pets para adoção</h1>
                    </div>
                    <div class="flex flex-col mt-20 items-center gap-5">
                        <DogWaiting />
                        <div class="w-1/2 text-center">
                            <p class="text-stone-600">
                                Nenhum pet foi encontrado próximo a este endereço. Altere os filtros ou o endereço para
                                descobrir mais pets para adoção.
                            </p>
                        </div>
                    </div>
                </main>
            </section>
            <section v-else class="flex items-center justify-center h-screen">
                <div class="loader">Carregando...</div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useBreed, type Breed } from '@/composables/useBreed';
import { useSpecie, type Specie } from '@/composables/useSpecie';
import { usePet } from '@/composables/usePet';
import { ref, watch, computed } from 'vue';

const sizes = [
    { value: 'FILHOTE', label: 'Filhote' },
    { value: 'PEQUENO', label: 'Pequeno' },
    { value: 'MÉDIO', label: 'Médio' },
    { value: 'GRANDE', label: 'Grande' }
];

const colors = [
    { value: 'BRANCO', label: 'Branco' },
    { value: 'PRETO', label: 'Preto' },
    { value: 'MARROM', label: 'Marrom' },
    { value: 'CINZA', label: 'Cinza' },
    { value: 'DOURADO', label: 'Dourado' },
    { value: 'BEGE', label: 'Bege' },
    { value: 'AMARELO', label: 'Amarelo' },
    { value: 'AZUL', label: 'Azul' },
    { value: 'VERMELHO', label: 'Vermelho' },
    { value: 'VERDE', label: 'Verde' }
];

const gender = [
    { value: 'M', label: 'Macho' },
    { value: 'F', label: 'Fêmea' },
];

const breeds = ref<{ value: string; label: string }[]>([]);
const name = ref('');

const { loading: breedsLoading, error: breedsError, getBreedsBySpecies } = useBreed();
const { species, loading: speciesLoading, error: speciesError } = useSpecie();
const { pets, loading, error, getPetsByFilters } = usePet();

const selectedSpecies = ref<{ [key: string]: boolean }>({});
const selectedBreeds = ref<string[]>([]);
const selectedSizes = ref<string[]>([]);
const selectedColors = ref<string[]>([]);
const selectedGender = ref<{ [key: string]: boolean }>({});

const isLoading = computed(() => speciesLoading.value);

watch(
    selectedSpecies,
    async (newSelectedSpecies) => {
        const selectedSpeciesIds = Object.keys(newSelectedSpecies).filter(id => newSelectedSpecies[id]);
        if (selectedSpeciesIds.length > 0) {
            const breedsData = await getBreedsBySpecies(selectedSpeciesIds);

            breeds.value = breedsData.map((breed: Breed) => ({
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

watch(species, (newSpecies) => {
    newSpecies.forEach(specie => {
        selectedSpecies.value[specie.id] = false;
    });
});

const handleSubmit = async () => {
    const selectedFilters = {
        name: name.value,
        species: Object.keys(selectedSpecies.value).filter(id => selectedSpecies.value[id]),
        breeds: selectedBreeds.value.map(breed => breed.value),
        sizes: selectedSizes.value.map(size => size.value),
        colors: selectedColors.value.map(color => color.value),
        gender: Object.keys(selectedGender.value).filter(key => selectedGender.value[key])
    };

    console.log('Filtros aplicados:', selectedFilters);
    
    await getPetsByFilters(selectedFilters);
};

</script>