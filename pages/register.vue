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
                            <a @click="navigateTo('/login')"
                                class="text-amber-600 text-sm hover:underline cursor-pointer">Realize o login!</a>
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
import { reactive, ref, watch } from 'vue';
import PersonForm from '~/components/auth/PersonForm.vue';
import UserForm from '~/components/auth/UserForm.vue';
import { useAuthStore } from '~/store/auth';
import { useAuth } from '@/composables/useAuth';
import { formatDate, formatCPF } from '~/utils';

const { registerUser } = useAuthStore();
const { authenticated, error: authError } = storeToRefs(useAuthStore());
const currentStep = ref(1);
const { register, loading, error } = useAuth();
const toast = useToast();
const router = useRouter();

const userData = reactive({
    email: '',
    password: '',
    password_confirm: ''
});

const personData = reactive({
    first_name: '',
    last_name: '',
    birthdate: '',
    cpf: '',
    about: '',
    gender: ''
});

const handleNextStep = (data: any) => {
    Object.assign(userData, data);
    currentStep.value = 2;
};

const handleSubmit = async (data: any) => {
    Object.assign(personData, data);

    const completeData = {
        email: userData.email,
        password: userData.password,
        password_confirm: userData.password_confirm,
        person: {
            first_name: personData.first_name,
            last_name: personData.last_name,
            cpf: formatCPF(personData.cpf),
            birthdate: formatDate(personData.birthdate),
            gender: personData.gender.value,
            about: personData.about
        }
    };

    try {
        await registerUser(completeData);

        if (authenticated.value) {
            router.push('/');
        } else if (authError.value) {
            toast.add({
                id: 'insert_user',
                title: 'Erro ao realizar o login!',
                description: authError.value,
                icon: 'mi-circle-error',
                timeout: 5000,
            });
        }
    } catch (err) {
        console.error('Erro ao registrar o usuário', err);
    }
};

watch(authError, (newError) => {
    if (newError) {
        toast.add({
            id: 'insert_user',
            title: 'Erro ao realizar cadastro!',
            description: newError,
            icon: 'mi-circle-error',
            timeout: 5000,
        })
    }
});
</script>