<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const schema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const state = reactive({
    email: '',
    password: ''
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    console.log(event.data)
}
</script>

<template>
    <div class="bg-cover bg-center h-screen bg-stone-100">
        <div class="flex h-screen">
            <div class="w-1/2 py-20 px-20 flex flex-col items-center justify-center">
                <div class="w-2/4">
                    <img width="250px" src="../public/img/adotepet-logo.svg" alt="" srcset="">
                    <div class="flex flex-col items-center">
                        <div class="text-center mt-3">
                            <h1 class="text-stone-700 font-semibold text-xl">Faça o login</h1>
                        </div>
                    </div>
                    <UForm :schema="schema" :state="state" class="mt-12 flex flex-col gap-5" @submit="onSubmit">
                        <UFormGroup label="E-mail" name="email">
                            <UInput icon="i-heroicons-envelope" size="lg" v-model="state.email" type="email"
                                variant="outline" placeholder="email@exemplo.com" />
                        </UFormGroup>
                        <UFormGroup label="Senha" name="password">
                            <UInput icon="i-heroicons-lock-closed" size="lg" v-model="state.password" type="password"
                                variant="outline" placeholder="Senha" />
                        </UFormGroup>
                        <UButton class="flex justify-center" size="lg" color="amber" variant="solid" trailing>
                            Entrar
                        </UButton>
                    </UForm>
                </div>
            </div>
            <div class="w-1/2 bg-stone-200">
                <div class="flex h-full items-center justify-center">
                    <img class="w-8/12" src="../public/img/adote-nos.svg" alt="" srcset="">
                </div>
            </div>
        </div>
    </div>
</template>