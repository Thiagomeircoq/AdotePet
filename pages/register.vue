<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const schema = z.object({
    email: z.string().email('Email invalido'),
    password: z.string().min(8, 'A senha deve conter no mínimo 8 caracteres'),
    rememberMe: z.boolean().optional()
})

type Schema = z.output<typeof schema>

const state = reactive({
    email: '',
    password: '',
    rememberMe: false
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    console.log(event.data)
}
</script>

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
                            <UFormGroup label="E-mail" name="email" required>
                                <UInput icon="i-heroicons-envelope" size="lg" v-model="state.email" type="email"
                                    variant="outline" placeholder="email@exemplo.com" />
                            </UFormGroup>
                            <UFormGroup label="Senha" name="password" required>
                                <UInput icon="i-heroicons-lock-closed" size="lg" v-model="state.password"
                                    type="password" variant="outline" placeholder="Senha" />
                            </UFormGroup>
                        </div>
                        <div class="flex items-center mt-3 justify-between">
                            <UCheckbox v-model="state.rememberMe" label="Remember me" />
                            <a href="#" class="text-amber-600 text-sm hover:underline">Forgot your password?</a>
                        </div>
                        <UButton class="flex justify-center mt-5" size="lg" color="amber" variant="solid" trailing>
                            Entrar
                        </UButton>
                    </UForm>
                    <UDivider class="mt-5" orientation="horizontal" label="Ou" />
                    <div class="flex justify-center mt-5">
                        <p class="text-sm">
                            <span class="font-semibold text-stone-700">Ainda não possui um cadastro? </span>
                            <a href="#" class="text-amber-600 text-sm hover:underline">Cadastre-se agora!</a>
                        </p>
                    </div>
                </main>
            </aside>
            <section class="w-1/2 bg-stone-200 relative">
                <header class="p-10 absolute right-0">
                    <img width="200" src="../public/img/adotepet-logo.svg" alt="" srcset="">
                </header>
                <div class="flex h-full items-center justify-center">
                    <img class="w-8/12" src="../public/img/adote-nos.svg" alt="" srcset="">
                </div>
            </section>
        </div>
    </div>
</template>