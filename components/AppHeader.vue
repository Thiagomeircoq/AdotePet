<script setup lang="ts">
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
</script>

<template>
    <header class="container mx-auto flex items-center justify-between p-4">
        <div class="flex items-center justify-center">
            <a href="#">
                <img width="200px" src="../public/img/adotepet-logo.svg" alt="" srcset="">
            </a>
        </div>

        <div class="flex items-center space-x-8">
            <div class="flex items-center space-x-4">
                <UButton size="md" color="amber" variant="solid" label="Anunciar"
                    trailing />
                <UButton size="md" color="amber" variant="outline" label="Entrar"
                    trailing />
            </div>
        </div>
    </header>
</template>
