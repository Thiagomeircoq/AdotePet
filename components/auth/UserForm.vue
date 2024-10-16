<template>
    <UForm :state="UserState" class="flex flex-col mt-5" :schema="UserRegister" @submit="onSubmitStep1">
        <div class="flex flex-col gap-5">
            <UFormGroup label="E-mail" name="email" required>
                <UInput icon="i-heroicons-envelope" size="lg" v-model="UserState.email" type="email" variant="outline"
                    placeholder="email@exemplo.com" />
            </UFormGroup>

            <UFormGroup label="Senha" name="password" required>
                <UInput icon="i-heroicons-lock-closed" size="lg" v-model="UserState.password" type="password"
                    variant="outline" placeholder="Senha" />
            </UFormGroup>

            <UFormGroup label="Confirme a senha" name="confirm_password" required>
                <UInput icon="i-heroicons-lock-closed" size="lg" v-model="UserState.confirm_password" type="password"
                    variant="outline" placeholder="Confirme a senha" />
            </UFormGroup>

            <UButton type="submit" class="flex justify-center mt-5" size="lg" color="amber" variant="solid">
                Próximo
            </UButton>
        </div>
    </UForm>
</template>

<script setup lang="ts">
import { reactive, defineEmits, watchEffect } from 'vue';
import { z } from 'zod';

const emit = defineEmits(['nextStep']);

const props = defineProps(['userData']);

const UserRegister = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
    confirm_password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
}).refine((data) => data.password === data.confirm_password, {
    message: 'As senhas devem ser iguais',
    path: ['confirm_password'],
});

const UserState = reactive({
    email: '',
    password: '',
    confirm_password: ''
});

watchEffect(() => {
    Object.assign(UserState, props.userData);
});

const onSubmitStep1 = () => {
    const result = UserRegister.safeParse(UserState);
    if (result.success) {
        emit('nextStep', { ...UserState });
    } else {
        console.log('Erro de validação', result.error);
    }
};
</script>