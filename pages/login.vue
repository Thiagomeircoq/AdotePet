<template>
    <div class="bg-cover bg-center h-screen bg-stone-100">
        <div class="flex h-screen">
            <aside class="w-1/2 py-20 px-20 flex flex-col justify-center items-center">
                <main class="w-2/4">
                    <div class="flex flex-col gap-2 text-center">
                        <h1 class="text-stone-700 font-bold text-4xl">Bem vindo de volta!</h1>
                        <p class="text-sm">Para divulgar ou adotar um animalzinho, você precisa ter um cadastro.</p>
                    </div>
                    <UForm :schema="schema" :state="state" class="flex flex-col mt-5" @submit="onSubmit">
                        <div class="flex flex-col gap-5">
                            <UFormGroup label="E-mail" name="email">
                                <UInput icon="i-heroicons-envelope" size="lg" v-model="state.email" type="email"
                                    variant="outline" placeholder="E-mail" />
                            </UFormGroup>
                            <UFormGroup label="Senha" name="password">
                                <UInput icon="i-heroicons-lock-closed" size="lg" v-model="state.password"
                                    type="password" variant="outline" placeholder="Senha" />
                            </UFormGroup>
                        </div>
                        <div class="flex items-center mt-3 justify-between">
                            <UCheckbox v-model="state.rememberMe" label="Lembre-se de mim" />
                            <a href="#" class="text-amber-600 text-sm hover:underline">Esqueceu sua senha?</a>
                        </div>
                        <UButton type="submit" class="flex justify-center mt-5" size="lg" color="amber" variant="solid" trailing>
                            Entrar
                        </UButton>
                    </UForm>
                    <UDivider class="mt-5" orientation="horizontal" label="Ou" />
                    <div class="flex justify-center mt-5">
                        <p class="text-sm">
                            <span class="font-semibold text-stone-700">Ainda não possui um cadastro? </span>
                            <a @click="navigateTo('/register')" class="text-amber-600 text-sm hover:underline cursor-pointer">Cadastre-se agora!</a>
                        </p>
                    </div>
                </main>
            </aside>
            <section class="w-1/2 bg-stone-200 relative">
                <header class="p-10 absolute right-0">
                    <img width="200" class="cursor-pointer" @click="navigateTo('/')" src="../public/img/adotepet-logo.svg" alt="" srcset="">
                </header>
                <div class="flex h-full items-center justify-center">
                    <img class="w-8/12" src="../public/img/adote-nos.svg" alt="" srcset="">
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';
import { useAuth } from '@/composables/useAuth';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
import { useRouter } from 'vue-router';

const { authenticateUser } = useAuthStore();
const { authenticated, error: authError } = storeToRefs(useAuthStore());
const router = useRouter();
const toast = useToast();

const schema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
    rememberMe: z.boolean().optional()
});

type Schema = z.output<typeof schema>;

const state = reactive({
    email: '',
    password: '',
    rememberMe: false,
    submitted: false
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
    state.submitted = true;

    const validationResult = schema.safeParse(event.data);

    if (!validationResult.success) {
        console.error(validationResult.error.format());
        return;
    }

    await authenticateUser({ email: state.email, password: state.password });
    
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
}

watch(authError, (newError) => {
    if (newError) {
        toast.add({
            id: 'insert_user',
            title: 'Erro ao realizar o login!',
            description: newError,
            icon: 'mi-circle-error',
            timeout: 5000,
        });
    }
});
</script>