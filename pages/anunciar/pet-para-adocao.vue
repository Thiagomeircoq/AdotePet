<template>
    <div class="bg-cover bg-center h-screen bg-stone-100">
        <div class="flex h-screen">
            <div class="flex flex-col w-1/2">
                <FormWizard />
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
import FormWizard from '~/components/anunciar/FormWizard.vue';
import { useSpecie } from '@/composables/useSpecie';

definePageMeta({
    middleware: ["auth"]
});
</script>