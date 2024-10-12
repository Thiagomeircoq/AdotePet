<template>
    <div class="bg-cover bg-center h-full bg-stone-100">
        <div class="container max-w-7xl mx-auto flex flex-col">
            <AppHeader />
            <section v-if="!loading && pet" class="flex space-x-5 mt-5 gap-5">
                <div class="w-1/2">
                    <div class="flex flex-col gap-4">
                        <img :src="pet?.images?.[0]?.image_url ? `http://${pet.images[0].image_url}` : 'https://via.placeholder.com/150'"
                            alt="Pet" class="w-full object-cover rounded-lg" />
                        <div class="flex gap-4">
                            <img :src="'https://via.placeholder.com/150'" alt="Pet"
                                class="w-full object-cover rounded-lg" />
                            <img :src="'https://via.placeholder.com/150'" alt="Pet"
                                class="w-full object-cover rounded-lg" />
                            <img :src="'https://via.placeholder.com/150'" alt="Pet"
                                class="w-full object-cover rounded-lg" />
                            <img :src="'https://via.placeholder.com/150'" alt="Pet"
                                class="w-full object-cover rounded-lg" />
                        </div>
                    </div>
                </div>
                <div class="flex flex-col">
                    <div class="flex flex-col gap-1">
                        <h1 class="text-amber-600 text-4xl font-bold">{{ pet.name }}</h1>
                        <span class="text-stone-500 text-lg">
                            {{ pet.species?.name }} | {{ pet.gender === 'M' ? 'Macho' : 'Fêmea' }} | {{ pet.breed?.name
                            }}
                        </span>
                    </div>
                    <div class="flex flex-col gap-1 mt-5">
                        <span class="text-stone-700 text-lg">Está em São Paulo, São Paulo</span>
                        <span class="text-stone-700 text-lg">
                            Publicado por
                            <a href="#" class="text-amber-600 font-semibold">Thiago Meira</a>,
                            10/10/2024
                        </span>
                        <span class="text-stone-700 text-lg">Está pagina foi vista 10 vezes</span>
                    </div>
                </div>
            </section>
            <LoadingScreen v-else />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePet } from '@/composables/usePet';

const route = useRoute();
const pet = ref(null);
const { loading, getPetById } = usePet();

onMounted(async () => {
    const petId = route.params.id;
    pet.value = await getPetById(petId);
});
</script>