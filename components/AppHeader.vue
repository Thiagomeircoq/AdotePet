<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

const links = [
    [
        {
            label: 'Busca',
            to: '',
            dropdown: true,
        },
        {
            label: 'Adoção',
            to: '',
            dropdown: true,
        },
        {
            label: 'Conheça',
            to: '',
            dropdown: true,
        },
        {
            label: 'Ajude',
            to: '',
            dropdown: true,
        },
    ]
]

const authStore = useAuthStore();
const { authenticated } = storeToRefs(authStore);
</script>

<template>
    <header class="container mx-auto flex items-center justify-between p-4">
        <div class="flex items-center justify-center">
            <a href="#">
                <img width="200px" src="../public/img/adotepet-logo.svg" alt="" srcset="">
            </a>
        </div>

        <div class="flex items-center space-x-4">
            <UButton size="md" color="amber" variant="solid" label="Anunciar" trailing />
            <UButton v-if="!authenticated" size="md" color="amber" variant="outline" label="Entrar" trailing />
            
            <template v-else>
                <div class="flex gap-2">
                    <div class="border border-amber-500 p-1 rounded-full flex justify-center items-center">
                        <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" />
                    </div>
                    <div class="flex flex-col justify-center">
                        <span class="text-xs font-semibold text-gray-800">Thiago Meira</span>
                        <a class="text-xs text-gray-800 underline" href="#">Sair</a>
                    </div>
                </div>
            </template>
        </div>
    </header>
</template>
