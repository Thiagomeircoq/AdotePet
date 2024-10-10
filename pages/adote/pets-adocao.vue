<template>
    <div class="bg-cover bg-center h-screen bg-stone-100">
        <div class="container max-w-7xl mx-auto flex flex-col">
            <AppHeader />
            <section v-if="!isLoading" class="flex space-x-5 mt-5">
                <Filters @filteredPets="handleFilteredPets" />
                <UDivider orientation="vertical" />
                <PetsList :pets="filteredPets" />
            </section>
            <LoadingScreen v-else />
        </div>
    </div>
</template>

<script setup lang="ts">
import Filters from '@/components/Filters.vue';
import PetsList from '@/components/PetsList.vue';
import LoadingScreen from '@/components/LoadingScreen.vue';
import { ref, computed } from 'vue';
import { useSpecie } from '@/composables/useSpecie';

const { loading: speciesLoading } = useSpecie();
const isLoading = computed(() => speciesLoading.value);

const filteredPets = ref([]);

const handleFilteredPets = (pets) => {
    console.log('Pets recebidos:', pets);
    filteredPets.value = pets;
};
</script>