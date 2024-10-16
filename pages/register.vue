<template>
    <div class="bg-cover bg-center h-screen bg-stone-100">
        <div class="flex h-screen">
            <aside class="w-1/2 py-20 px-20 flex flex-col justify-center items-center">
                <main class="w-2/4">
                    <div class="flex flex-col gap-2 text-center">
                        <h1 v-if="currentStep === 1" class="text-stone-700 font-bold text-4xl">Crie sua conta!</h1>
                        <h1 v-else class="text-stone-700 font-bold text-4xl">Complete seu perfil</h1>
                    </div>

                    <div v-if="currentStep === 1">
                        <UserForm @nextStep="handleNextStep" :userData="userData" />
                    </div>

                    <div v-if="currentStep === 2">
                        <PersonForm @prevStep="currentStep = 1" @submitForm="handleSubmit" :personData="personData" />
                    </div>

                    <div v-if="currentStep === 1" class="flex justify-center mt-5">
                        <p class="text-sm">
                            <span class="font-semibold text-stone-700">Já possui um cadastro? </span>
                            <a href="#" class="text-amber-600 text-sm hover:underline">Realize o login!</a>
                        </p>
                    </div>
                </main>
            </aside>
            <section class="w-1/2 bg-stone-200 relative">
                <header class="p-10 absolute right-0">
                    <img width="200" src="../public/img/adotepet-logo.svg" alt="Logo Adote Pet" />
                </header>
                <div class="flex h-full items-center justify-center">
                    <img class="w-8/12" src="../public/img/adote-nos.svg" alt="Adote Nós" />
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import PersonForm from '~/components/auth/PersonForm.vue';
import UserForm from '~/components/auth/UserForm.vue';

const currentStep = ref(2);

const userData = reactive({
    email: '',
    password: '',
    confirm_password: ''
});

const personData = reactive({
    first_name: '',
    last_name: '',
    birth_date: '',
    gender: ''
});

const handleNextStep = (data: any) => {
    Object.assign(userData, data);
    currentStep.value = 2;
};

const handleSubmit = (data: any) => {
    Object.assign(personData, data);

    console.log(userData)

    const completeData = {
        ...userData,
        ...personData
    };

    console.log("Dados completos:", completeData);
};
</script>