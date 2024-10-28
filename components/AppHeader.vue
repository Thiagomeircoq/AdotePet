<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore();
const { authenticated } = storeToRefs(authStore);
</script>

<template>
    <header class="container mx-auto flex items-center justify-between p-4">
        <div class="flex items-center justify-center">
            <img class="cursor-pointer" width="200px" @click="navigateTo('/')" src="../public/img/adotepet-logo.svg" alt="" srcset="">
        </div>

        <div class="flex items-center space-x-4">
            <UButton size="md" color="amber" @click="navigateTo('/anunciar/pet-para-adocao')" variant="solid" label="Anunciar" trailing />
            <UButton v-if="!authenticated" @click="navigateTo('/login')" size="md" color="amber" variant="outline"
                label="Entrar" trailing />

            <template v-else>
                <div class="flex gap-2">
                    <div class="border border-amber-500 p-1 rounded-full flex justify-center items-center">
                        <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" />
                    </div>
                    <div class="flex flex-col justify-center">
                        <span class="text-xs font-semibold text-gray-800">Thiago Meira</span>
                        <a class="text-xs text-gray-800 underline" @click="authStore.logUserOut" href="#">Sair</a>
                    </div>
                </div>
            </template>
        </div>
    </header>
</template>
