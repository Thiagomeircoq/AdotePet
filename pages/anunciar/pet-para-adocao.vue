<template>
    <div class="bg-cover bg-center h-screen bg-stone-100">
        <div class="flex h-screen">
            <div class="flex flex-col w-1/2">
                <FormWizard />
                <!-- <form class="relative flex flex-col h-full justify-between" @submit.prevent="handleSubmit">
                    <div class="flex flex-col py-20 px-20 h-full items-center">

                        <div class="flex flex-col gap-3 w-3/4 justify-center h-full">
                            <div class="bg-amber-100 px-4 py-3 rounded-sm text-gray-900">
                                Vamos começar com algumas informações básicas.
                            </div>

                            <UFormGroup class="flex flex-col" label="Espécie">
                                <USelectMenu size="lg" v-model="selectedSpecies" :options="speciesOptions"
                                    placeholder="Selecione a espécie" />
                            </UFormGroup>
                            <UFormGroup class="flex flex-col" label="Raça">
                                <USelectMenu size="lg" v-model="selectedBreeds" :options="breedOptions"
                                    placeholder="Selecione a raça" />
                            </UFormGroup>
                            <UFormGroup class="flex flex-col" label="Gênero">
                                <USelectMenu size="lg" v-model="selectGender" :options="gender"
                                    placeholder="Selecione o gênero" />
                            </UFormGroup>


                            <UFormGroup class="flex flex-col" label="Foto do pet">
                                <input ref="fileInput" type="file" class="hidden" @change="onFileChange" />
                                <div class="flex flex-col items-center w-full border-2 border-dashed border-gray-400 rounded-md p-2 bg-amber-50"
                                    @click="triggerFileSelection">
                                    <UIcon name="i-heroicons-photo" class="w-14 h-14 text-gray-500" />
                                    <span class="text-gray-800">
                                        Arraste uma imagem nesta área, ou clique para selecionar uma imagem.
                                    </span>
                                    <span class="mt-5 text-gray-700 text-sm">
                                        Para obter máximo resultado, prefira fotos onde apareça apenas o seu pet em
                                        evidência, sem escritos adicionais.
                                    </span>
                                </div>
                            </UFormGroup>
                            <ImageCropper class="bg-amber-100 flex justify-center items-center"
                                :visible="isCropperVisible" :imageSrc="selectedImage" @close="isCropperVisible = false"
                                @crop="onImageCropped" />
                        </div>
                    </div>
                    <div class="flex justify-between w-full p-4 border-gray-800 bg-white items-center">
                        <UButton type="submit" class="flex justify-center gap-x-1" size="lg"
                            icon="i-heroicons-chevron-left" color="amber" variant="outline">
                            Voltar
                        </UButton>
                        <UButton type="submit" class="flex justify-center gap-x-1" size="lg" color="amber"
                            variant="solid">
                            <template #trailing>
                                <UIcon name="i-heroicons-chevron-right" class="w-5 h-5" />
                            </template>
                            Prosseguir
                        </UButton>
                    </div>
                </form> -->
            </div>
            <section class="w-1/2 bg-stone-200 relative">
                <header class="p-10 absolute right-0">
                    <img width="200" class="cursor-pointer" @click="navigateTo('/')"
                        src="../public/img/adotepet-logo.svg" alt="" srcset="">
                </header>
                <div class="flex h-full items-center justify-center">
                    <img class="w-8/12" src="../public/img/adote-nos.svg" alt="" srcset="">
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import ImageCropper from '~/components/ImageCropper.vue';
import FormWizard from '~/components/anunciar/FormWizard.vue';
import { useBreed } from '@/composables/useBreed';
import { useSpecie } from '@/composables/useSpecie';

definePageMeta({
    middleware: ["auth"]
});

const fileInput = ref(null);
const selectedImage = ref('');
const isCropperVisible = ref(false);

const selectedSpecies = ref([]);
const selectedBreeds = ref([]);
const selectGender = ref([]);
const breedOptions = ref([]);

const { breeds, fetchBreedsBySpecies, loading: breedsLoading, error: breedsError } = useBreed();
const { species, loading: speciesLoading, error: speciesError } = useSpecie();
const gender = [
    { value: 'M', label: 'Macho' },
    { value: 'F', label: 'Fêmea' },
];

const speciesOptions = computed(() =>
    species.value.map(specie => ({
        label: specie.name,
        value: specie.id
    }))
);

watch(selectedSpecies, async (newSpecies) => {
    selectedBreeds.value = [];
    if (newSpecies) {
        const breeds = await fetchBreedsBySpecies(newSpecies.value);
        if (breeds) {
            breedOptions.value = breeds.map(breed => ({
                label: breed.name,
                value: breed.id
            }));
        } else {
            breedOptions.value = [];
        }
    } else {
        breedOptions.value = [];
    }
});

function triggerFileSelection() {
    fileInput.value.click();
}

function onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            selectedImage.value = e.target?.result as string;
            isCropperVisible.value = true;
        };
        reader.readAsDataURL(file);
    }
}

function onImageCropped(croppedImage: string) {
    console.log('Imagem cortada:', croppedImage);
}
</script>