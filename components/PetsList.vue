<template>
    <div class="container mx-auto">
        <h1 class="font-bold text-2xl text-stone-800">Pets para adoção</h1>
        <div class="mt-5">
            <div v-if="pets.length === 0" class="text-center py-10">
                <p class="text-gray-500">Nenhum pet encontrado.</p>
            </div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div v-for="pet in pets" :key="pet.id" class="bg-neutral-50 rounded-lg shadow-md overflow-hidden">
                    <div class="p-1 py-2 text-center bg-blue-600">
                        <h3 class="text-white font-semibold text-lg">Pet para Adoção</h3>
                    </div>
                    <img :src="`http://${pet.images[0].image_url}` || 'https://via.placeholder.com/150'" alt="Pet"
                        class="w-full h-48 object-cover" />
                    <div class="p-4">
                        <h3 class="text-xl text-stone-800 font-semibold">{{ pet.name }}</h3>
                        <h2 class="text-stone-500">Brumado - BA</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    pets: {
        type: Array,
        required: true
    }
});
</script>
