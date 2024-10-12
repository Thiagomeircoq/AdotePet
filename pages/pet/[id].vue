<template>
    <div class="bg-cover bg-center h-full bg-stone-100">
        <div class="container max-w-7xl mx-auto flex flex-col">
            <AppHeader />
            <section v-if="!loading && pet" class="flex space-x-5 mt-5 gap-5">
                <div class="w-1/2">
                    <div class="flex flex-col">
                        <img :src="pet?.images?.[0]?.image_url ? `http://${pet.images[0].image_url}` : 'https://via.placeholder.com/150'"
                            alt="Pet" class="w-full object-cover rounded-lg" />
                        <ul role="list"
                            class="mt-1 gap-1 grid grid-cols-5 sm:grid-cols-6 md:grid-cols-5 lg:grid-cols-7">
                            <li>
                                <a data-fslightbox=""
                                    class="aspect-h-4 aspect-w-4 block overflow-hidden relative rounded-lg w-full bg-gray-400">
                                    <img :src="'https://via.placeholder.com/150'" alt="Pet"
                                        class="w-full object-cover rounded-lg" />
                                </a>
                            </li>
                            <li>
                                <a data-fslightbox=""
                                    class="aspect-h-4 aspect-w-4 block overflow-hidden relative rounded-lg w-full bg-gray-400">
                                    <img :src="'https://via.placeholder.com/150'" alt="Pet"
                                        class="w-full object-cover rounded-lg" />
                                </a>
                            </li>
                            <li>
                                <a data-fslightbox=""
                                    class="aspect-h-4 aspect-w-4 block overflow-hidden relative rounded-lg w-full bg-gray-400">
                                    <img :src="'https://via.placeholder.com/150'" alt="Pet"
                                        class="w-full object-cover rounded-lg" />
                                </a>
                            </li>
                            <li>
                                <a data-fslightbox=""
                                    class="aspect-h-4 aspect-w-4 block overflow-hidden relative rounded-lg w-full bg-gray-400">
                                    <img :src="'https://via.placeholder.com/150'" alt="Pet"
                                        class="w-full object-cover rounded-lg" />
                                </a>
                            </li>
                            <li>
                                <a data-fslightbox=""
                                    class="aspect-h-4 aspect-w-4 block overflow-hidden relative rounded-lg w-full bg-gray-400">
                                    <img :src="'https://via.placeholder.com/150'" alt="Pet"
                                        class="w-full object-cover rounded-lg" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="flex flex-col w-1/2">
                    <div class="flex flex-col gap-1">
                        <h1 class="text-amber-600 text-4xl font-bold">{{ pet.name }}</h1>
                        <span class="text-stone-500 text-lg">
                            {{ pet.species?.name }} | {{ pet.gender === 'M' ? 'Macho' : 'Fêmea' }} | {{ pet.breed?.name
                            }}
                        </span>
                    </div>
                    <div class="flex flex-col gap-1 mt-5">
                        <span class="text-stone-700 text-md flex gap-2 items-center">
                            <Icon class="text-xl text-amber-900" name="ion:location" />
                            Está em São Paulo, São Paulo
                        </span>
                        <span class="text-stone-700 text-md flex gap-2 items-center">
                            <Icon class="text-xl text-amber-900" name="ion:person" />
                            <span>
                                Publicado por
                                <a href="#" class="text-amber-600 font-semibold">Thiago Meira</a>,
                                10/10/2024
                            </span>
                        </span>
                        <span class="text-stone-700 text-md flex gap-2 items-center">
                            <Icon class="text-xl text-amber-900" name="ion:eye" />
                            Está pagina foi vista 10 vezes
                        </span>
                        <span class="text-stone-700 text-md flex gap-2 items-center">
                            <Icon class="text-xl text-amber-900" name="ion:document" />
                            <a href="#" class="underline">Documentos</a>
                        </span>
                    </div>
                    <div class="mt-5">
                        <UButton class="w-full justify-center" size="xl" color="amber" variant="solid"
                            label="Entrar em contato" trailing />
                    </div>
                    <div class="mt-5">
                        <h1 class="text-amber-900 text-2xl font-bold">A história de {{ pet.name }}</h1>
                        <p class="text-stone-700 text-md mt-2">
                            ATENÇÃO-Contato apenas por WHATSAPP-(11)982330267-Só entre em contato se o local for
                            TOTALMENTE TELADO e SEM ROTA DE FUGA- Gatinho com 2 meses. Fiv/Felv negativo, vermifugado e
                            despulgado. Pedimos 180,00 para custas de medicações e para ajudar outros animais
                            abandonados. Será feita entrevista e no dia da adoção será necessário assinatura de Termo de
                            Compromisso(Adoção apenas para maiores de 21 anos)
                        </p>
                    </div>
                    <div class="mt-5">
                        <h1 class="text-amber-900 text-2xl font-bold">Mais detalhes sobre {{ pet.name }}</h1>
                        <ul class="mt-2 flex gap-2 flex-wrap">
                            <li class="bg-amber-200 text-amber-900 font-semibold py-0.5 px-3 rounded-md">Dócil</li>
                            <li class="bg-amber-200 text-amber-900 font-semibold py-0.5 px-3 rounded-md">Brincalhão</li>
                            <li class="bg-amber-200 text-amber-900 font-semibold py-0.5 px-3 rounded-md">Sociável</li>
                            <li class="bg-amber-200 text-amber-900 font-semibold py-0.5 px-3 rounded-md">Independente
                            </li>
                            <li class="bg-amber-200 text-amber-900 font-semibold py-0.5 px-3 rounded-md">Vermifugado
                            </li>
                            <li class="bg-amber-200 text-amber-900 font-semibold py-0.5 px-3 rounded-md">Dócil</li>
                            <li class="bg-amber-200 text-amber-900 font-semibold py-0.5 px-3 rounded-md">Brincalhão</li>
                            <li class="bg-amber-200 text-amber-900 font-semibold py-0.5 px-3 rounded-md">Sociável</li>
                            <li class="bg-amber-200 text-amber-900 font-semibold py-0.5 px-3 rounded-md">Independente
                            </li>
                            <li class="bg-amber-200 text-amber-900 font-semibold py-0.5 px-3 rounded-md">Vermifugado
                            </li>
                        </ul>
                    </div>
                    <div class="mt-5">
                        <UButton class="w-full justify-center" size="xl" color="amber" variant="solid"
                            label="Quero adotar" trailing />
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