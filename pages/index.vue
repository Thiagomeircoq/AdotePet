<template>
    <div class="bg-cover bg-center h-screen bg-stone-100">
        <div class="container max-w-7xl mx-auto flex flex-col">
            <AppHeader />

            <section class="py-44 p-4">
                <div class="flex">
                    <div class="w-2/3 flex flex-col gap-6">
                        <h1 class="text-7xl text-stone-800 font-bold">
                            ADOTE UM <br /> AMIGO PELUDO
                        </h1>

                        <p class="text-lg text-stone-500">
                            Utilize ferramentas de busca de pets com eficácia comprovada em todo o Brasil. <br />
                            Crie seu anúncio gratuito agora mesmo para ter acesso ao Painel de Busca.
                        </p>

                        <div class="flex gap-3">
                            <UButton @click="navigateTo('/adote/pets-adocao')"
                                class="px-4 items-center py-3 gap-3 flex rounded-lg" color="amber" variant="solid"
                                trailing>
                                <img width="50px" src="../public/img/adotepet-white.svg" alt="">
                                <div class="flex text-left flex-col">
                                    <span class="text-lg font-bold">Adotar um pet</span>
                                    <span class="text-sm">Quero adotar um pet</span>
                                </div>
                            </UButton>

                            <UButton class="px-4 items-center py-3 gap-3 flex rounded-lg hover:bg-amber-100"
                                color="amber" variant="outline" trailing>
                                <img width="50px" src="../public/img/adotepet-amber.svg" alt="">
                                <div class="flex text-left flex-col">
                                    <span class="text-lg font-bold">Perdi meu pet</span>
                                    <span class="text-sm">Quero buscar meu pet</span>
                                </div>
                            </UButton>
                        </div>
                    </div>

                    <div class="w-1/3">
                        <object type="image/svg+xml" data="/img/dog2.svg"></object>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>