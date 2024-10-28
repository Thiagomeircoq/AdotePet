<template>
    <div class="bg-cover bg-center h-screen bg-stone-100">
        <div class="flex h-screen">
            <div class="flex flex-col w-1/2">
                <form class="relative flex flex-col h-full justify-between" @submit.prevent="handleSubmit">

                    <div class="flex flex-col py-20 px-20 h-full items-center">
                        <!-- <div class="flex flex-col gap-3 w-3/4 justify-center h-full">
                            <div class="bg-amber-100 px-4 py-3 rounded-sm text-gray-900">
                                Vamos começar com algumas informações básicas.
                            </div>

                            <UFormGroup class="flex flex-col" label="Espécie">
                                <USelectMenu size="lg" v-model="selectedBreeds" :options="breeds" multiple
                                    placeholder="Selecione a espécie" />
                            </UFormGroup>

                            <UFormGroup class="flex flex-col" label="Gênero">
                                <USelectMenu size="lg" v-model="selectedBreeds" :options="breeds" multiple
                                    placeholder="Selecione o gênero" />
                            </UFormGroup>

                            <UFormGroup class="flex flex-col" label="Gênero">
                                <USelectMenu size="lg" v-model="selectedBreeds" :options="breeds" multiple
                                    placeholder="Selecione o gênero" />
                            </UFormGroup>
                        </div> -->
                        <div class="flex flex-col gap-3 w-3/4 justify-center h-full">
                            <div class="bg-amber-100 px-4 py-3 rounded-sm text-gray-900">
                                Vamos começar com algumas informações básicas.
                            </div>

                            <div class="flex flex-col gap-2">
                                <UFormGroup class="flex flex-col" label="Foto do pet">
                                    <UInput type="file" size="lg" class="hidden" @change="handleFileInput"
                                        icon="i-heroicons-folder" />
                                    <div class="flex flex-col items-center w-full border-2 border-dashed border-gray-400 rounded-md p-2 bg-amber-50"
                                        @dragover="handleDragOver" @drop="handleDrop">
                                        <UIcon name="i-heroicons-photo" class="w-14 h-14 text-gray-500" />
                                        <span class="text-gray-800">Arraste uma imagem nesta área, ou clique para
                                            selecionar uma
                                            imagem.</span>
                                        <span class="mt-5 text-gray-700 text-sm">
                                            Para obter máximo resultado, prefira fotos onde apareça apenas o seu pet em
                                            evidência, sem escritos adicionais.
                                        </span>
                                    </div>
                                </UFormGroup>

                                <div v-if="previewImage" class="w-full bg-amber-50 flex justify-center mt-2">
                                    <img :src="previewImage" class="w-60 rounded-md" alt="Preview da imagem do pet" />
                                </div>

                                <!-- <div class="w-full bg-amber-50 flex justify-center">
                                    <img class="w-60"
                                        src="https://conteudo.imguol.com.br/c/entretenimento/ec/2023/08/19/cachorro-balltze-famoso-por-meme-morre-aos-12-anos-1692475811229_v2_1x1.png"
                                        alt="">
                                </div> -->

                            </div>
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
                </form>
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
definePageMeta({
    middleware: 'auth'
})

import { ref } from 'vue';

const previewImage = ref(null);

function handleFileInput(event) {
    const file = event.target.files[0];
    if (file) {
        previewImage.value = URL.createObjectURL(file);
    }
}

function handleDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
        previewImage.value = URL.createObjectURL(file);
    }
}

function handleDragOver(event) {
    event.preventDefault();
}

</script>