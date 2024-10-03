<template>
    <div class="bg-cover bg-center h-screen bg-stone-100">
        <div class="container max-w-7xl mx-auto flex flex-col">
            <AppHeader />

            <section class="flex space-x-5 mt-5">
                <aside class="w-3/12">
                    <h1 class="font-bold text-2xl text-stone-800">Filtros</h1>
                    <form class="p-3 flex flex-col gap-2" action="#">
                        <UFormGroup label="Nome ou ID (opcional)">
                            <UInput placeholder="" />
                        </UFormGroup>

                        <UFormGroup class="flex flex-col" label="Espécie">
                            <div v-if="loading">Carregando...</div>
                            <div v-else-if="error">{{ error }}</div>
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
                                <div class="flex items-center space-x-2">
                                    <UToggle size="lg" color="primary" name="gender" />
                                    <span>Macho</span>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <UToggle size="lg" color="primary" name="gender" />
                                    <span>Fêmea</span>
                                </div>
                            </div>
                        </UFormGroup>

                        <UFormGroup class="flex flex-col" label="Porte">
                            <USelectMenu v-model="selectedSizes" :options="sizes" multiple
                                placeholder="Selecione o tamanho" />
                        </UFormGroup>

                        <UFormGroup class="flex flex-col" label="Cor">
                            <USelectMenu v-model="selectedColors" :options="colors" multiple
                                placeholder="Selecione a cor" />
                        </UFormGroup>

                        <UFormGroup class="flex flex-col" label="Raça">
                            <USelectMenu 
                                v-model="selectedBreeds" 
                                :options="breeds.map(breed => ({ label: breed.name, value: breed.id }))" 
                                multiple 
                                placeholder="Selecione a raça" 
                            />
                        </UFormGroup>

                        <UButton class="flex items-center justify-center w-max mt-4" size="lg" color="amber"
                            variant="solid" label="Aplicar Filtros" trailing />
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
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSpecies } from '@/composables/useSpecies';
import { ref, watch } from 'vue';

const { species, loading, error } = useSpecies();

const sizes = ['Filhote', 'Pequeno', 'Médio', 'Grande'];
const colors = ['Branco', 'Preto', 'Marrom', 'Cinza', 'Dourado', 'Bege', 'Amarelo', 'Azul', 'Vermelho', 'Verde'];
const breeds = ref([]); // Armazenará os dados completos das raças

const selectedSpecies = ref<{ [key: string]: boolean }>({});
const selectedSizes = ref([]);
const selectedColors = ref([]);
const selectedBreeds = ref([]); // IDs das raças selecionadas

// Função para buscar as raças com base nas espécies selecionadas
async function fetchBreedsBySpecies(speciesIds: string[]) {
    try {
        const response = await fetch(`http://localhost:3100/breed?species=${speciesIds.join(',')}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar raças');
        }
        const data = await response.json();
        breeds.value = data; // Armazena os objetos de raças completos
    } catch (error) {
        console.error('Erro ao buscar raças:', error);
        breeds.value = [];
    }
}

// Observa mudanças nas espécies selecionadas
watch(
    selectedSpecies,
    (newSelectedSpecies) => {
        const selectedSpeciesIds = Object.keys(newSelectedSpecies).filter(id => newSelectedSpecies[id]);

        if (selectedSpeciesIds.length > 0) {
            fetchBreedsBySpecies(selectedSpeciesIds);
        } else {
            breeds.value = [];
            selectedBreeds.value = []; // Limpa as raças selecionadas se nenhuma espécie estiver selecionada
        }
    },
    { deep: true }
);

// Observa mudanças nas raças e filtra as raças selecionadas
watch(breeds, (newBreeds) => {
    // Mantém apenas as raças que ainda estão disponíveis após a atualização
    const validSelectedBreeds = selectedBreeds.value.filter(breedId => newBreeds.some(breed => breed.id === breedId));
    selectedBreeds.value = validSelectedBreeds;
});

// Inicializa as espécies com "false" no selectedSpecies
watch(species, (newSpecies) => {
    newSpecies.forEach(specie => {
        selectedSpecies.value[specie.id] = false;
    });
});
</script>