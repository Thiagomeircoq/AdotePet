<script setup lang="ts">
import { z } from 'zod';
import { reactive, ref } from 'vue';

const UserRegister = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
    confirm_password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
}).refine((data) => data.password === data.confirm_password, {
    message: 'As senhas devem ser iguais',
    path: ['confirm_password'],
});

const PersonRegister = z.object({
    first_name: z.string().min(1, 'O primeiro nome é obrigatório'),
    last_name: z.string().min(1, 'O último nome é obrigatório'),
    birth_date: z.string().min(1, 'A data de nascimento é obrigatória'),
});

type UserSchema = z.output<typeof UserRegister>;
type PersonSchema = z.output<typeof PersonRegister>;

const UserState = reactive<UserSchema>({
    email: '',
    password: '',
    confirm_password: ''
});

const PersonState = reactive<PersonSchema>({
    first_name: '',
    last_name: '',
    birth_date: '',
    gender: '',
});

const currentStep = ref(1);

async function onSubmitStep1() {
    const result = UserRegister.safeParse(UserState);

    if (result.success) {
        currentStep.value = 2;
        console.log('Validação bem-sucedida, indo para a Etapa 2');
    }
}

async function onSubmitStep2() {
    const result = PersonRegister.safeParse(PersonState);

    if (result.success) {
        console.log('Validação bem-sucedida, todos os dados:', PersonState);
    }
}

const genderOptions = ['Não declarar', 'Masculino', 'Feminino'];
const selectedGender = ref(genderOptions[0]);
</script>

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
                        <UForm :state="UserState" class="flex flex-col mt-5" :schema="UserRegister"
                            @submit="onSubmitStep1">
                            <div class="flex flex-col gap-5">
                                <UFormGroup label="E-mail" name="email" required>
                                    <UInput icon="i-heroicons-envelope" size="lg" v-model="UserState.email" type="email"
                                        variant="outline" placeholder="email@exemplo.com" />
                                </UFormGroup>

                                <UFormGroup label="Senha" name="password" required>
                                    <UInput icon="i-heroicons-lock-closed" size="lg" v-model="UserState.password"
                                        type="password" variant="outline" placeholder="Senha" />
                                </UFormGroup>

                                <UFormGroup label="Confirme a senha" name="confirm_password" required>
                                    <UInput icon="i-heroicons-lock-closed" size="lg"
                                        v-model="UserState.confirm_password" type="password" variant="outline"
                                        placeholder="Confirme a senha" />
                                </UFormGroup>

                                <UButton type="submit" class="flex justify-center mt-5" size="lg" color="amber"
                                    variant="solid">
                                    Próximo
                                </UButton>
                            </div>
                        </UForm>
                    </div>

                    <div v-if="currentStep === 2">
                        <UForm :state="PersonState" class="flex flex-col mt-5" :schema="PersonRegister"
                            @submit="onSubmitStep2">
                            <div class="flex flex-col gap-5">
                                <UFormGroup label="Primeiro nome" name="first_name" required>
                                    <UInput icon="i-heroicons-user" size="lg" v-model="PersonState.first_name"
                                        variant="outline" placeholder="Primeiro nome" />
                                </UFormGroup>
                                <UFormGroup label="Último nome" name="last_name" required>
                                    <UInput icon="i-heroicons-user" size="lg" v-model="PersonState.last_name"
                                        variant="outline" placeholder="Último nome" />
                                </UFormGroup>
                                <div class="flex gap-4 w-full">
                                    <UFormGroup class="w-1/2" label="Gênero" name="gender" required>
                                        <USelectMenu v-model="selectedGender" size="lg" :options="genderOptions" />
                                    </UFormGroup>
                                    <UFormGroup label="Data de nascimento" name="birth_date" required>
                                        <UInput icon="i-heroicons-calendar" size="lg" v-model="PersonState.birth_date"
                                            variant="outline" placeholder="00/00/0000" />
                                    </UFormGroup>
                                </div>
                                <div class="flex justify-between mt-5">
                                    <UButton class="flex justify-center" size="lg" color="amber" variant="outline"
                                        @click="currentStep = 1">
                                        Voltar
                                    </UButton>
                                    <UButton type="submit" class="flex justify-center" size="lg" color="amber" variant="solid"
                                        @click="onSubmitStep2">
                                        Concluir
                                    </UButton>
                                </div>
                            </div>
                        </UForm>
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
