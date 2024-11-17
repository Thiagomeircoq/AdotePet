<template>
    <div class="space-y-2">
        <div class="bg-amber-100 px-4 py-3 rounded-sm text-gray-900">
            Vamos começar com algumas informações básicas.
        </div>

        <UFormGroup class="flex flex-col" label="Espécie">
            <USelectMenu size="lg" v-model="localFormData.species" :options="speciesOptions"
                placeholder="Selecione a espécie" />
        </UFormGroup>
        <UFormGroup class="flex flex-col" label="Raça">
            <USelectMenu size="lg" v-model="localFormData.breed" :options="breedOptions"
                placeholder="Selecione a raça" />
        </UFormGroup>
        <UFormGroup class="flex flex-col" label="Gênero">
            <USelectMenu size="lg" v-model="localFormData.gender" :options="genderOptions"
                placeholder="Selecione o gênero" />
        </UFormGroup>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useSpecie, type Specie } from '@/composables/useSpecie';
import { useBreed, type Breed } from '@/composables/useBreed';

interface FormData {
    species: string | undefined;
    breed: string | undefined;
    gender: string | undefined;
}

const props = defineProps<{
    modelValue: FormData;
}>();

const emit = defineEmits(['update:modelValue']);

const localFormData = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
});

const breedOptions = ref([]);
const { breeds, fetchBreedsBySpecies, loading: breedsLoading, error: breedsError } = useBreed();
const { species, loading: speciesLoading, error: speciesError } = useSpecie();

const genderOptions = [
    { value: 'M', label: 'Macho' },
    { value: 'F', label: 'Fêmea' },
];

const speciesOptions = computed(() =>
    species.value.map((specie) => ({
        label: specie.name,
        value: specie.id,
    }))
);

watch(() => localFormData.value.species, async (newSpecies) => {
    localFormData.value.breed = undefined;
    if (newSpecies) {
        const breeds = await fetchBreedsBySpecies(newSpecies.value);
        if (breeds) {
            breedOptions.value = breeds.map((breed: Breed) => ({
                label: breed.name,
                value: breed.id,
            }));
        } else {
            breedOptions.value = [];
        }
    } else {
        breedOptions.value = [];
    }
});
</script>
