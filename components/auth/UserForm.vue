<template>
    <UForm :state="UserState" class="flex flex-col mt-5" :schema="UserRegister" @submit="onSubmitStep1">
        <div class="flex flex-col gap-5">
            <UFormGroup label="E-mail" name="email" required>
                <UInput icon="i-heroicons-envelope" size="lg" v-model="UserState.email" type="email" variant="outline"
                    placeholder="email@exemplo.com" />
                <!-- Mostrar erro de email -->
                <p v-if="isSubmitted && errors.email" class="mt-2 text-red-500 dark:text-red-400 text-sm">{{ errors.email }}</p>
            </UFormGroup>

            <UFormGroup label="Senha" name="password" required>
                <UInput icon="i-heroicons-lock-closed" size="lg" v-model="UserState.password" type="password"
                    variant="outline" placeholder="Senha" />
                <!-- Mostrar erro de senha -->
                <p v-if="isSubmitted && errors.password" class="mt-2 text-red-500 dark:text-red-400 text-sm">{{ errors.password }}</p>
                <!-- Mostrar erros adicionais de validação da senha -->
                <ul v-if="isSubmitted && passwordErrors.length" class="mt-2 text-red-500 dark:text-red-400 text-sm list-disc ml-5">
                    <li v-for="(error, index) in passwordErrors" :key="index">{{ error }}</li>
                </ul>
            </UFormGroup>

            <UFormGroup label="Confirme a senha" name="password_confirm" required>
                <UInput icon="i-heroicons-lock-closed" size="lg" v-model="UserState.password_confirm" type="password"
                    variant="outline" placeholder="Confirme a senha" />
                <!-- Mostrar erro de confirmação de senha -->
                <p v-if="isSubmitted && errors.password_confirm" class="mt-2 text-red-500 dark:text-red-400 text-sm">
                    {{ errors.password_confirm }}
                </p>
            </UFormGroup>

            <UButton type="submit" class="flex justify-center mt-5" size="lg" color="amber" variant="solid">
                Próximo
            </UButton>
        </div>
    </UForm>
</template>

<script setup lang="ts">
import { reactive, defineEmits, watchEffect, computed, ref } from 'vue';
import { z } from 'zod';
import { passwordValidation } from '~/utils/index';

interface FormErrors {
    email?: string;
    password?: string;
    password_confirm?: string;
}

const emit = defineEmits(['nextStep']);
const props = defineProps(['userData']);

const isSubmitted = ref(false);

const UserRegister = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
    password_confirm: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
}).refine((data) => data.password === data.password_confirm, {
    message: 'As senhas devem ser iguais',
    path: ['password_confirm'],
});

const UserState = reactive({
    email: '',
    password: '',
    password_confirm: ''
});

const errors = computed<FormErrors>(() => {
    const result = UserRegister.safeParse(UserState);
    if (!result.success) {
        const formErrors: FormErrors = {};
        result.error.errors.forEach((err) => {
            formErrors[err.path[0] as keyof FormErrors] = err.message;
        });
        return formErrors;
    }
    return {};
});

const passwordErrors = ref<string[]>([]);

watchEffect(() => {
    Object.assign(UserState, props.userData);
});

const onSubmitStep1 = () => {
    isSubmitted.value = true;

    passwordErrors.value = passwordValidation(UserState.password);

    const result = UserRegister.safeParse(UserState);
    if (result.success && passwordErrors.value.length === 0) {
        emit('nextStep', { ...UserState });
    } else {
        console.log('Erro de validação', result.error);
    }
};
</script>
